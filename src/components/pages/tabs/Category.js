import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryModal from "../../modal/CategoryModal";
function Category() {

  // const [loadedbooks, setLoadedbooks] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  // const [loadedAuthors, setLoadedAuthors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  // function getAuthors() {
  //   fetch("https://good-reads-server.herokuapp.com/admins/authors")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(async (data) => {
  //       setLoadedAuthors(data);
  //     });
  // }
  function getCategories() {
    fetch("https://good-reads-server.herokuapp.com/admins/categories")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setLoadedCategories(data);
      });
  }

  function DeleteHandler(val) {
    fetch(`https://good-reads-server.herokuapp.com/admins/categories/${val._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setIsChanged(true);

      });
  }

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
    getCategories();
    // getAuthors();
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
      <div>
        <div className="btnAddCategory">
        <CategoryModal category  label='Add' change={setIsChanged} loadedCategories={loadedCategories} />
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
                    <button
                      className="xBtn"
                      onClick={() => {
                        DeleteHandler(val);
                      }}
                    >
                      Delete
                    </button>
                    <CategoryModal category={val} label='Edit' change={setIsChanged} loadedCategories={loadedCategories} />
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
