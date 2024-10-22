// slices/foodMaterialSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graph, parse, SPARQLToQuery } from "rdflib";
import { camelCaseToLowerCase, capitalizeEachWord } from "../../services/TextConvert";
import { queries } from "../../services/querryRDF";

export const fetchMenuMaterials = createAsyncThunk(
    "menuMaterial/fetchMenuMaterials",
    async (slug) => {
      const response = await fetch("/makanandiet2aplikasi.rdf");
      const rdfText = await response.text();
      const store = graph();
      const mimeType = "application/rdf+xml";
      const baseURI = import.meta.env.VITE_APP_BASE_URL;
  
      parse(rdfText, store, baseURI, mimeType);
  
      const query = 
        slug === "hidanganUtama" ? queries.hidanganUtama : 
        slug == "minuman" ? queries.minuman : 
        queries.snacks
  
      const sparqlQuery = SPARQLToQuery(query, false, store);
      const results = [];
  
      // Use a Promise to handle the asynchronous query
      const queryPromise = new Promise((resolve, reject) => {
        store.query(sparqlQuery, (result) => {
          let data = result["?makanan"].value;
          let newData = data.replace(
            "http://www.semanticweb.org/danny/2024/5/makanan_diet#",
            ""
          );
          results.push({ makanan: newData });
          resolve(results); // Resolve the promise with the results
        });
      });
  
      // Await the query promise to get the results
      const fetchedResults = await queryPromise;
      return fetchedResults; // Return the results to the reducer
    }
);
  
const foodMenuSlice = createSlice({
    name: "menuMaterial",
    initialState: {
      data: [],
      generalFoodData: ['hidanganUtama', 'minuman', 'snack'],
      filteredData: [],
      loading: false,
      error: null,
    },
    reducers: {
      setFilteredData: (state, action) => {
        state.filteredData = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMenuMaterials.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMenuMaterials.fulfilled, (state, action) => {
          state.data = action.payload;
          state.filteredData = action.payload;
          state.loading = false;
        })
        .addCase(fetchMenuMaterials.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
});

export const { setFilteredData } = foodMenuSlice.actions;
export default foodMenuSlice.reducer;