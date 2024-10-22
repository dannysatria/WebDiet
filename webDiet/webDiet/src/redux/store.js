// store.js
import { configureStore } from "@reduxjs/toolkit";
import foodMaterialReducer from "./slices/foodMaterialSlice";
import menuSlice from "./slices/menuSlice";
import dietSlice from "./slices/dietSlice";
import spekMakanan from "./slices/foodSpec";

export const store = configureStore({
  reducer: {
    foodMaterial: foodMaterialReducer,
    menuMaterial: menuSlice,
    dietMaterial: dietSlice,
    foodSpec: spekMakanan,
  },
});
