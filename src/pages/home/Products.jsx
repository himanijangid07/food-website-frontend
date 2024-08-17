import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import {Link} from "react-router-dom"

const Products = () => {
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

  return (
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
        <Link to='/product'>
        <button className="bg-green text-white border-0 rounded-full p-3 px-8 m-10">
          Browse More Products
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
