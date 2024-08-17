import React, { useState, useEffect } from "react";
import Cards from "../home/Cards";
import Card from "../../components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://food-website-backend-6xik.onrender.com/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filterProducts = (category) => {
    const filtered =
      category === "all"
        ? product
        : product.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

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
    slidesToScroll: 3,
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

    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />,
  };
  return (
    <div>
      <div className="py-24 h-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 section-container bg-first bg-cover bg-center w-full">
        <div className="md:w-1/2 px-4">
          <h1 className="lg:text-5xl text-3xl font-bold md:leading-snug leading-snug font-lora pt-0 md:pt-18">
            Product
          </h1>
        </div>
        <div className="md:w-1/2"></div>
      </div>
      <div>
      <div className="flex flex-wrap justify-around items-end">
        <div>
          <h1 className="title text-black mt-10 pt-12 px-12 ml-5">
            Our Products
          </h1>
          <p className="para px-12 ml-5 pb-5 w-3/4 sm:w-full">
            Our products are thoughtfully sourced and crafted to deliver
            exceptional quality, freshness, and taste in every purchase.
          </p>
        </div>
        <div className="mr-3">
          <button
            onClick={() => filterProducts("Vegetable")}
            className={`border-2 p-1 text-black px-4 mr-3 ${
              selectedCategory === "Vegetable"
                ? "border-green bg-green text-white"
                : "border-green"
            }`}
          >
            Vegetables
          </button>
          <button
            onClick={() => filterProducts("Fruits")}
            className={`border-2 p-1 text-black px-4 mr-3 ${
              selectedCategory === "Fruits"
                ? "border-green bg-green text-white"
                : "border-green"
            }`}
          >
            Fruits
          </button>
          <button
            onClick={() => filterProducts("all")}
            className={`border-2 p-1 text-black px-4 mr-3 ${
              selectedCategory === "all"
                ? "border-green bg-green text-white"
                : "border-green"
            }`}
          >
            Fresh
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:pt-20 lg:mx-auto lg:px-12 px-5 py-5 w-[350px] lg:w-[1300px] products">
        {filteredItems.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-green text-white border-0 rounded-full p-3 px-8 m-10">
          Browse More Products
        </button>
      </div>
    </div>
      <div className="flex flex-wrap justify-center bg-green items-center py-24 mt-10 bg-second bg-cover bg-center h-screen-50 w-full">
        <div>
          <h1 className="title text-white pl-8">Visit Our Firm</h1>
          <p className="text-white w-3/4 pl-8 pt-7">
            Visit our firm to discover a world of fresh, organic produce and
            experience our commitment to quality and sustainability firsthand.
          </p>
        </div>
        <div>
        <Link to='/contact'>
        <button className='bg-orange p-3 px-8 rounded-full text-white mt-10'>Visit Now</button>
        </Link>
        </div>
      </div>
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
    </div>
  );
};

export default Product;
