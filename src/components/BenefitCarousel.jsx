import React, { useState, useEffect } from "react";
import "../styles/BenefitCarousel.css";

const benefits = [
  {
    image: "/benefit.jpg", // ảnh ở public/
    title: "Được khám và theo dõi sức khoẻ",
    content: [
      "Được đo huyết áp, nhịp tim, kiểm tra sức khoẻ tổng quát.",
      "Được thông báo nếu phát hiện bất thường trong máu.",
      "Nhận thẻ hiến máu và theo dõi lịch sử hiến máu định kỳ."
    ]
  },
  {
    image: "/benefit.jpg",
    title: "Được tư vấn về sức khoẻ",
    content: [
      "Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra.",
      "Cung cấp thông tin về dấu hiệu, triệu chứng bệnh lây qua máu.",
      "Tư vấn cách chăm sóc sau khi hiến máu."
    ]
  }
];

const BenefitCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % benefits.length);
  const prev = () => setIndex((prev) => (prev - 1 + benefits.length) % benefits.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="carousel-left">
          <img src={benefits[index].image} alt="Benefit visual" />
        </div>
        <div className="carousel-right">
          <h2>{benefits[index].title}</h2>
          <ul>
            {benefits[index].content.map((item, i) => (
              <li key={i}>- {item}</li>
            ))}
          </ul>
          <div className="carousel-nav">
            <button onClick={prev}>&lt;</button>
            <button onClick={next}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCarousel;
