import React, { useEffect, useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import Input from "../../components/Input";
import { message } from "antd";
import { authService } from "../../services/authService";
import { validate } from "../../utils/validate";
import { LOCAL_STORAGE } from "../../constants/localStorage";

const MyInfo = () => {
  const { profileInfo, setProfileInfo } = useAuthen();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const [form, setForm] = useState({ password: "********" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);

  const register = (fieldName) => {
    return {
      value: form[fieldName] || "",
      error: errors[fieldName] || "",
      onChange: (ev) => setForm({ ...form, [fieldName]: ev.target.value }),
    };
  };

  const rules = {
    firstName: [{ required: true, message: "Vui lòng nhập Họ và tên" }],
    email: [
      { required: true, message: "Vui lòng nhập Email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng nhập đúng định dạng Email",
      },
    ],
    phone: [
      { required: true, message: "Vui lòng nhập Số điện thoại" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Vui lòng nhập đúng định dạng Số điện thoại",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập Mật khẩu" }],
  };

  const onSubmit = async (ev) => {
    ev?.preventDefault();
    try {
      const errorObj = validate(rules, form);
      setErrors(errorObj);
      //Check error => error ? fail : success
      if (Object.keys(errorObj)?.length !== 0)
        return message.error("Vui lòng nhập đầy đủ thông tin!");
      const res = await authService.updateProfile(form, token);
      if (res.status) {
        console.log("resUpdate", res);
        message.success("Cập nhận thông tin thành công");
        setProfileInfo(res?.data?.data);
      }
    } catch (error) {
      message.error("Cập nhật thông tin thất bại!");
    }
  };

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form onSubmit={onSubmit} className="form">
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Họ và tên"
              placeholder="Nhập Họ và tên"
              required
              {...register("firstName")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Số điện thoại"
              placeholder="Nhập Số điện thoại"
              required
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Email"
              placeholder="Địa chỉ email"
              required
              disabled
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Password"
              placeholder="Mật khẩu"
              required
              disabled
              type="password"
              {...register("password")}
            />
          </div>
        </div>
        <div className="form-group">
          <Input label="Facebook URL" {...register("facebookURL")} />
        </div>
        <div className="form-group">
          <Input label="Website" {...register("website")} />
        </div>
        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            textarea
            {...register("introduce")}
          />
        </div>
        {/* <p className="noti">Cập nhận thông tin thành công</p> */}
        <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary">Lưu lại</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
