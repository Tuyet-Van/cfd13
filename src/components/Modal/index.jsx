import React from "react";
import { useAuthen } from "../AuthenContext";
import { Link } from "react-router-dom";
import { PATH } from "../../constants/pathnames";

const Modal = () => {
  const { modalSucess, setModalSucess } = useAuthen();

  return (
    <>
      {/* thêm class open vào modal khi bấm đăng ký */}
      <div className={`modal ${modalSucess ? "open" : ""}`}>
        <div className="modal__wrapper">
          <div className="modal__wrapper-content mdnotice active">
            <img src="/img/check.svg" alt="" />
            <h3 className="title --t3">Gửi thông tin thành công!</h3>
            <p>
              Chúng tôi sẽ phản hồi lại cho bạn trong thời gian sớm nhất có thể
            </p>
            <Link
              to={PATH.HOME}
              className="btn btn--primary"
              onClick={() => setModalSucess(false)}
            >
              Đồng Ý
            </Link>
          </div>
        </div>
        <div className="modal__overlay" />
      </div>
    </>
  );
};

export default Modal;
