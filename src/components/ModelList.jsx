import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ModelList({ brand_id, category }) {
  const [modelList, setModelList] = useState([]);
  useEffect(() => {
    const fetchModelData = async () => {
      try {
        // Simulate a 2-second delay before making the API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.get(
          `https://api.garimela.com/?file_name=model_list&cat_name=${category}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.status === "true") {
          setModelList(data.data);
        } else {
          console.error("API response status is not true:", data);
        }
      } catch (error) {
        console.error("Error fetching car model data:", error);
      }
    };

    fetchModelData();
  }, [category]);

  return (
     <>
      {modelList.map((modelList, index) => {
        return (
          <li key={index}>
            <Link
              className="dropdown-item"
              to={`/searchable-product/${modelList.NAME}/${brand_id}/${category}`}
            >
              {modelList.NAME}
            </Link>
          </li>
        );
      })}
     </>
  );
};
