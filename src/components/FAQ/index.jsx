import React from "react";
import Heading from "../Heading";
import Accordion from "../Accordion";

const FAQ = (props) => {
  const { questions } = props || [];

  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <Heading blueTitle="Câu Hỏi" rTitle=" Thường Gặp" noline center />
          <div className="faq__list">
            <Accordion
              title="Thông tin chung"
              data={questions?.slice(0, 6)}
              renderTitle={(question) => question?.question}
              renderContent={(question) => question?.answer}
            />
            <Accordion
              title="Đăng ký, thanh toán"
              data={questions?.slice(6, 9)}
              renderTitle={(question) => question?.question}
              renderContent={(question) => question?.answer}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
