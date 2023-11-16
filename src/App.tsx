import Favorites from "components/Favorites";
import Home from "components/Home";
import MyNavbar from "components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="favorites" element={<Favorites />}></Route>
        <Route path="pokemontcg" element={<Home />}></Route>
        <Route path="/" element={<Navigate to="/pokemontcg" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
