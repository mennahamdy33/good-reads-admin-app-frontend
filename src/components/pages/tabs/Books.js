import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import Category from "./Category";
function Books() {
  const [loadedbooks, setLoadedbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] =useState(false);
function DeleteHandler(val){
  fetch(`http://localhost:5000/admins/books/${val._id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      // setIsDeleted(true);
      return response.json()})
    .then((json) => {console.log(json)
    // if(isDeleted){
      setIsDeleted(true)
  
    // }
    });
   
    

}

  useEffect(() => {
    fetch("http://localhost:5000/admins/books")
      .then((response) => {
        // console.log("outer then 1");
        return response.json();
      })
      .then(async (data) => {
        // console.log("outer then 2");
        setIsLoading(false);
        setLoadedbooks(data);
        console.log(data)
      
      
      })
      setIsDeleted(false)

  }, [isDeleted]);

  if (isLoading) {
    return (
      <Home active="Books">
        <section>Loading...</section>
      </Home>
    );
  }

  function BookInput({ onSubmit, label = "Add Book", inputValue }) {
    let [value, setValue] = useState(inputValue);

    return (
      <div className="ipField">
        <input
          className="ipTxt"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button
          className="ipBtn"
          onClick={() => {
            onSubmit(value);
            setValue("");
          }}
        >
          {label}
        </button>
      </div>
    );
  }


  return (
    <Home active="Books">
      <div>
        <BookInput
          onSubmit={(value) => {
            console.log(value);
            console.log("submitted");
          }}
        />

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
                  <td>{key+1}</td>
                  <td>{val.photo}</td>
                  <td>{val.name}</td>
                  
                  <td>{val.category[0].name}</td>

                  <td>{val.author[0].firstName} {val.author[0].lastName}</td>
                  <td>
                  <button className="xBtn" onClick={() => {DeleteHandler(val)}}>
         x
         </button>
         <button className="xBtn" onClick={() => console.log('edited')}>
          edit
        </button>            
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
