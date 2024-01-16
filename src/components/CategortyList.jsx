import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModelList from "./ModelList";

export default  function CategortyList({ brand_id }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const delayedFetch = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay by 1 second

        const response = await axios.get(
          `https://api.garimela.com/?file_name=cat_list&b_id=${brand_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.status === "true") {
          setCategoryList(data.data);
        } else {
          console.error("API response status is not true:", data);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    delayedFetch();
  }, [brand_id]);

  return (
    <>
      {categoryList.map((catItem, index) => {
        return (
          <li key={index} className="dropdown-submenu">
            <Link className="dropdown-item dropdown-toggle">
              {catItem.NAME}
            </Link>

            <ul className="dropdown-menu show">
              <ModelList brand_id={brand_id} category={catItem.NAME} />
            </ul>
          </li>
        );
      })}
    </>
  );
};
