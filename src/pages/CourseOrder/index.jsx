import { message } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthen } from "../../components/AuthenContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { Roles } from "../../constants/roles";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { orderService } from "../../services/orderService";
import { formatCurrency } from "../../utils/format";
import { validate } from "../../utils/validate";
import Radio from "../../components/Radio";
import { PATH } from "../../constants/pathnames";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/PageLoading";

const CourseOrder = () => {
  //Payment Method
  const [paymentMethod, setPaymentMethod] = useState("Chuyển khoản");
  const onPaymentChange = (method) => setPaymentMethod(method);

  //Course Info
  const { slug } = useParams();
  const { data: courseDetail, loading: courseDetailLoading } = useQuery(() =>
    courseService.getCourseBySlug(slug)
  );
  const { image, name, teams, price, id: courseId, tags } = courseDetail || {};

  const teacherInfo = useMemo(() => {
    return teams?.find((member) => member.tags?.includes(Roles.Teacher));
  }, [teams]);

  const typeOptions =
    tags?.map((tag) => {
      return {
        label: tag,
        value: tag?.toLowerCase(),
      };
    }) || [];

  //Profile Info
  const {
    profileInfo,
    onGetCourseHistories,
    onGetPaymentHistories,
    courseInfo,
  } = useAuthen();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //Tìm khóa học trùng
  const orderedCourse = courseInfo?.find(
    (info) => info?.course?.id === courseId
  );

  const isAlreadyOrdered = !!orderedCourse?.course?.id;

  const {
    image: orderedImage,
    name: orderedName,
    teams: orderedTeams,
    price: orderedPrice,
  } = orderedCourse?.course || {};

  const orderedTeacherInfo = useMemo(() => {
    return orderedTeams?.find((member) => member.tags?.includes(Roles.Teacher));
  }, [orderedTeams]);

  useEffect(() => {
    if (profileInfo || orderedCourse) {
      setForm({
        name: orderedCourse?.firstName || profileInfo?.firstName,
        phone: orderedCourse?.phone || profileInfo.phone,
        email: orderedCourse?.email || profileInfo.email,
        type: orderedCourse?.type || typeOptions?.[0]?.value,
      });
      orderedCourse?.paymentMethod &&
        setPaymentMethod(orderedCourse.paymentMethod);
    }
  }, [profileInfo, orderedCourse]);

  const register = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName],
      onChange: (ev) => setForm({ ...form, [fieldName]: ev.target.value }),
    };
  };

  const rules = {
    name: [{ required: true, message: "Vui lòng nhập Họ và tên" }],
    phone: [
      { required: true, message: "Vui lòng nhập Số điện thoại" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Vui lòng nhập đúng định dạng Số điện thoại",
      },
    ],
    type: [{ required: true, message: "Vui lòng chọn Hình thức học" }],
  };

  const onSubmit = useCallback(async () => {
    if (!isAlreadyOrdered) {
      const errorObj = validate(rules, form);
      setErrors(errorObj);

      //Check error => error ? fail : success
      if (Object.keys(errorObj)?.length === 0) {
        //success
        if (courseId) {
          const payload = {
            name: form?.name,
            phone: form?.phone,
            course: courseId,
            type: form?.type,
            paymentMethod,
          };

          try {
            const res = await orderService.orderCourse(payload);
            if (res?.data?.data) {
              message.success("Đăng ký khóa học thành công");
              await onGetCourseHistories();
              await onGetPaymentHistories();
              navigate(PATH.PROFILE.COURSES);
            }
          } catch (error) {
            console.log("error :>> ", error);
            message.error("Đăng ký thất bại!");
          }
        }
      } else {
        //fail
        message.error("Vui lòng nhập đầy đủ thông tin!");
      }
    } else {
      message.warning("Khóa học đã được đăng ký!");
    }
  }, [form, paymentMethod]);

  const isPageLoading = useDebounce(courseDetailLoading, 500);

  if (!!isPageLoading) {
    return (
      <main className="mainwrapper --ptop">
        <PageLoading />
      </main>
    );
  }
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <div className="itemorder infoorder">
            <h3 className="title --t3">Thông tin đơn hàng</h3>
            <div className="boxorder">
              <div className="boxorder__col">
                <label className="label">Tên khoá học</label>
                <div className="boxorder__col-course">
                  <div className="img">
                    <img src={orderedImage || image} alt="" />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{orderedName || name}</strong>
                    </p>
                    <p>{orderedTeacherInfo?.name || teacherInfo?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{formatCurrency(orderedPrice || price)}đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{formatCurrency(orderedPrice || price)}đ</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
              <div className="form">
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Họ và tên"
                      placeholder="Nhập Họ và tên"
                      required
                      {...register("name")}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Email"
                      placeholder="Địa chỉ email"
                      required
                      disabled
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Số điện thoại"
                      placeholder="Nhập Số điện thoại"
                      required
                      {...register("phone")}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      disabled={isAlreadyOrdered}
                      label="Hình thức học"
                      required
                      options={typeOptions}
                      value={typeOptions?.[0]}
                      {...register("type")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            <Radio
              disabled={isAlreadyOrdered}
              className="boxorder"
              onChange={onPaymentChange}
              defaultValue={paymentMethod}
            >
              <div className="boxorder__pay">
                <Radio.Option value="Chuyển khoản">
                  <img src="/img/icon-payment-method-atm.svg" alt="" />
                  <span className="checkmark" />
                  Thành toán bằng chuyển khoản
                </Radio.Option>
                <div className="boxorder__pay-tooltip hidden">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                  khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              <div className="boxorder__pay">
                <Radio.Option value="Ví MOMO">
                  <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                  <span className="checkmark" />
                  Thanh toán bằng ví Momo
                </Radio.Option>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
                  với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              <div className="boxorder__pay">
                <Radio.Option value="Tiền mặt">
                  <img src="/img/icon-payment-method-cod.svg" alt="" />
                  <span className="checkmark" />
                  Thanh toán bằng tiền mặt
                </Radio.Option>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
                  của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
                  giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
                  Chí Minh.
                </div>
              </div>
            </Radio>
          </div>

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            onClick={onSubmit}
            disable={isAlreadyOrdered}
            style={{ width: "100%" }}
          >
            <span>Đăng ký khoá học</span>
            {/* <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrder;
