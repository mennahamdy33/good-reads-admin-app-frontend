import { useState, useEffect } from "react";
import "@material-tailwind/react/tailwind.css";
import Login from "./components/pages/login/Login";
import Book from "./components/pages/tabs/Books";
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
    }

  }, []);

  function LoginHandler(userData) {
    fetch("https://good-reads-server.herokuapp.com/admin/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        setIsLoggedin(true);
      }).catch((error)=>{
        alert("wrong userName and password");
     
        
      });
  }
  if (isLoggedin) {
    return (
      <Book  />
    )
    ;
  }

  return (
    <div>
      <Login onLogin={LoginHandler}  />
    </div>
  );
}

export default App;
