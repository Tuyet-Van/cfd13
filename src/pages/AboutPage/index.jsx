import React from "react";
import { pageService } from "../../services/pageService";
import useQuery from "../../hooks/useQuery";
import CallRegister from "../../components/CallRegister";
import { teamsService } from "../../services/teamsService";
import TeacherItem from "../../components/TeacherItem";
import { galleryService } from "../../services/galleryService";
import { Link } from "react-router-dom";
import { PATH } from "../../constants/pathnames";

const AboutPage = () => {
  const { data: dataAboutPage } = useQuery(() => pageService.getAboutPage());
  const { data: dataTeams } = useQuery(() => teamsService.getTeams());
  const { data: dataGallery } = useQuery(() => galleryService.getGallery());

  const images = dataGallery?.galleries?.[0]?.images || [];
  const { title, data } = dataAboutPage || {};
  const {
    stories,
    together,
    establish,
    numberClass,
    numberCourse,
    student,
    pictureStudy,
  } = data || {};
  console.log(dataAboutPage);

  return (
    <main className="mainwrapper aboutpage">
      <section className="banner abouthero">
        <div className="banner__content">
          <div className="container">
            <h2 className="title --white">
              <span>{title?.slice(0, 7)}</span> {title?.slice(7)}
            </h2>
          </div>
        </div>
      </section>
      <section className="aboutstory">
        <div className="container">
          <div className="aboutstory__img">
            <img src="/img/cfd-circle-team.jpg" alt="" />
          </div>
          <div className="aboutstory__content">
            <h1 className="title --t2">
              <span className="color--primary">
                {stories?.title.slice(0, 10)}
              </span>{" "}
              {stories?.title.slice(10)}
            </h1>
            <p className="text">
              {stories?.description.split("\n\n")?.[0]}
              <br />
              <br />
              {stories?.description.split("\n\n")?.[1]}
            </p>
          </div>
        </div>
      </section>
      <section className="aboutbenifit --scpadding">
        <div className="container">
          <h2 className="aboutbenifit__title title --t2">
            {together?.mainTitle?.split("Đồng Hành Cùng Nhau\n")?.[0]}
            <span className="color--primary">đồng hành cùng nhau</span> <br />
            {together?.mainTitle?.split("Đồng Hành Cùng Nhau\n")?.[1]}
          </h2>
          <div className="aboutbenifit__list">
            {together?.content?.length > 0 &&
              together?.content?.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="number title --t1">{index + 1}</div>
                    <div className="content">
                      <h3 className="title --t3">{item?.title}</h3>
                      <p className="text">{item?.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section className="aboutnumbers">
        <div className="container">
          <div className="aboutnumbers__list">
            <div className="aboutnumbers__list-item">
              <h3 className="title --t2">{establish}</h3>
              <p className="text title --t3">năm thành lập</p>
            </div>
            <div className="aboutnumbers__list-item">
              <h3 className="title --t2">{numberCourse}</h3>
              <p className="text title --t3">khoá học</p>
            </div>
            <div className="aboutnumbers__list-item">
              <h3 className="title --t2">{numberClass}</h3>
              <p className="text title --t3">lớp học</p>
            </div>
            <div className="aboutnumbers__list-item">
              <h3 className="title --t2">{student}+</h3>
              <p className="text title --t3">học viên</p>
            </div>
          </div>
        </div>
      </section>
      <section className="aboutstudy --scpadding">
        <div className="container">
          <h2 className="aboutstudy__title title --t2">
            <span className="color--primary">Hình thức học</span> đa dạng
          </h2>
          {pictureStudy?.length > 0 &&
            pictureStudy?.map((item, index) => {
              return (
                <div className="aboutstudy__item">
                  <div className="aboutstudy__item-img">
                    <img src={item?.image} alt="" />
                  </div>
                  <div className="aboutstudy__item-content">
                    <h4 className="title --t3">{item?.title}</h4>
                    <div className="text">{item?.description}</div>
                    <Link to={PATH.COURSES} className="btn btn--primary">
                      Khám phá
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <section className="aboutgallery --scpadding">
        <div className="container">
          <h2 className="aboutgallery__title title --t2 --white">
            CFD Circle{" "}
            <span className="color--primary">là một team gắn kết,</span> <br />
            cùng nhau học tập, vui chơi và phát triển
          </h2>
          <div className="aboutgallery__imgs">
            {images?.length > 0 &&
              images
                ?.filter(
                  (item) => !(item.includes("check") || item.includes("icon"))
                )
                .map((item, index) => (
                  <img src={item || ""} alt="CFD Circle" key={index} />
                ))}
          </div>
        </div>
      </section>
      <section className="aboutteachers --scpadding">
        <div className="container">
          <h2 className="aboutteachers__title title --t2">
            đội ngũ <span className="color--primary">giảng viên và Mentor</span>
          </h2>
          <div className="aboutteachers__list">
            {dataTeams?.teams?.map((item, index) => {
              return <TeacherItem key={index} {...item} />;
            })}
          </div>
        </div>
      </section>
      <CallRegister />
    </main>
  );
};

export default AboutPage;
