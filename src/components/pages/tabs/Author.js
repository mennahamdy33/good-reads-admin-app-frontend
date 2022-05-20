import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import { DeleteModal } from "../../modal/DeleteModal";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorModal from "../../modal/AuthorModal";

function Authors() {
  const [loadedAuthors, setLoadedAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("https://good-reads-server.herokuapp.com/admins/authors")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        // setLoadedbooks(data);
        setLoadedAuthors(data.authors);
      });
    setIsChanged(false);
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
      <div style={{overflow:"auto"}}>
        <AuthorModal
          author
          label="Add"
          change={setIsChanged}
          loadedAuthors={loadedAuthors}
        />

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
              const date = new Date(val.dateOfBirth);
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {" "}
                    <img
                      className="activator m-auto"
                      style={{ width: "200px", height: "200px" }}
                      src={val.image?val.image:"https://lovelace-media.imgix.net/uploads/477/f7387590-a361-0133-6e11-0e87cd6e10c7.gif?w=740&h=429&fit=max&auto=format"}
                      alt="without pic"
                    />{" "}
                  </td>
                  <td>{val.firstName}</td>

                  <td>{val.lastName}</td>

                  <td>
                    {`${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`}
                  </td>
                  <td>
                    <DeleteModal
                      val={val}
                      change={setIsChanged}
                      label="author"
                    />
                    <AuthorModal
                      author={val}
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
export default Authors;
