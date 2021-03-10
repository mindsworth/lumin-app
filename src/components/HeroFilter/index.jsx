import React, { useState } from "react";
import Select from "react-select";
import "./HeroFilterStyles.scss";

const options = [
  { value: "all ", label: "All Product" },
  { value: "soap", label: "Soap" },
  { value: "cream", label: "Cream" },
];

function HeroFilter() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section className="hero-filter-wrapper">
      <div className="container hero-filter">
        <div className="hero-filter__left">
          <h1 className="title">All Products</h1>
          <p className="title__sub">A 360° look at Lumin</p>
        </div>
        <div className="hero-filter__right">
          <Select
            className="filter"
            value={selectedOption}
            onChange={(selectedOption) => setSelectedOption(selectedOption)}
            options={options}
            isSearchable={false}
            placeholder="Filter by"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroFilter;
