import React from "react";
import PaymentItem from "../../components/PaymentItem";
import { useAuthen } from "../../components/AuthenContext";

const MyPayment = () => {
  const { paymentInfo } = useAuthen();
  const hasPaymentInfo = !!paymentInfo?.length;

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {hasPaymentInfo &&
        paymentInfo?.map((payment) => (
          <PaymentItem key={payment.id} {...payment} />
        ))}
      {!hasPaymentInfo && <p className="text">Bạn chưa có thanh toán nào!</p>}
    </div>
  );
};

export default MyPayment;
