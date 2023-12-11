import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ModelList({ brand_id, category }) {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `https://api.rangsmotors.com?file_name=model_list&cat_name=${category}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "true") {
          setModelList(response.data.data);
        } else {
          console.error("API response status is not true:", response.data);
        }
      } catch (error) {
        console.error("Error fetching car model data:", error);
      }
    };

    fetchCarData();
  }, [category]);

  return (
    <div>
      {modelList.map((modelItem, index) => {
        return (
          <li key={index}>
            <Link
              className="dropdown-item"
              to={`/searchable-product/${modelItem.NAME}/${brand_id}`}
            >
              {modelItem.NAME}
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default ModelList;
