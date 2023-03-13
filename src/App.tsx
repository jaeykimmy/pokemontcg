import Favorites from "components/Favorites";
import Home from "components/Home";
import MyNavbar from "components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="favorites" element={<Favorites />}></Route>
        <Route path="pokemontcg" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
