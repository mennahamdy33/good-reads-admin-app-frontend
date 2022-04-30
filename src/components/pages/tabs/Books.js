import React, { useState, useEffect} from "react";
import MyNavbar from "../../layout/navbar/navbar";
import Author from "./Author";
import Category from "./Category";

function Books() {
    const [loadedbooks,setLoadedbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setActivePage]=useState(0);
    function BookHandler(){
        setActivePage(1);
    }
    function AuthorHandler(){
        setActivePage(2);
    }
    function CategoryHandler(){
        setActivePage(3);
    }
  
    useEffect(()=>{fetch(
        "https://good-reads-server.herokuapp.com/admin/books"
      ).then(response => {
          return response.json();
      }).then(data =>{
          setIsLoading(false);
            // setMeetups(Object.values(data));
            setLoadedbooks(data);
            console.log(data);
      })},[]);
      
      if(isLoading){
        return <section>Loading...</section>
    }
    if(activePage===1){
        return <Books/>
    } else if(activePage===2){
      return <Author/>
    }else if(activePage===3){
        return <Category/>
      }
    
    return (
    <div>
      <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Books"/>
    <div>Books</div>
    <div>{loadedbooks[0].name}</div>
    </div>);
  }
  export default Books;