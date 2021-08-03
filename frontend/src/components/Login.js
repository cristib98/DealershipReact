import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Footer from './Homepage/Footer'
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";



const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctUsername, setCorrectUsername] = useState(true)
  const [userError, setUserError] = useState("")
  const [passError, setPassError] = useState("")
  const [success, setSuccess] = useState("")

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  function validate() {


    if(!username) {
     setUserError("Introdu username-ul!");
     return false;
    }

    if(!password) {
      setPassError("Introdu parola!");
      return false;
    }
    

    return true

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const required = (value) => {
    if (!value) {
      setCorrectUsername(false)
    }
  };

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUserError('')
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    setPassError('')
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    const isValid = validate()

    if (isValid) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
          setSuccess("Username sau parolă greșită!")
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (

    <React.Fragment>
    <div className="loginCnt col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <h3 className="bunVenit">Bine ai revenit!</h3>

        <Form className="loginForm" onSubmit={handleLogin} ref={form}>

          <div className="input-group mb-3 mt-4 ml-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><i class="fa fa-user"></i></span>
            </div>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
            <div style={{ fontSize: 16, color: 'red' }}>  {userError}</div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div> */}

          <div className="input-group mb-3 ml-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><i class="fa fa-lock"></i></span>
            </div>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
            <div style={{ fontSize: 16, color: 'red' }}>  {passError}</div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="password">Parolă</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div> */}

          <div className="form-group">
            <button className="btn btn-primary btn-block mt-4" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Logare</span>
            </button>
            <div className="ml-4" style={{ fontSize: 16, color: 'red' }}>  {success}</div>
          </div>

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div><a href="#">Ți-ai uitat parola?</a></div>
        <div className="mt-2"><a  href="/register">Creează un cont nou</a></div>
      </div>
      
    </div>
    <Footer/>
    </React.Fragment>


  );
};

export default Login;