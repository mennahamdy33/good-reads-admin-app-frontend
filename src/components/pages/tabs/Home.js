import React, { useEffect, useState} from "react";
import MyNavbar from "../../layout/navbar/navbar";
import Author from "./Author";
import Category from "./Category";
import Books from "./Books";
import "./Books.css";
import '../../Assets/css/mycssfile.css';
import "../../footer/footer";
import Footer from "../../footer/footer";

function Home(props) {
  const [activePage, setActivePage]=useState(0);
  // useEffect(()=>{
  //   setActivePage(3);
  // },[]);
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
    }
    else if(activePage===3){
      return <Category/>
    }

 
  return (
  <div className="homeDiv">
    <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active={props.active} />
    {props.children}
    {/* <body> */}
      {/* <img className="bg" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="Logo"/> */}
      {/* <img className="bg" src="https://cdn.wallpapersafari.com/94/46/76pNxP.jpg" alt="Logo"/> */}
    {/* </body> */}
    {/* return <Category/> */}
  </div>);
}
export default Home;
