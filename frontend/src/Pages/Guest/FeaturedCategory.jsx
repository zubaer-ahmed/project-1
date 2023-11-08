import React from "react";
import { Link } from "react-router-dom";

import categories from "../../Data/services.json";


const FeaturedCategory = () => {
  return (
    <>

        <div className="container px-12 py-12 text-gray-500">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 underline decoration-blue-500">
              Featured Category
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            {categories.slice(0, 10).map((category, index) => (
              <Link to={`/category/${category.value}`} key={index} className="p-4 md:w-1/5 sm:w-1/2 w-full">
                <div className="border-2 border-blue-400 px-4 py-6 rounded-lg h-full">
                  <img
                    src={category.img}
                    className="h-12 mx-auto"
                    alt=""
                  />
                  <p className="leading-relaxed mt-2">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

    </>
  );
};

export default FeaturedCategory;
