import React, { useState, useEffect, useRef } from "react";
import "./Books.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import BookModal from '../../modal/BookModal'
import {DeleteModal} from '../../modal/DeleteModal';
import PaginationBasic from '../../layout/Pagination/Pagination'

function Books() {

  const [loadedbooks, setLoadedbooks] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedAuthors, setLoadedAuthors] = useState([]);
 const [activted, setActivated] = useState(1);

//  const [noOfPages, setNoOfPages] = useState(1);
  const noOfPages=useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  function getAuthors() {
    fetch("https://good-reads-server.herokuapp.com/admins/authors")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setLoadedAuthors(data.authors);
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

  
  useEffect(() => {
    fetch(`https://good-reads-server.herokuapp.com/admins/books?page=${activted}`)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        setIsLoading(false);
        setLoadedbooks(data.data);
        // setNoOfPages(data.pages)
        noOfPages.value = data.pages;
        console.log(data.pages)
      });
      
    setIsChanged(false);
    getCategories();
    getAuthors();
  }, [isChanged,activted]);

  if (isLoading) {
    return (
      <Home active="Books">
        <section>Loading...</section>
      </Home>
    );
  }

 

 
  return (
    <>
    <Home active="Books">
      <div style={{overflow:"auto"}}>
        <BookModal book  label='Add' change={setIsChanged} loadedAuthors={loadedAuthors} loadedCategories={loadedCategories} />

        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
            {loadedbooks.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td >     <img className="activator m-auto" style={{ width: '200px', height: '200px' }} src={val.image?val.image: "https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif"} alt='no pic' /> </td>
                  <td>{val.name}</td>

                  <td>{val.category[0] && val.category[0].name}</td>

                  <td>
                    {val.author[0] && val.author[0].firstName} {val.author[0] && val.author[0].lastName}
                  </td>
                  <td>
                    <DeleteModal val={val} change={setIsChanged} label="book"   />
                    <BookModal book={val} label='Edit' change={setIsChanged} loadedAuthors={loadedAuthors} loadedCategories={loadedCategories} />
                  </td>
                </tr>
              );
            })}
           
           
           <tr><td colspan="6"> <PaginationBasic activated={setActivated} pages={noOfPages} /> </td></ tr>
           
          </table>
        </div>
      </div>
    </Home>
  
    </>
  );
}
export default Books;
