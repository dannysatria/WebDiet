import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainCourse from "../assets/mainCourse.webp";
import drinkImage from "../assets/drink_image.webp";
import snacksImage from "../assets/snacks_image.webp";
import { useParams, Link, Outlet } from "react-router-dom";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";

const MainMenuMaterialPage = () => {
  const dispatch = useDispatch();
  const [dataBaru, setData] = useState([]);
  const { data, generalFoodData, filteredData, loading } = useSelector(
    (state) => state.menuMaterial
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
          <Link to={`/healthy-recipes/${generalFoodData[index]}`} key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{item}</h2>
            {/* Add more content here as needed */}
            {item && (
              <img
                src={
                  item === "Hidangan Utama"
                    && mainCourse
                    || item === "Minuman"
                    && drinkImage
                    || item === "Snack"
                    && snacksImage
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

export default MainMenuMaterialPage;
