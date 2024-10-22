import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import meatImage from "../assets/meat_image.webp";
import plantImage from "../assets/plant_image.webp";
import rawImage from "../assets/raw_image.webp";
import { useParams, Link, Outlet } from "react-router-dom";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const MainMaterialPage = () => {
  const dispatch = useDispatch();
  const [dataBaru, setData] = useState([]);
  const { data, generalFoodData, filteredData, loading } = useSelector(
    (state) => state.foodMaterial
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
      <h1 className="text-3xl font-bold pb-4">Choose Your Food Materials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
        {dataBaru.map((item, index) => (
          <Link to={`/food-material/${generalFoodData[index]}`} key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{item}</h2>
            {/* Add more content here as needed */}
            {item === "Dari Hewan" && (
              <img
                src={
                  item === "Dari Hewan"
                    ? meatImage
                    : item !== "Dari Hewan"
                    ? plantImage
                    : item === "Pokok"
                    ? plantImage : ''
                }
                alt="banner"
                type="image/webp"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            {item === "Dari Tumbuhan" && (
              <img
                src={plantImage}
                alt="banner"
                type="image/webp"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            {item === "Pokok" && (
              <img
                src={rawImage}
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

export default MainMaterialPage;
