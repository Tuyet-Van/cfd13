import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { orderService } from "../../services/orderService";

const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [renderForm, setRenderForm] = useState("login");
  const [profileInfo, setProfileInfo] = useState({});
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [modalSucess, setModalSucess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    if (!!token) {
      //call api get profile
      onGetProfile();
      onGetCourseHistories();
      onGetPaymentHistories();
    }
  }, []);

  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalOpen(true);
    }
  };

  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setRenderForm("login");
  };

  const onLogin = async (loginData) => {
    //call API
    console.log("loginData :>> ", loginData);
    try {
      const res = await authService.login(loginData); //trả về token
      console.log("res :>> ", res); //res = token
      const { token, refreshToken } = res?.data?.data || "";

      //Lưu vào localStorage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);

      if (!!token) {
        //Lấy thông tin profile
        onGetProfile();
        onGetCourseHistories();
        onGetPaymentHistories();

        //Thông báo
        message.success("Đăng nhập thành công");

        //Đóng Modal
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Đăng nhập thất bại");
    }
  };
  const onRegister = async (registerData) => {
    //call API
    console.log("registerData :>> ", registerData);
    try {
      const res = await authService.register(registerData); //trả về thông tin đăng ký
      console.log("res :>> ", res);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        onLogin({
          email: registerData.email,
          password: registerData.password,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Đăng ký thất bại");
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    setCourseInfo([]);
    setPaymentInfo([]);
  };

  // const handleRegisterCourse = (ev) => {
  //   if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
  //     setIsAuthenModalOpen(true);
  //     ev.preventDefault();
  //   } else {
  //     setIsAuthenModalOpen(false);
  //   }
  // };

  const onGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfileInfo(profileRes.data.data);
      }
    } catch (error) {
      console.log("error :>> ", error);
      onLogout();
    }
  };

  const onGetCourseHistories = async () => {
    const courseRes = await orderService.getCourseHistories();
    if (courseRes?.data?.data) {
      const mapCourses = courseRes?.data?.data.orders?.map((order) => order);
      setCourseInfo(mapCourses ?? []);
    }
  };

  const onGetPaymentHistories = async () => {
    const paymentRes = await orderService.getPaymentHistories();
    if (paymentRes?.data?.data) {
      const mapPayment = paymentRes?.data?.data.orders;
      setPaymentInfo(mapPayment ?? []);
    }
  };

  return (
    <AuthenContext.Provider
      value={{
        isAuthenModalOpen,
        openAuthenModal,
        closeAuthenModal,
        onLogin,
        onRegister,
        renderForm,
        setRenderForm,
        profileInfo,
        onLogout,
        setProfileInfo,
        courseInfo,
        setCourseInfo,
        paymentInfo,
        setPaymentInfo,
        // handleRegisterCourse,
        modalSucess,
        setModalSucess,
        onGetCourseHistories,
        onGetPaymentHistories,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = () => useContext(AuthenContext);
