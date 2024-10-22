import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dietDashImage from "../assets/dietDashImage.webp";
import dietInterFasting from "../assets/dietInterFasting.webp";
import dietVegan from "../assets/dietVegan.webp";
import dietKatogenik from "../assets/dietKatogenik.webp";
import dietMediterania from "../assets/dietMediterania.webp";
import dietLowCarb from "../assets/dietLowCarb.webp";
import { useParams, Link, Outlet } from "react-router-dom";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const MainDietMaterialPage = () => {
  const dispatch = useDispatch();
  const [dataBaru, setData] = useState([]);
  const { generalFoodData } = useSelector(
    (state) => state.dietMaterial
  );

  useEffect(() => {
    const dataCamelCase = generalFoodData.map((item) => {
      return camelCaseToLowerCase(item);
    });
    const dataCapitalize = dataCamelCase.map((item) => {
      return capitalizeEachWord(item);
    });

    setData(dataCapitalize);
    // dispatch(fetchFoodMaterials(dataCapitalize));
  }, [generalFoodData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold pb-4">Choose Your Diet Menu </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
        {dataBaru.map((item, index) => (
          <Link to={`/diet-programs/${generalFoodData[index]}`} key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{item}</h2>
            {/* Add more content here as needed */}
            {item && (
              <img
                src={
                  item === "Diet Dash"
                    && dietDashImage
                    || item === "Diet Intermittent Fasting"
                    && dietInterFasting
                    || item === "Diet Katogenik"
                    && dietKatogenik
                    || item === "Diet Mediterania"
                    && dietMediterania
                    || item === "Diet Low Carb"
                    && dietLowCarb
                    || item === "Vegan"
                    && dietVegan
                }
                alt="banner"
                type="image/webp"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainDietMaterialPage;
