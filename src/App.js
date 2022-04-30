import { useState, useEffect } from "react";
import "@material-tailwind/react/tailwind.css";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/tabs/Home";
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
      });
  }
  if (isLoggedin) {
    return (
      <Home />
    )
    ;
  }
  return (
    <div>
      <Login onLogin={LoginHandler} />
    </div>
  );
}

export default App;
