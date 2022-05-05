import React, { useState, useEffect} from "react";
import MyNavbar from "../../layout/navbar/navbar";
import Author from "./Author";
import Category from "./Category";
import "./Books.css";

function Books() {
    const [loadedbooks,setLoadedbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setActivePage]=useState(0);
    // -------------------------------------------------------------
    const [items, setItems] = useState([]);
    // -------------------------------------------------------------
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
    // ---------------------------------------------------------------------------------
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

    function BookList({items,onDelete,onEdit,header,onUpdate}) {
      const [inEdit, setInEdit] = useState(null);
      return (
        <>
          {header}
          <ul className="mylist">
            {/* {items.map((item) =>
              inEdit === item.id ? (
                <BookInput
                  inputValue={item.title}
                  label="Save"
                  onSubmit={(value) => {
                    onUpdate(item, value);
                    setInEdit(null);
                  }}
                />
              ) : ( */}
                <BookItem
                  // key={item.id}
                  // value={item}
                  onDelete={() => {
                    // onDelete(item);
                    console.log("on delete fn");
                  }}
                  onEdit={() => {
                    // onDelete(item);
                    console.log("on edit fn");
                  }}
                  // onDoubleClick={(value) => setInEdit(value)}
                >
                  {(title) => <span>{title}</span>}
                </BookItem>
              )
             {/* )
          } */}
          </ul>
        </>
      );
    }
    
    function BookItem({
      value,
      onDelete,
      onEdit
      // onDoubleClick,
    }) {
      return (
        // <div>
          <>
          {/* <li
            className="list-group-item"
            // onDoubleClick={() => onDoubleClick(value.id)}
          > */}
            {/* {value.title} */}
            <button className="xBtn" onClick={() => onDelete()}>
              x
            </button>
            <button className="xBtn" onClick={() => onEdit()}>
              edit
            </button>
          {/* </li> */}
          </>
        // </div>
      );
    } 
    
    // const handleUpdate = (item, value) =>{
    //   setItems(
    //     items.map((BookItem) =>
    //     BookItem.id === item.id
    //         ? { ...BookItem, title: value }
    //         : BookItem
    //     )
    //   );
    // }
    // ---------------------------------------------------------------------------------
    return (
    <div>
      <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Books"/>
      <BookInput
        onSubmit={(value) => {
          console.log(value);
          console.log("submitted");
          // setItems([
          //   ...items,
          //   { id: Math.random(), title: value},
          // ]);
        }}
      />
    {/* <div>Available Books: </div>
    <div>{loadedbooks[0].name}
      <BookList
        // header={<h2 className="title">Available Books:</h2>}
        // items={items}
        onDelete={(item) => {
          // setItems(items.filter((BookItem) => BookItem.id !== item.id));
          console.log(item);
          console.log("deleted");
        }}
        // onUpdate={handleUpdate}
        />
    </div> */}
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
              <td>{val._id}</td>
              <td>{val.photo}</td>
              <td>{val.name}</td>
              <td>{val.CategoryId}</td>
              <td>{val.AuthorId}</td>
              <td><BookList>
                onDelete={(item) => {
                  console.log(item);
                  console.log("deleted");
                    }}
                onEdit={(item) => {
                  console.log(item);
                  console.log("edited");
                    }}
                    </BookList></td>
            </tr>
           )
          })}
        
      </table>
    </div>
    </div>
    );
  }
  export default Books;