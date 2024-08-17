import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../../components/Card";
;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        // Check if data is correctly fetched
        const review = data.filter((item) => item.date === "recent"); // Check if multiple items are selected
        setReviews(review);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "-30px",
          width: "100px",
        },
      },
    ],
  };

  return (
    <div className="bg-second bg-cover bg-center h-inherit w-full features relative z-0">
      <h1 className="title text-black text-center pt-24 pb-20">
        Customer Reviews
      </h1>
      <div className="slider-container overflow-hidden">
        <Slider ref={slider} {...settings}>
          {reviews.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
