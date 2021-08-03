import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Footer from './Homepage/Footer'
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div>
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div>
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div>
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div>
      </div>
    );
  }
};

const vfirstName = (value) => {
  if (value.length < 3) {
    return (
      <div>
      </div>
    );
  }
};

const vLastName = (value) => {
  if (value.length < 3) {
    return (
      <div>
      </div>
    );
  }
};



const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [address, setAddress] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [userError, setUserError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passError, setPassError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [nrError, setNrError] = useState("")
  const [dateError, setDateError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [success, setSucces] = useState("")

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

 function validate() {
    if(!username) {
     setUserError("Introdu username-ul!");
     return false;
    }

    if(!password) {
      setPassError("Introdu parola!");
      return false;
    }

    if(!email) {
      setEmailError("Introdu e-mail-ul!")
      return false;
    }

    if(!firstName) {
        setFirstNameError("Introdu prenumele!")
        return false;
    }
    
    if(!lastName) {
      setLastNameError("Introdu numele!")
      return false;
    }

    if(!phoneNo) {
      setNrError("Introdu numărul de telefon!")
      return false;
    }

    if(!birthDate) {
      setDateError("Introdu data nașterii!")
      return false;
    }

    if (!address) {
      setAddressError("Introdu adresa!")
      return false;
    }

    return true;

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onChangeUsername = (e) => {
    setUserError('')
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    setEmailError('')
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    setPassError('')
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    setFirstNameError('')
    const firstName = e.target.value
    setFirstName(firstName)
  };

  const onChangeLastName = (e) => {
    setLastNameError('')
    const lastName = e.target.value
    setLastName(lastName)
  };

  const onChangePhoneNo = (e) => {
    setNrError('')
    const phoneNo = e.target.value
    setPhoneNo(phoneNo)
  };

  const onChangeBirthDate = (e) => {
    setDateError('')
    const birthDate = e.target.value
    setBirthDate(birthDate)
  };

  const onChangeAddress = (e) => {
    setAddressError('')
    const address = e.target.value
    setAddress(address)
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    const isValid = validate()

    if (isValid) {
      dispatch(register(username, email, password, firstName, lastName, phoneNo, birthDate, address))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }

  };

  return (
    <React.Fragment>
      <div className="registerCnt col-md-15">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleRegister} ref={form}>


            {!successful && (
              <div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{userError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{emailError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Parolă</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{passError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">Prenume</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={onChangeFirstName}
                    validations={[required, vfirstName]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{firstNameError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nume</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={onChangeLastName}
                    validations={[required, vLastName]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{lastNameError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNo">Număr de telefon:</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={onChangePhoneNo}
                    validations={[required]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{nrError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Data nașterii:</label>
                  <Input
                    type="text"
                    placeholder="yyyy-mm-dd"
                    className="form-control"
                    name="birthDate"
                    value={birthDate}
                    onChange={onChangeBirthDate}
                    validations={[required]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{dateError}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Adresă:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={onChangeAddress}
                    validations={[required]}
                  />
                  <div style={{ fontSize: 16, color: 'red' }}>{addressError}</div>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Crează cont</button>
                 
                </div>
                <div style={{ fontSize: 16, color: 'red' }}>{success}</div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  Înregistrat cu succes!
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Register;