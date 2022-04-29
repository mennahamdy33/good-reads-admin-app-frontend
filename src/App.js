import { useState, useEffect } from "react";

import Login from "./Login";
import Home from "./components/tabs/Home";
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
    return <Home />;
  }
  return (
    <div>
      <Login onLogin={LoginHandler} />
    </div>
  );
}

export default App;
