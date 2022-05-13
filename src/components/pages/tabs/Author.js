import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorModal from '../../modal/AuthorModal'
function Authors() {

//   const [loadedbooks, setLoadedbooks] = useState([]);
//   const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedAuthors, setLoadedAuthors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  function getAuthors() {
    fetch("https://good-reads-server.herokuapp.com/admins/authors")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setLoadedAuthors(data);
      });
  }
//   function getCategories() {
//     fetch("https://good-reads-server.herokuapp.com/admins/categories")
//       .then((response) => {
//         return response.json();
//       })
//       .then(async (data) => {
//         setLoadedCategories(data);
//       });
//   }

  function DeleteHandler(val) {
    fetch(`https://good-reads-server.herokuapp.com/admins/authors/${val._id}`, {
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
    fetch("https://good-reads-server.herokuapp.com/admins/authors")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        // setLoadedbooks(data);
        setLoadedAuthors(data);
      });
    setIsChanged(false);
    // getCategories();
    getAuthors();
  }, [isChanged]);

  if (isLoading) {
    return (
      <Home active="Authors">
        <section>Loading...</section>
      </Home>
    );
  }

 

 
  return (
    <Home active="Authors">
      <div>
        <AuthorModal author  label='Add' change={setIsChanged} loadedAuthors={loadedAuthors}/>

        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Actions</th>
            </tr>
            {loadedAuthors.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.photo}</td>
                  <td>{val.firstName}</td>

                  <td>{val.lastName}</td>

                  <td>
                    {val.dateOfBirth}
                  </td>
                  <td>
                    <button
                      className="xBtn"
                      onClick={() => {
                        DeleteHandler(val);
                      }}
                    >
                      Delete
                    </button>
                    <AuthorModal author={val} label='Edit' change={setIsChanged} loadedAuthors={loadedAuthors}/>
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
export default Authors;
