import {useRef} from 'react';
import classes from "./Login.module.css";
import Card from "./components/ui/Card";
function Login(props) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
 
    function submitHandler(event){
        event.preventDefault();
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        usernameInputRef.current.value ='';
        passwordInputRef.current.value= '';
        const userData = {
            username,
            password
        };
        props.onLogin(userData);
    }
  return (
      <div className={classes.main}>
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">User Name</label>
          <input type="text" required id="username" ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="text" required id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
        </Card>
        </div>
  );
}

export default Login;

