import React from "react";
import Heading from "../../../components/Heading";
import useFlickity from "../../../hooks/useFlickity";

const Teacher = (props) => {
  const teamList = props?.teams;

  // useEffect(() => {
  //   function teacherSlider() {
  //     let courseComingSlider = $(
  //       ".teacher .teacher__list .teacher__list-inner"
  //     );
  //     courseComingSlider.flickity({
  //       cellAlign: "left",
  //       contain: true,
  //       prevNextButtons: false,
  //       pageDots: false,
  //       dragThreshold: 0,
  //     });
  //     $(".teacher .control .control__next").on("click", function (e) {
  //       e.preventDefault();
  //       courseComingSlider.flickity("next");
  //     });
  //     $(".teacher .control .control__prev").on("click", function (e) {
  //       e.preventDefault();
  //       courseComingSlider.flickity("previous");
  //     });
  //     courseComingSlider.flickity("resize");
  //   }
  //   if (teamList?.length > 0) {
  //     teacherSlider();
  //   }
  // }, [teamList]);

  const { handleNextClick, handlePrevClick } = useFlickity(
    ".teacher .teacher__list .teacher__list-inner",
    {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      dragThreshold: 0,
    },
    teamList
  );

  return (
    <section className="teacher --scpadding">
      <div className="container">
        <Heading
          title="Đội Ngũ"
          blueTitle="CFD Circle"
          headingContent
          text="Đội ngủ giảng viên và mentor tâm huyết nhiều kinh nghiệm được tích
              luỹ từ những dự án thực tế sẽ đồng hành cùng bạn xuyên suốt quá
              trình học và con đường phát triển sự nghiệp."
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
      <div className="teacher__list">
        <div className="container">
          <div className="teacher__list-inner">
            {teamList?.length > 0 &&
              teamList.map((team, index) => {
                return (
                  <div className="teacher__list-item" key={team.id || index}>
                    <div className="img">
                      <img src={team.image} alt="Giảng viên CFD" />
                    </div>
                    <div className="info">
                      <p className="label">{team.jobTitle}</p>
                      <h3 className="title --t3">{team.name}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teacher;
