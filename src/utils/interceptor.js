import axios from "axios";
import { BASE_URL } from "../constants/environments";
import { LOCAL_STORAGE } from "../constants/localStorage";
import { message } from "antd";

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor cho phép can thiệp vào quá trình nhận phản hồi (RESPONSE) từ server.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //Trả về data error => lấy error.config để cấu hình
    const originalRequest = error.config;

    // Nếu mã lỗi là 401 hoặc 403
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        // Gọi API để cập nhật token mới
        const data = await axiosInstance.put(`/customer/refresh`, {
          refreshToken: localStorage.getItem(LOCAL_STORAGE.refreshToken),
        });

        const newToken = data?.data?.data.token;
        const newRefreshToken = data?.data?.data.refreshToken;

        // Lưu lại token mới vào local storage
        localStorage.setItem(LOCAL_STORAGE.refreshToken, newRefreshToken);
        localStorage.setItem(LOCAL_STORAGE.token, newToken);

        // Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Gọi lại yêu cầu ban đầu với token mới
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu không thể cập nhật token mới
        // Ví dụ: chuyển hướng người dùng đến trang login
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
        localStorage.removeItem(LOCAL_STORAGE.token);
        window.location.href = "/";
        message.error("Vui lòng đăng nhập lại!");
      }
    }

    // Nếu lỗi không phải là 401 hoặc 403, trả về lỗi ban đầu
    return Promise.reject(error);
  }
);

// Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ server.
axiosInstance.interceptors.request.use(
  (config) => {
    // xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE.token
    )}`;
    return config;
  },
  (error) => {
    // xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

export default axiosInstance;
