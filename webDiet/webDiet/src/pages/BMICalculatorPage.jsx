import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import dietDashImage from "../assets/dietDashImage.webp";
import dietInterFasting from "../assets/dietInterFasting.webp";
import dietVegan from "../assets/dietVegan.webp";
import dietKatogenik from "../assets/dietKatogenik.webp";
import dietMediterania from "../assets/dietMediterania.webp";
import dietLowCarb from "../assets/dietLowCarb.webp";
import calsImage from "../assets/calsImage.webp";
import carbsImage from "../assets/carbsImage.webp";
import fatImage from "../assets/fatImage.webp";
import proteinImage from "../assets/proteinImage.webp";
import seratImage from "../assets/seratImage.webp";
import { useSelector } from "react-redux";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const BMICalculatorPage = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [dataDiet, setDataDiet] = useState([]);
  const [dataKelompokMakanan, setDataKelompokMakanan] = useState([]);
  const filterDietMenu = [
    {
      bmiResult: "Underweight",
      dietMenu: ["dietMediterania", "vegan"],
    },
    {
      bmiResult: "Normal weight",
      dietMenu: [
        "dietMediterania",
        "vegan",
        "dietDash",
        "dietIntermittentFasting",
      ],
    },
    {
      bmiResult: "Overweight",
      dietMenu: [
        "dietMediterania",
        "dietKatogenik",
        "dietLowCarb",
        "dietDash",
        "dietIntermittentFasting",
      ],
    },
    {
      bmiResult: "Obesity",
      dietMenu: [
        "dietMediterania",
        "dietKatogenik",
        "dietLowCarb",
        "dietDash",
        "dietIntermittentFasting",
      ],
    },
  ];
  const filterFoodMenu = [
    {
      bmiResult: "Underweight",
      foodMenu: [
        "tinggiKalori",
        "tinggiKarbo",
        "tinggiLemak",
        "tinggiProtein",
        "tinggiSerat",
      ],
    },
    {
      bmiResult: "Normal weight",
      foodMenu: ["tinggiKarbo", "tinggiLemak", "tinggiProtein", "tinggiSerat"],
    },
    {
      bmiResult: "Overweight",
      foodMenu: ["tinggiProtein", "tinggiSerat"],
    },
    {
      bmiResult: "Obesity",
      foodMenu: ["tinggiProtein", "tinggiSerat"],
    },
  ];

  const { generalFoodData } = useSelector((state) => state.dietMaterial);
  const { generalFoodData: generalFoodKelompokMakanan } = useSelector((state) => state.foodSpec);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let bmiMessage = "";
      let progressValue = 0;

      if (bmiValue < 18.5) {
        bmiMessage = "Underweight";
        progressValue = (bmiValue / 18.5) * 25; // Scale to 0-25
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiMessage = "Normal weight";
        progressValue = 25 + ((bmiValue - 18.5) / (24.9 - 18.5)) * 25; // Scale to 25-50
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiMessage = "Overweight";
        progressValue = 50 + ((bmiValue - 25) / (29.9 - 25)) * 25; // Scale to 50-75
      } else {
        bmiMessage = "Obesity";
        progressValue = 75 + ((bmiValue - 30) / (35 - 30)) * 25; // Scale to 75-100
        if (progressValue > 100) progressValue = 100;
      }

      localStorage.setItem("bmi", bmiValue);
      localStorage.setItem("message", bmiMessage);
      localStorage.setItem("progress", progressValue);

      setMessage(bmiMessage);
      setProgress(progressValue);
      setPopupVisible(true);
    }
  };

  const camelCase = (text) => {
    const dataCamelCase = camelCaseToLowerCase(text);
    const dataCapitalize = capitalizeEachWord(dataCamelCase);

    return dataCapitalize;
  };

  useEffect(() => {
    setDataDiet(generalFoodData);
    setDataKelompokMakanan(generalFoodKelompokMakanan);

    const bmi = localStorage.getItem("bmi");
    const message = localStorage.getItem("message");
    const progress = localStorage.getItem("progress");
    if (bmi && message && progress) {
      setBmi(bmi);
      setMessage(message);
      setProgress(progress);
      setPopupVisible(true);
    }
  }, [generalFoodData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">BMI Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-container">
          <label htmlFor="weight" className="block text-lg font-medium mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="input-container">
          <label htmlFor="height" className="block text-lg font-medium mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={calculateBMI}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Calculate BMI
      </button>
      {bmi && (
        <div className="mt-8 text-center relative">
          <h2 className="text-2xl font-bold">Your BMI: {bmi}</h2>
          <div className="w-full bg-gray-200 rounded-full h-6 mt-4 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-6 rounded-full"
              style={{
                width: `100%`,
                background: `linear-gradient(to right, red 0%, red 25%, green 25%, green 50%, orange 50%, orange 75%, red 75%, red 100%)`,
              }}
            />
            <div
              className="absolute top-0 h-8 w-1 bg-yellow-400"
              style={{
                left: `${progress}%`,
              }}
            />
          </div>
          <div className="flex">
            <span
              className={`absolute -translate-x-1/2 -bottom-12 bg-black text-white p-2 rounded-lg shadow-lg text-sm text-center`}
              style={{
                left: `${progress}%`,
                visibility: popupVisible ? "visible" : "hidden",
              }}
            >
              <svg
                className="absolute text-black h-2 w-full left-[2px] bottom-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xmlSpace="preserve"
              >
                <polygon
                  className="fill-current"
                  points="0,0 127.5, 227.5 255,0"
                />
              </svg>
              {message} - {bmi}
            </span>
          </div>
        </div>
      )}
      {message && dataDiet && (
        <>
          {/* Showing Menu Diet Based on BMI */}
          <div className="container mx-auto p-4 pt-14">
            <h1 className="text-3xl font-bold pb-4">Diet Menu For {message}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
              {filterDietMenu
                .filter((item) => item.bmiResult === message)
                .flatMap((filteredItem) =>
                  dataDiet
                    .filter((dataItem) =>
                      filteredItem.dietMenu.includes(dataItem)
                    )
                    .map((filteredDataItem, index) => (
                      <Link
                        to={`/diet-programs/${filteredDataItem}`}
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4"
                      >
                        <h2 className="text-xl font-bold mb-2">
                          {camelCase(filteredDataItem)}
                        </h2>
                        {/* Add more content here as needed */}
                        {filteredDataItem && (
                          <img
                            src={
                              (filteredDataItem === "dietDash" &&
                                dietDashImage) ||
                              (filteredDataItem === "dietIntermittentFasting" &&
                                dietInterFasting) ||
                              (filteredDataItem === "dietKatogenik" &&
                                dietKatogenik) ||
                              (filteredDataItem === "dietMediterania" &&
                                dietMediterania) ||
                              (filteredDataItem === "dietLowCarb" &&
                                dietLowCarb) ||
                              (filteredDataItem === "vegan" && dietVegan)
                            }
                            alt="banner"
                            type="image/webp"
                            className="w-full h-48 object-cover rounded-md"
                          />
                        )}
                      </Link>
                    ))
                )}
            </div>
          </div>
          {/* Showing Menu Kelompok Makanan Based on BMI */}
          <div className="container mx-auto p-4 pt-14">
            <h1 className="text-3xl font-bold pb-4">Food Menu For {message}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
              {filterFoodMenu
                .filter((item) => item.bmiResult === message)
                .flatMap((filteredItem) =>
                  dataKelompokMakanan
                    .filter((dataItem) =>
                      filteredItem.foodMenu.includes(dataItem)
                    )
                    .map((filteredDataItem, index) => (
                      <Link
                        to={`/food-specs/${filteredDataItem}`}
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4"
                      >
                        <h2 className="text-xl font-bold mb-2">
                          {camelCase(filteredDataItem)}
                        </h2>
                        {/* Add more content here as needed */}
                        {filteredDataItem && (
                          <img
                            src={
                              (filteredDataItem === "tinggiKalori" &&
                              calsImage) ||
                              (filteredDataItem === "tinggiKarbo" &&
                              carbsImage) ||
                              (filteredDataItem === "tinggiLemak" &&
                              fatImage) ||
                              (filteredDataItem === "tinggiProtein" &&
                              proteinImage) ||
                              (filteredDataItem === "tinggiSerat" &&
                              seratImage)
                            }
                            alt="banner"
                            type="image/webp"
                            className="w-full h-48 object-cover rounded-md"
                          />
                        )}
                      </Link>
                    ))
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BMICalculatorPage;
