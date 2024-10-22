import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import HomePage from "../pages/HomePage";
import FoodMaterialPage from "../pages/FoodMaterialPage";
import FoodListPage from "../pages/FoodListPage";
import MainMaterialPage from "../pages/MainMaterialPage";
import MenuMaterialPage from "../pages/MenuMaterialPage";
import MainMenuMaterialPage from "../pages/MainMenuMaterialPage";
import MenuListPage from "../pages/MenuListPage";
import DietMaterialPage from "../pages/DietMaterialPage";
import MainDietMaterialPage from "../pages/MainDietMaterialPage";
import DietListPage from "../pages/DietListPage";
import FoodSpecMaterialPage from "../pages/FoodSpecMaterial";
import MainSpecMaterialPage from "../pages/MainSpecMaterial";
import FoodSpecList from "../pages/FoodSpecList";
import FoodDetailPage from "../pages/FoodDetailPage";
import MenuDetailPage from "../pages/MenuDetailPage";
import DietDetailPage from "../pages/DietDetailPage";
import SpesificationDetailPage from "../pages/SpesificationDetailPage";
import BMICalculatorPage from "../pages/BMICalculatorPage";

export const RouteConfig = () => {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/about" element={<div>About</div>} />
            <Route path="/calculate-bmi" element={<BMICalculatorPage />} />
            <Route path="/healthy-recipes" element={<MenuMaterialPage />}>
              <Route index element={<MainMenuMaterialPage />} />
              <Route path=":slug" element={<MenuListPage />} />
              <Route path=":slug/detail/:name" element={<MenuDetailPage />} />
            </Route>
            <Route path="/food-material" element={<FoodMaterialPage />}>
              <Route index element={<MainMaterialPage />} />
              <Route path=":slug" element={<FoodListPage />}/>
              <Route path=":slug/detail/:name" element={<FoodDetailPage />} />
            </Route>
            <Route path="/diet-programs" element={<DietMaterialPage />}>
              <Route index element={<MainDietMaterialPage />} />
              <Route path=":slug" element={<DietListPage />}/>
              <Route path=":slug/detail/:name" element={<DietDetailPage />} />
            </Route>
            <Route path="/food-specs" element={<FoodSpecMaterialPage />}>
              <Route index element={<MainSpecMaterialPage />} />
              <Route path=":slug" element={<FoodSpecList />}/>
              <Route path=":slug/detail/:name" element={<SpesificationDetailPage />} />
            </Route>
          </Route>
      </Routes>
  );
};
