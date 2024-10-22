// FoodMaterialPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodMaterials,
  setFilteredData,
} from "../redux/slices/foodMaterialSlice";
import { useParams, Link, Outlet } from "react-router-dom";
import { calculateSAW, highCalories, highCarbs, highFat, highProtein } from "../utils/filterSaw";

const FoodMaterialPage = () => {
  const { slug, name } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.foodMaterial);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (slug !== undefined) {
      dispatch(fetchFoodMaterials(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = searchTerm
        ? data.filter((item) =>
            item.makanan.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;
      dispatch(setFilteredData(filtered));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, data, dispatch]);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const capitalizeEachWordSlug = (str) => {
    const formattedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    const slug = formattedStr
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return slug;
  };

  // Function to execute the SPARQL query and display results
  const filterBahan = (text) => {
    
    try {
      // Use your existing SPARQL endpoint URL
      const base_url = "http://localhost:3030/makanan_diet/sparql";

      // Send the query to the SPARQL endpoint
      const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

        SELECT ?makanan ?weight ?calories ?carbs ?fat ?protein ?fiber
        WHERE {
        ?makanan rdf:type makanan_diet:${slug !== 'dariTumbuhan' ? slug.toLowerCase() : slug} .
        OPTIONAL { ?makanan makanan_diet:berat ?weight }
        OPTIONAL { ?makanan makanan_diet:kandunganKalori ?calories }
        OPTIONAL { ?makanan makanan_diet:kandunganKarbohidrat ?carbs }
        OPTIONAL { ?makanan makanan_diet:kandunganLemak ?fat }
        OPTIONAL { ?makanan makanan_diet:kandunganProtein ?protein }
        OPTIONAL { ?makanan makanan_diet:kandunganSerat ?fiber }
        }
      `;

      const encodedQuery = encodeURIComponent(query);

      axios
        .post(`${base_url}?query=${encodedQuery}`)
        .then((res) => {
          const result = res.data.results.bindings;
          const data = result.map((item) => {
            const baruData = item.makanan.value.split("#").pop();
            return {
              ...item,
              makanan: baruData,
            };
          });
          const resultlSaw = calculateSAW(data,
            text === 'protein' ? highProtein : 
            text === 'fat' ? highFat : 
            text === 'calories' ? highCalories : highCarbs 
          );
          // console.log(resultlSaw);
          dispatch(setFilteredData(resultlSaw));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-14">
        <div className="grid grid-cols-1 gap-10">
          {/* Breadcrumbs */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold dark:hover:text-black"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-7 h-7 text-old-gold pt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    to="/food-material"
                    className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold"
                  >
                    Food Materials
                  </Link>
                </div>
              </li>
              {slug ? (
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-7 h-7 text-old-gold pt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Link
                      to={`/food-material/${slug}`}
                      className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold"
                    >
                      {capitalizeEachWordSlug(slug)}
                    </Link>
                  </div>
                </li>
              ) : (
                ""
              )}
              {name ? (
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-7 h-7 text-old-gold pt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold">
                      {capitalizeEachWordSlug(name)}
                    </span>
                  </div>
                </li>
              ) : (
                ""
              )}
            </ol>
          </nav>
          {/*Search Input */}
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            placeholder="Search..."
            className="px-4 py-2 border border-old-gold bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          {/* Filter Button */}
          <div className="flex items-center justify-start gap-4">
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterBahan('protein');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Protein
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterBahan('fat');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Fat
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterBahan('calories');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Calories
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterBahan('carbs');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Carbs
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default FoodMaterialPage;
