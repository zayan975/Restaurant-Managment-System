import React from "react";
import { popularDishes } from "../../constants/index";

const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6 ">
      <div className="bg-[#1a1a1a] w-full rounded-lg shadow-md">

        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a
            href="#"
            className="text-[#f6b100] text-sm font-semibold hover:underline transition-colors duration-200"
          >
            View all
          </a>
        </div>

        <div className="overflow-y-auto max-h-[680px] no-scrollbar px-3 pb-3">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center sm:flex-row flex-col sm:justify-start justify-center gap-4 bg-[#1f1f1f] rounded-2xl px-6 py-4 mt-4 mx-3 transition-all duration-300 hover:bg-[#2a2a2a] hover:scale-[1.02] cursor-pointer"
            >
              <h1 className="text-[#f6b100] font-bold sm:text-xl text-lg">
                {dish.id < 10 ? `0${dish.id}` : dish.id}
              </h1>

              <img
                src={dish.image}
                alt={dish.name}
                className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#f6b100] hover:rotate-6 transition-transform duration-300"
              />

              <div className="text-center sm:text-left">
                <h1 className="text-[#f5f5f5] font-semibold tracking-wide">
                  {dish.name}
                </h1>
                <p className="text-[#ababab] text-sm">
                  Orders:{" "}
                  <span className="text-[#f6b100] font-semibold">
                    {dish.numberoforders}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
