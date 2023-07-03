import React, { useEffect, useState } from "react";
import { validate } from "../../utils/validate";
import Input from "../../components/Input";
import styled from "styled-components";
import { useAuthen } from "../AuthenContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LoginForm = () => {
  const { onLogin, renderForm, setRenderForm } = useAuthen();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const register = (fieldName) => {
    return {
      value: form[fieldName] || "",
      error: errors[fieldName] || "",
      onChange: (ev) => setForm({ ...form, [fieldName]: ev.target.value }),
    };
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log("form", form);
    //Validate => error Object
    const rules = {
      email: [
        { required: true, message: "Vui lòng nhập Email" },
        {
          regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Vui lòng nhập đúng định dạng Email",
        },
      ],
      password: [
        { required: true, message: "Vui lòng nhập Mật khẩu" },
        {
          regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          message: "Vui lòng nhập đúng định dạng Mật khẩu",
        },
      ],
    };

    const errorObj = validate(rules, form);

    setErrors(errorObj);

    //Check error => error ? fail : success
    if (Object.keys(errorObj)?.length === 0) {
      //Call Login API
      onLogin?.(form); //Lưu ý dữ liệu server cần là gì phải xem
      setForm({});
    } else {
      console.log("errors", errors);
    }
  };

  return (
    <div
      className={`modal__wrapper-content mdlogin ${
        renderForm === "login" ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng nhập</h3>

      <Form onSubmit={onSubmit} className="form">
        <Input
          label="Email"
          placeholder="Địa chỉ email"
          required
          {...register("email")}
        />

        <Input
          label="Password"
          placeholder="Mật khẩu"
          required
          type="password"
          {...register("password")}
        />

        <div className="form__bottom">
          <p>
            Bạn chưa có tài khoản?{" "}
            <span
              className="color--primary btnmodal"
              onClick={() => setRenderForm("register")}
            >
              Đăng ký
            </span>
          </p>
          {/* <a className="color--primary" href="#">
            Quên mật khẩu?
          </a> */}
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
