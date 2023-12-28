import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select2Dp from "../components/Select2Dp";
import Typewriter from "../components/Typewriter";
const BrandOptions = [
  { value: "1", label: "Eicher" },
  { value: "2", label: "Mahindra" },
  { value: "3", label: "Dongfeng" },
];

function FindCar() {
  const brandSelectRef = useRef(null);
  const categorySelectRef = useRef(null);
  const modelSelectRef = useRef(null);
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedReg, setSelectedReg] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [modelList, setModelList] = useState([]);

  const handleBrandChange = async (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory(null);
    setSelectedModel(null);
    setCategoryList([]);
    setModelList([]);
    try {
      const response = await axios.get(
        `https://api.rangsmotors.com?file_name=cat_list&b_id=${brandId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
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
      const response = await axios.get(
        `https://api.rangsmotors.com?file_name=model_list&cat_name=${category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
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
  const handleRegChange = (e) => {
    if ((e.target.value).length <= 4) {
      setSelectedReg(e.target.value); // Handle reg change here
    }
    
  };

  const handleSearchData = async (event) => {
    event.preventDefault();
    console.log(selectedReg, "selectedReg");
    // Check if selectedBrand, selectedCategory, and selectedModel are all selected
    // if (!selectedBrand || !selectedCategory || !selectedModel) {
    //   if (!selectedBrand) {
    //     brandSelectRef.current.focus(); // Focus on brandSelectRef
    //   }
    //   // else if (!selectedCategory) {
    //   //   categorySelectRef.current.focus(); // Focus on categorySelectRef
    //   // } else {
    //   //   modelSelectRef.current.focus(); // Focus on modelSelectRef
    //   // }

    // }

    if (!selectedBrand) {
      if (!selectedReg) {
        brandSelectRef.current.focus(); // Focus on brandSelectRef
        return;
      }
    }
    try {
      // Navigate to the desired route
      navigate(
        "/brand-wise-product/" +
          selectedBrand +
          "/" +
          selectedCategory +
          "/" +
          selectedModel +
          "/" +
          selectedReg
      );
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
                  <label>Brand Name</label>
                  <Select2Dp
                    ref={brandSelectRef}
                    name="brand_id"
                    optionProps={BrandOptions}
                    onChange={handleBrandChange}
                    selectedValue={selectedBrand}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label>Category</label>
                  <Select2Dp
                    ref={categorySelectRef}
                    name="category"
                    optionProps={categoryList}
                    onChange={handleCategoryChange}
                    selectedValue={selectedCategory}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label>Model</label>
                  <Select2Dp
                    ref={modelSelectRef}
                    name="model"
                    optionProps={modelList}
                    onChange={handleModelChange}
                    selectedValue={selectedModel}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label>Registration Number :</label>
                  <input
                    type="text"
                    onChange={handleRegChange}
                    name="registation"
                    className="form-control"
                    placeholder="Last four Digit..(EX:8392)"
                    value={selectedReg}
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
