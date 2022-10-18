import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Games from "./pages/Games";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
      <Routes>
        <Route path={"/"} element={<AppLayout/>}>
          <Route index element={<Games/>}/>
          <Route path={"/games/:id"} element={<Game/>}/>
          <Route path={"/cart"} element={<Cart/>}/>
          <Route path={"*"} element={<NotFound/>}/>
        </Route>
      </Routes>
  );
}

export default App;
