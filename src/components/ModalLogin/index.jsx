import React from "react";
import { useAuthen } from "../AuthenContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const ModaLogin = () => {
  const { isAuthenModalOpen, closeAuthenModal } = useAuthen();

  return (
    <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={closeAuthenModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        <LoginForm />
        <RegisterForm />
      </div>
      <div className="modal__overlay" onClick={closeAuthenModal} />
    </div>
  );
};

export default ModaLogin;
