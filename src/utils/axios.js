// ../../utils/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: false,
    headers: {
        "ngrok-skip-browser-warning": "69420", // Dòng này cực kỳ quan trọng
    }
});

// Các route không nên auto-refresh (đặc biệt là login)
const AUTH_EXCLUDE = ["/auth/login", "/auth/refresh"];

// Gắn access token vào request (nếu có)
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("adminAccessToken");
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- Refresh control (chống bắn nhiều request refresh cùng lúc) ---
let isRefreshing = false;
let refreshQueue = [];

function flushQueue(error, token = null) {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    refreshQueue = [];
}

api.interceptors.response.use(
    (response) => {
        // 200 thì đi thẳng, không làm gì cả
        return response;
    },
    async (error) => {
        const status = error?.response?.status;
        const originalRequest = error?.config;

        // Nếu không có config (lỗi mạng) thì reject
        if (!originalRequest) return Promise.reject(error);

        // Nếu không phải 401 => không refresh
        if (status !== 401) return Promise.reject(error);

        // Không refresh cho các endpoint auth (login/refresh)
        const url = originalRequest.url || "";
        const shouldExclude = AUTH_EXCLUDE.some((p) => url.includes(p));
        if (shouldExclude) return Promise.reject(error);

        // Tránh retry vô hạn
        if (originalRequest._retry) return Promise.reject(error);
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("adminRefreshToken");
        if (!refreshToken) {
            // Không có refresh token => logout / reject luôn
            return Promise.reject(error);
        }

        // Nếu đang refresh rồi, chờ token mới
        if (isRefreshing) {
            try {
                const newToken = await new Promise((resolve, reject) => {
                    refreshQueue.push({ resolve, reject });
                });

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        // Bắt đầu refresh
        isRefreshing = true;

        try {
            // Gọi refresh bằng axios "thô" để tránh bị interceptor của api can thiệp
            const res = await axios.post(
                `${api.defaults.baseURL}/auth/refresh`,
                { refreshToken },
                { headers: { "Content-Type": "application/json" } }
            );

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

            if (!newAccessToken) throw new Error("Refresh không trả về accessToken");

            localStorage.setItem("adminAccessToken", newAccessToken);
            if (newRefreshToken) localStorage.setItem("adminRefreshToken", newRefreshToken);

            flushQueue(null, newAccessToken);

            // Retry request cũ với token mới
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (err) {
            flushQueue(err, null);

            // Nếu refresh fail: xoá token cho sạch (tuỳ bạn có điều hướng login hay không)
            localStorage.removeItem("adminAccessToken");
            localStorage.removeItem("adminRefreshToken");
            localStorage.removeItem("adminUser");

            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;