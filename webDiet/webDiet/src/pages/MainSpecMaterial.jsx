import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import snacksImage from "../assets/snacks_image.webp";
import calsImage from "../assets/calsImage.webp";
import carbsImage from "../assets/carbsImage.webp";
import fatImage from "../assets/fatImage.webp";
import proteinImage from "../assets/proteinImage.webp";
import seratImage from "../assets/seratImage.webp";
import { Link } from "react-router-dom";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const MainSpecMaterialPage = () => {
  const dispatch = useDispatch();
  const [dataBaru, setData] = useState([]);
  const { data, generalFoodData, filteredData, loading } = useSelector(
    (state) => state.foodSpec
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
      <h1 className="text-3xl font-bold pb-4">Choose Your Menu </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-10">
        {dataBaru.map((item, index) => (
          <Link to={`/food-specs/${generalFoodData[index]}`} key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{item}</h2>
            {/* Add more content here as needed */}
            {item && (
              <img
                src={
                  item === "Tinggi Kalori"
                    && calsImage
                    || item === "Tinggi Karbo"
                    && carbsImage
                    || item === "Tinggi Lemak"
                    && fatImage 
                    || item === "Tinggi Protein"  
                    && proteinImage 
                    || item === "Tinggi Serat"
                    && seratImage
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

export default MainSpecMaterialPage;
