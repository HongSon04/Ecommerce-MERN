import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Category";

const Home = () => {
  return (
    <div className="w-full">
      <div>
        <Header></Header>
        <Banner></Banner>
        <Categories></Categories>
      </div>
    </div>
  );
};

export default Home;
