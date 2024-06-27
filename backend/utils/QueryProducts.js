class QueryProducts {
  products = [];
  query = {};
  constructor(products, query) {
    this.products = products;
    this.query = query;
  }

  categoryQuery = () => {
    this.products = this.query.category
      ? this.products.filter(
          (product) => product.category === this.query.category
        )
      : this.products;

    return this;
  };

  ratingQuery = () => {
    this.products = this.query.rating
      ? this.products.filter(
          (product) =>
            parseInt(this.query.rating) <= product.rating &&
            product.rating < parseInt(this.query.rating) + 1
        )
      : this.products;

    return this;
  };

  priceQuery = () => {
    this.products = this.products.filter(
      (product) =>
        product.price >= this.query.low && product.price <= this.query.high
    );

    return this;
  };

  sortByPrice = () => {
    if (this.query.sortPrice) {
      if (this.query.sortPrice === "low-to-high") {
        this.products = this.products.sort((a, b) => a.price - b.price);
      } else {
        this.products = this.products.sort((a, b) => b.price - a.price);
      }
    }
    return this;
  };

  searchQuery = () => {
    this.products = this.query.searchValue
      ? this.products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.query.searchValue.toLowerCase())
        )
      : this.products;

    return this;
  };

  skipPage = () => {
    const { pageNumber } = this.query;
    const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage;
    let skipProduct = [];
    for (let i = skipPage; i < this.products.length; i++) {
      skipProduct.push(this.products[i]);
    }
    this.products = skipProduct;
    return this;
  };

  limitPage = () => {
    let temp = [];
    if (this.products.length > this.query.parPage) {
      for (let i = 0; i < this.query.parPage; i++) {
        temp.push(this.products[i]);
      }
      this.products = temp;
    }
    return this;
  };

  getProducts = () => {
    return this.products;
  };

  countProducts = () => {
    return this.products.length;
  };
}

module.exports = QueryProducts;
