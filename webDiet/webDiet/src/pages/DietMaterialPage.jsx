// FoodMaterialPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDietMaterials,
  setFilteredData,
} from "../redux/slices/dietSlice";
import { useParams, Link, Outlet } from "react-router-dom";
import { st } from "rdflib";
import { calculateSAW, highCalories, highCarbs, highFat, highProtein } from "../utils/filterSaw";

const DietMaterialPage = () => {
  const { slug, name } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dietMaterial);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (slug !== undefined){
      dispatch(fetchDietMaterials(slug));
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
    }, 500); // Delay of 500 milliseconds

    return () => clearTimeout(timeoutId); // Clear timeout on cleanup
  }, [searchTerm, data, dispatch]);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const capitalizeEachWordSlug = (str) => {
    // Add a space before each uppercase letter except the first one
    const formattedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    // Capitalize each word (this step is not necessary if your string is already in camelCase)
    const slug = formattedStr
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
    return slug;
  };

  const filterDiet = (text) => {
    
    try {
      // Use your existing SPARQL endpoint URL
      const base_url = "http://localhost:3030/makanan_diet/sparql";

      // Send the query to the SPARQL endpoint
      const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX md: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>
      
      SELECT ?makanan ?weight ?calories ?carbs ?fat ?protein ?fiber
      WHERE {
        ?makanan md:masukKeDiet md:${slug === "dietDash"? "dietDASH" : slug === 'dietKatogenik'? 'dietKetogenik' : slug && slug} .
        OPTIONAL { ?makanan md:berat ?weight }
        OPTIONAL { ?makanan md:kandunganKalori ?calories }
        OPTIONAL { ?makanan md:kandunganKarbohidrat ?carbs }
        OPTIONAL { ?makanan md:kandunganLemak ?fat }
        OPTIONAL { ?makanan md:kandunganProtein ?protein }
        OPTIONAL { ?makanan md:kandunganSerat ?fiber }
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
                  <Link to="/diet-programs" className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold">
                    Diet
                  </Link>
                </div>
              </li>
              { slug? (<li>
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
                  <Link to={`/diet-programs/${slug}`} className="ml-1 text-lg font-medium text-black hover:text-gray-900 dark:text-old-gold">
                    {capitalizeEachWordSlug(slug)}
                  </Link>
                </div>
              </li>) : ''}
              { name? (<li>
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
                    {capitalizeEachWordSlug(slug)}
                  </span>
                </div>
              </li>) : ''}
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
                filterDiet('protein');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Protein
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterDiet('fat');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Fat
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterDiet('calories');
              }}
              className="px-4 py-2 bg-old-gold text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              High Calories
            </button>
            <button
              id="filterButton"
              onClick={e => {
                e.preventDefault();
                filterDiet('carbs');
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

export default DietMaterialPage;
