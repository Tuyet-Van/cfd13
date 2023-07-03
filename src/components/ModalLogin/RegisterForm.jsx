import React, { useState } from "react";
import { validate } from "../../utils/validate";
import Input from "../../components/Input";
import styled from "styled-components";
import { useAuthen } from "../AuthenContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RegisterForm = () => {
  const { onRegister, renderForm, setRenderForm } = useAuthen();
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
      name: [{ required: true, message: "Vui lòng nhập Họ và tên" }],
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
      onRegister?.({
        firstName: form?.name || "",
        lastName: "",
        email: form?.email || "",
        password: form?.password || "",
      });
      setForm({});
    } else {
      console.log("errors", errors);
    }
  };

  return (
    <div
      className={`modal__wrapper-content mdregister ${
        renderForm === "register" ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng ký tài khoản</h3>

      <Form onSubmit={onSubmit} className="form">
        <Input
          label="Họ và tên"
          placeholder="Nhập Họ và tên"
          required
          {...register("name")}
        />
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
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <a className="color--primary" href="#">
            Chính Sách{" "}
          </a>{" "}
          &amp;{" "}
          <a className="color--primary" href="#">
            Điều Khoản{" "}
          </a>{" "}
          của CFD
        </p>
        <p
          onClick={() => setRenderForm("login")}
          className=" color--primary"
          style={{ cursor: "pointer" }}
        >
          Bạn đã có tài khoản?
        </p>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
