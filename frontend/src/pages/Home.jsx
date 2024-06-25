import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Category";
import FeatureProduct from "../components/products/FeatureProduct";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories, GetProducts } from "../store/reducers/HomeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const {
    categories,
    products,
    lastest_products,
    top_rated_products,
    discount_products,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetProducts());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Header categories={categories}></Header>
      <Banner></Banner>
      <Categories categories={categories}></Categories>
      <div className="py-[45px]">
        <FeatureProduct products={products}></FeatureProduct>
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products products={lastest_products} title="Lastest Product" />
            </div>
            <div className="overflow-hidden">
              <Products
                products={top_rated_products}
                title="Top Rated Product"
              />
            </div>
            <div className="overflow-hidden">
              <Products products={discount_products} title="Discount Product" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
