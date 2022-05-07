// import React, { useState} from "react";
// import MyNavbar from "../../layout/navbar/navbar"
// import Books from "./Books";
// import Author from "./Author";
import Home from './Home';
function Category() {
  //   const [activePage, setActivePage]=useState(0);
  //   function BookHandler(){
  //       setActivePage(1);
  //   }
  //   function AuthorHandler(){
  //       setActivePage(2);
  //   }
  //   function CategoryHandler(){
  //       setActivePage(3);
  //   }
  //  if(activePage===1){
  //       return <Books/>
  //   } else if(activePage===2){
  //     return <Author/>
  //   }else if(activePage===3){
  //       return <Category/>
  //     }
    return (
<Home active="Category" >
    <div>
      {/* <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Category"/> */}
    <div>Category</div>
    </div>
    </Home>
    );
  }
  export default Category;