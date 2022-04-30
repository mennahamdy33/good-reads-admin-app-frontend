import React, { useState} from "react";
import MyNavbar from "../../layout/navbar/navbar";
import Books from "./Books";
import Category from "./Category";
function Author() {
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
   if(activePage===1){
        return <Books/>
    } else if(activePage===2){
      return <Author/>
    }else if(activePage===3){
        return <Category/>
      }
    return (
    <div>
      <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Author"/>
    <div>Author</div>
    </div>);
  }
  export default Author;