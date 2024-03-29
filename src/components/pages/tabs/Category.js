import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryModal from "../../modal/CategoryModal";
import { DeleteModal } from "../../modal/DeleteModal";

function Category() {
  // const [loadedbooks, setLoadedbooks] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  // const [loadedAuthors, setLoadedAuthors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("https://good-reads-server.herokuapp.com/admins/categories")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        // setLoadedbooks(data);
        setLoadedCategories(data);
      });
    setIsChanged(false);
  }, [isChanged]);

  if (isLoading) {
    return (
      <Home active="Category">
        <section>Loading...</section>
      </Home>
    );
  }

  return (
    <Home active="Category">
      <div style={{overflow:"auto"}}>
        <div className="btnAddCategory">
          <CategoryModal
            category
            label="Add"
            change={setIsChanged}
            loadedCategories={loadedCategories}
          />
        </div>
        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            {loadedCategories.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.name}</td>
                  <td>
                    <DeleteModal
                      val={val}
                      change={setIsChanged}
                      label="category"
                    />
                    <CategoryModal
                      category={val}
                      label="Edit"
                      change={setIsChanged}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Home>
  );
}
export default Category;
