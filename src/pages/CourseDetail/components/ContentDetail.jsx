import React from "react";
import { formatDateDisplay } from "../../../utils/format";
import AccordionContent from "../../../components/Accordion";
import TeacherItem from "../../../components/TeacherItem";

const ContentDetail = (props) => {
  const { description, schedule, content, required, teams } = props || {};

  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div className="contenteditor">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <div className="videowrap">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                  width={560}
                  height={315}
                  frameBorder={0}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div>
          </div>
          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                <div className="labeltext">
                  <span className="label --blue">Khai giảng</span>
                  <p className="title --t3">
                    {formatDateDisplay(schedule?.startDate)}
                  </p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Ngày học</span>
                  <p className="title --t3">{schedule?.days}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">{schedule?.time}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">{schedule?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            <div className="accordion">
              {content?.map((item, index) => {
                return <AccordionContent key={index} {...item} />;
              })}
            </div>
          </div>
          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              {required?.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </div>
          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            <div className="ctteacher__content">
              {teams?.map((item, index) => {
                return <TeacherItem key={index} {...item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDetail;
