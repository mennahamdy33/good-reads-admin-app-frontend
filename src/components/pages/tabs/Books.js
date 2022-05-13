import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import BookModal from '../../modal/BookModal'
function Books() {

  const [loadedbooks, setLoadedbooks] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
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
    fetch(`https://good-reads-server.herokuapp.com/admins/books/${val._id}`, {
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
    fetch("https://good-reads-server.herokuapp.com/admins/books")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        setLoadedbooks(data);
      });
    setIsChanged(false);
    getCategories();
    getAuthors();
  }, [isChanged]);

  if (isLoading) {
    return (
      <Home active="Books">
        <section>Loading...</section>
      </Home>
    );
  }

 

 
  return (
    <Home active="Books">
      <div>
        <BookModal book  label='Add' change={setIsChanged} loadedAuthors={loadedAuthors} loadedCategories={loadedCategories} />

        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>CategoryID</th>
              <th>AuthorID</th>
              <th>Actions</th>
            </tr>
            {loadedbooks.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.photo}</td>
                  <td>{val.name}</td>

                  <td>{val.category[0].name}</td>

                  <td>
                    {val.author[0].firstName} {val.author[0].lastName}
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
                    <BookModal book={val} label='Edit' change={setIsChanged} loadedAuthors={loadedAuthors} loadedCategories={loadedCategories} />
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
export default Books;
