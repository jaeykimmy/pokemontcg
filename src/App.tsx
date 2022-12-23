import Favorites from "components/Favorites";
import Home from "components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="favorite" element={<Favorites />}></Route>
        <Route path="" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
