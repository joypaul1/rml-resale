import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select2Dp from "../components/Select2Dp";
import Typewriter from "../components/Typewriter";

const BrandOptions = [
  { value: "1", label: "Eicher" },
  { value: "2", label: "Mahindra" },
  { value: "3", label: "Dongfeng" },
];

function FindCar() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [modelList, setModelList] = useState([]);

  const handleBrandChange = async (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory(null);
    setSelectedModel(null);
    setCategoryList([]);
    setModelList([]);
    try {
      const response = await fetch(
        "https://api.rangsmotors.com?file_name=cat_list&b_id=" + brandId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "true") {
        const transformedData = data.data.map(({ NAME }) => ({
          value: NAME,
          label: NAME,
        }));
        setCategoryList(transformedData);
      } else {
        console.error("API response status is not true:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSelectedModel(null); // Reset model when category changes
    setModelList([]); // Clear previous model list

    try {
      const response = await fetch(
        "https://api.rangsmotors.com?file_name=model_list&cat_name=" + category,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "true") {
        const transformedData = data.data.map(({ NAME }) => ({
          value: NAME,
          label: NAME,
        }));
        setModelList(transformedData); // Update modelList state with fetched models
      } else {
        console.error("API response status is not true:", data);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleModelChange = (model) => {
    setSelectedModel(model); // Handle selected model change here
  };

  const navigate = useNavigate();
  const handleSearchData = async (event) => {
    event.preventDefault();
    try {
      // Navigate to the desired route
      navigate("/searchable-product/" + selectedModel+ "/" + selectedBrand);
    } catch (error) {
      console.error("Error while navigating:", error);
      // Handle any navigation errors or fallback logic
    }
  };
  return (
    <div className="find-car">
      <div className="container">
        <div className="find-car-form">
          <Typewriter
            text="Hey! Let's Find Perfect Vehicle For You."
            delay={100}
            infinite
          />

          <form onSubmit={handleSearchData}>
            <div className="row justify-content-end">
              <div className="col-lg-3">
                <div className="form-group">
                  <p>Brand Name</p>
                  <Select2Dp
                    name="brand_id"
                    optionProps={BrandOptions}
                    onChange={handleBrandChange}
                    selectedValue={selectedBrand}

                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <p>Category</p>
                  <Select2Dp
                    name="category"
                    optionProps={categoryList}
                    onChange={handleCategoryChange}
                    selectedValue={selectedCategory}

                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <p>Model</p>
                  <Select2Dp
                    name="model"
                    optionProps={modelList}
                    onChange={handleModelChange}
                    selectedValue={selectedModel}

                  />
                </div>
              </div>

              <div className="col-lg-3 mt-3  align-self-end">
                <button className="theme-btn" type="submit">
                  <span className="far fa-search"></span> Find Your Vehicle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindCar;
