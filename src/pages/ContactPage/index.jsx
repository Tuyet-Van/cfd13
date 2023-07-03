import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { validate } from "../../utils/validate";
import { useAuthen } from "../../components/AuthenContext";

const ContactPage = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setModalSucess } = useAuthen();

  const {
    execute,
    data,
    loading,
    error: subscribesError,
  } = useMutation(subscribesService.subscribes);

  // console.log("data :>> ", data);
  // console.log("loading :>> ", loading);
  // console.log("subscribesError :>> ", subscribesError);

  const onSubmit = () => {
    console.log("form", form);
    //Validate => error Object
    // let errorObj = {};

    // if (!!!form.name?.trim()) {
    //   errorObj.name = "Vui lòng nhập Họ và tên";
    // }

    // if (!!!form.email?.trim()) {
    //   errorObj.email = "Vui lòng nhập Email";
    // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    //   errorObj.email = "Vui lòng nhập đúng định dạng Email";
    // }

    // if (!!!form.phone?.trim()) {
    //   errorObj.phone = "Vui lòng nhập Số điện thoại";
    // } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
    //   errorObj.phone = "Vui lòng nhập đúng định dạng Số điện thoại";
    // }

    // if (!!!form.topic?.trim()) {
    //   errorObj.topic = "Vui lòng chọn Chủ đề";
    // }

    // if (!!!form.content?.trim()) {
    //   errorObj.content = "Vui lòng nhập Nội dung";
    // }

    const rules = {
      name: [{ required: true, message: "Vui lòng nhập Họ và tên" }],
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
      topic: [{ required: true, message: "Vui lòng chọn Chủ đề" }],
      content: [{ required: true, message: "Vui lòng nhập Nội dung" }],
    };

    const errorObj = validate(rules, form);

    setErrors(errorObj);

    //Check error => error ? fail : success
    if (Object.keys(errorObj)?.length === 0) {
      const payload = {
        name: form?.name || "",
        title: "",
        email: form?.email || "",
        description: form?.content || "",
      };

      execute(payload);

      // axios
      //   .post("http://54.179.36.174:8080/api/v1/subscribes", {
      //     name: form?.name || "",
      //     title: "",
      //     email: form?.email || "",
      //     description: form?.content || "",
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      //Trở về trang chủ
      // message.success("Submit Success");
      // navigate("/");
      setModalSucess(true);
    } else {
      console.log("errors", errors);
    }
  };

  const register = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName],
      onChange: (ev) => setForm({ ...form, [fieldName]: ev.target.value }),
    };
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Liên hệ &amp; Hỗ trợ</h2>
          <p className="desc">
            Bạn có bất cứ thắc mắc nào thì đừng ngần ngại liên hệ để được hỗ
            trợ?
            <br />
            Chúng tôi luôn ở đây
          </p>
        </div>
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__address infor">
                <div className="infor__item">
                  <label className="label">CFD Circle</label>
                  <p className="title --t4">
                    666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                  </p>
                </div>
                <div className="infor__item">
                  <label className="label">Email</label>
                  <p className="title --t4">info@cfdcircle.vn</p>
                </div>
                <div className="infor__item">
                  <label className="label">Số điện thoại</label>
                  <p className="title --t4">098 9596 913</p>
                </div>
              </div>
              <div className="sidebar__business">
                <p>
                  Đối với yêu cầu kinh doanh xin vui lòng gửi cho chúng tôi tại:
                </p>
                <a href="#">business@cfdcircle.vn</a>
              </div>
              <a href="#" className="sidebar__messenger btn btn--primary">
                Trò chuyện trực tuyến
              </a>
            </div>

            <div className="form">
              <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
              <div className="form-group">
                <Input
                  label="Họ và tên"
                  placeholder="Nhập Họ và tên"
                  required
                  {...register("name")}
                  // value={form.name}
                  // onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                  // error={errors.name}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Email"
                  placeholder="Nhập Email"
                  required
                  {...register("email")}
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
              <div className="form-group">
                <Select
                  label={"Chủ đề cần hỗ trợ"}
                  required
                  options={[
                    { value: "", label: "--" },
                    { value: "res", label: "Web Responsive" },
                    { value: "react", label: "React & Redux" },
                  ]}
                  {...register("topic")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Nội dung"
                  placeholder="Nhập Nội dung"
                  required
                  textarea
                  {...register("content")}
                />
                {/* <label className="label">
                  Nội dung <span>*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(ev) =>
                    setForm({ ...form, content: ev.target.value })
                  }
                  className={`form__input ${
                    !!errors.content ? "formerror" : ""
                  }`}
                />
                <p className="error">{errors.content || ""}</p> */}
              </div>
              <div className="btncontrol">
                <button className="btn btn--primary" onClick={onSubmit}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
