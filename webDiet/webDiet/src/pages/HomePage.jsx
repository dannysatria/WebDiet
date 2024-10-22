import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import imgDiet from "../assets/diet-pict-1.webp";
import { graph, parse, SPARQLToQuery } from "rdflib";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <>
      {/* Banner */}
      <Banner />
      {/* Content */}
      <div className="grid grid-cols-1 gap-16">
        <div className="max-md:grid-cols-1 grid grid-cols-2 gap-4 h-[22rem]">
          <div className="max-md:row-span-3 rounded-xl d-block relative overflow-hidden">
            <img
              src={imgDiet}
              alt="banner"
              type="image/webp"
              className="object-cover w-full h-[25rem]"
            />
          </div>
          <div className="grid grid-cols-subgrid gap-4 px-7">
            <div className="col-start-2 flex text-start items-center">
              <h1 className="text-3xl">
                Dive Into Our
                <br />
                Best <b>Diet Program</b>
              </h1>
            </div>
            <Link
              to="/calculate-bmi"
              className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center cursor-pointer"
            >
              <h1>Body Mass Index Calculation</h1>
            </Link>
            <Link to="/healthy-recipes" className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
              <h1>Healty Recipes Menu</h1>
            </Link>
            <Link to="/food-material" className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
              <h1>Food Material</h1>
            </Link>
            <Link to="/diet-programs" className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
              <h1>Diet Programs</h1>
            </Link>
            <Link to="/food-specs" className="col-start-2 hover:row-span-3 border-black border-b-[1px] px-3 text-start flex items-center">
              <h1>Food Specification</h1>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 h-auto border border-white rounded-2xl bg-[#BFBD5F]">
          <div className="max-md:grid-cols-1 grid grid-cols-2 ">
            <div className="max-md:hidden grid grid-cols-subgrid gap-4 px-12 m-4 rounded-2xl">
              <div className="flex text-start items-center">
                <h1 className="max-xl:text-4xl text-5xl leading-snug ">
                  <>
                    Sustainable Diet Solution For Our Client Future Mindset,
                    With Colaboration
                  </>
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-subgrid gap-4 px-7 m-4 rounded-2xl">
              <div className="col-start-2 flex px-2 text-start items-top mt-4">
                <div className="flex items-center pb-1 justify-center border rounded-full w-[120px] h-9 bg-[#E2E0B6]">
                  <h1 className="text-md">
                    <b>Our Products</b>
                  </h1>
                </div>
              </div>
              <div className="col-start-2 px-2 text-start flex items-end">
                <h1 className="text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Molestiae dolorum quidem pariatur dolore, exercitationem ea
                  placeat! Quasi, molestias eveniet neque voluptatem cumque
                  debitis, cum porro iste perferendis, iusto sit hic?
                </h1>
              </div>
              <div className="col-start-2 px-2 text-start flex items-center">
                <div className="flex items-center pb-1 justify-center rounded-[12px] w-28 h-10 bg-black">
                  <h1 className="text-white">See More</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:grid-cols-1 grid grid-cols-2 ">
            <div className="max-md:hidden grid grid-cols-2 bg-[#E2E0B6] gap-4 m-4 rounded-2xl">
              <div className="items-center rounded-xl d-block relative overflow-hidden w-[16rem] h-[16rem] m-3">
                <img
                  src={imgDiet}
                  alt="banner"
                  type="image/webp"
                  className="object-cover w-[16rem] h-[16rem]"
                />
              </div>
              <div className="grid grid-cols-subgrid gap-2 px-2 m-2 rounded-2xl">
                <div className="col-start-2 flex text-start items-center">
                  <div className="flex items-center pt-1 justify-center border rounded-full w-[130px] h-9 bg-[#E2E0B6]">
                    <h1 className="text-xl">
                      <b>Our Products</b>
                    </h1>
                  </div>
                </div>
                <div className="col-start-2 px-2 pb-5 text-start flex items-end">
                  <h1 className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae dolorum quidem pariatur dolore, exercitationem ea
                    placeat! Quasi, molestias eveniet neque voluptatem cumque
                    debitis, cum porro iste perferendis, iusto sit hic?
                  </h1>
                </div>
                <div className="col-start-2 px-1 text-start flex items-center">
                  <div className="flex items-center pb-1 justify-center rounded-[12px] w-24 h-8 bg-black">
                    <h2 className="text-white">See More</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-md:hidden grid grid-cols-2 bg-[#E2E0B6] gap-4 m-4 rounded-2xl">
              <div className="items-center rounded-xl d-block relative overflow-hidden w-[16rem] h-[16rem] m-3">
                <img
                  src={imgDiet}
                  alt="banner"
                  type="image/webp"
                  className="object-cover w-[16rem] h-[16rem]"
                />
              </div>
              <div className="grid grid-cols-subgrid gap-2 px-2 m-2 rounded-2xl">
                <div className="col-start-2 flex text-start items-center">
                  <div className="flex items-center pt-1 justify-center border rounded-full w-[130px] h-9 bg-[#E2E0B6]">
                    <h1 className="text-xl">
                      <b>Our Products</b>
                    </h1>
                  </div>
                </div>
                <div className="col-start-2 px-2 pb-5 text-start flex items-end">
                  <h1 className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae dolorum quidem pariatur dolore, exercitationem ea
                    placeat! Quasi, molestias eveniet neque voluptatem cumque
                    debitis, cum porro iste perferendis, iusto sit hic?
                  </h1>
                </div>
                <div className="col-start-2 px-1 text-start flex items-center">
                  <div className="flex items-center pb-1 justify-center rounded-[12px] w-24 h-8 bg-black">
                    <h2 className="text-white">See More</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="rounded-xl d-block relative overflow-hidden max-h-100">
                  <img
                    src={imgDiet2}
                    alt="banner"
                    type="image/webp"
                    className="object-cover w-full h-[25rem] pb-[3rem]"
                  />
                </div> */}
        </div>
      </div>
      <h1>Halo</h1>
    </>
  );
};

export default HomePage;
