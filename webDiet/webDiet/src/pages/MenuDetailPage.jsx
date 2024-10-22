import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { graph, parse, SPARQLToQuery } from "rdflib";
import { queries } from "../services/querryRDF";
import {
  camelCaseToLowerCase,
  capitalizeEachWord,
} from "../services/TextConvert";
import axios from "axios";

const MenuDetailPage = () => {
  const { slug, name } = useParams();
  const [foodDetails, setFoodDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodDetails();
  }, []);

  const fetchFoodDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("/makanandiet2aplikasi.rdf");
      const base_url = "http://localhost:3030/makanan_diet/sparql";

      // parse(rdfText, store, baseURI, mimeType);

      const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX md: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>
      
      SELECT ?food ?weight ?calories ?carbs ?fat ?protein ?fiber
      WHERE {
        ?food rdf:type md:${slug === 'hidanganUtama'? 'hidanganaUtama' : slug === 'minuman'? 'minuman' : 'snacks'} .
        FILTER (regex(str(?food), "${name}", "i"))
        OPTIONAL { ?food md:berat ?weight }
        OPTIONAL { ?food md:kandunganKalori ?calories }
        OPTIONAL { ?food md:kandunganKarbohidrat ?carbs }
        OPTIONAL { ?food md:kandunganLemak ?fat }
        OPTIONAL { ?food md:kandunganProtein ?protein }
        OPTIONAL { ?food md:kandunganSerat ?fiber }
      }
      `;

      const encodedQuery = encodeURIComponent(query);

      axios
        .post(`${base_url}?query=${encodedQuery}`)
        .then((res) => {
          const result = res.data.results.bindings;
          const data = result.map((item) => {
            const baruData = item.food.value.split("#").pop();
            const camel = camelCaseToLowerCase(baruData);
            const capitalize = capitalizeEachWord(camel);
            return {
              ...item,
              food: capitalize,
            };
          })
          setFoodDetails(data);
        })
        .catch((err) => {
          console.error(err);
        });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching food details:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
  {loading ? (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg">Loading...</p>
    </div>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Displaying the food details */}
      {foodDetails.map((foodItem, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2 capitalize">
            {foodItem.food}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-gray-700"><strong>Weight:</strong> {foodItem.weight?.value || 'N/A'}</p>
            <p className="text-gray-700"><strong>Calories:</strong> {foodItem.calories?.value || 'N/A'}</p>
            <p className="text-gray-700"><strong>Carbs:</strong> {foodItem.carbs?.value || 'N/A'}</p>
            <p className="text-gray-700"><strong>Fat:</strong> {foodItem.fat?.value || 'N/A'}</p>
            <p className="text-gray-700"><strong>Protein:</strong> {foodItem.protein?.value || 'N/A'}</p>
            <p className="text-gray-700"><strong>Fiber:</strong> {foodItem.fiber?.value || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default MenuDetailPage;
