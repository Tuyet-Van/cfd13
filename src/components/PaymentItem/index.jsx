import React from "react";
import { formatCurrency, formatDateDisplay } from "../../utils/format";

const PaymentItem = ({ course, paymentMethod, createdAt }) => {
  return (
    <div className="itemhistory">
      <div className="name">{course?.name}</div>
      <div className="payment">{paymentMethod}</div>
      <div className="date">{formatDateDisplay(createdAt)}</div>
      <div className="money">{formatCurrency(course.price)} VND</div>
    </div>
  );
};

export default PaymentItem;
