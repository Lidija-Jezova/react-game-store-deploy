import React from 'react';
import Header from "../componenets/header";
import {Outlet} from "react-router-dom";
import Footer from "../componenets/footer";

const AppLayout = () => {
  return (
      <div className="App-wrapper">
        <Header/>
        <main className="main">
          <Outlet/>
        </main>
        <Footer/>
      </div>
  );
};

export default AppLayout;