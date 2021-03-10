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
    <section className="">
      <div className="container hero-filter">
        <div className="hero-filter__left">
          <h1>All Products</h1>
          <p>A 360° look at Lumin</p>
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
