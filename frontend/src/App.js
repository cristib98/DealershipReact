import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import Footer from './components/Homepage/Footer'



import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import './styles.scss'
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import AddCar from './components/Cars/AddCar';
import CarPage from './components/Cars/CarPage';
import ViewCars from './components/Cars/ViewCars';
import AddRequest from './components/Forms/AddRequest';
import FormPage from './components/Forms/FormPage';
import FormsRequests from './components/Forms/FormsRequests';
import EmailComanda from './components/Forms/EmailComanda';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import { addRequest } from "./actions/addform";
import SalesForms from "./components/Forms/SalesForms"
import SalePage from "./components/Forms/SalePage"
import AddSale from "./components/Forms/AddSale"
import Quiz from "./components/Quiz/Quiz"
import Taxes from "./components/Homepage/Taxes"
import Graphs from "./components/Cars/Graphs";


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMINISTRATOR"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary" >
            
          <Link to={"/"} className="navbar-brand">
          <i className="fas fa-car-side white-text"></i> CABAuto 
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Pagina principală
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/inventory"} className="nav-link">
                Inventar
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/forms/add/request/`} className="nav-link">
                Comandă
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/sales/add`} className="nav-link">
                Vinde
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/quiz`} className="nav-link">
                Mașina ideală
              </Link>
            </li>

            <li className="nav-item">
              <Link to={`/taxes`} className="nav-link">
                Calculator impozit
              </Link>
            </li>

           

            {showAdminBoard && (
              <div className="navbar-nav ml-auto">
   
                <li className="nav-item">
                  <Link to={"/add-car"} className="nav-link">
                    Adaugare masina
                </Link>
                </li>
                <li className="nav-item">
                <Link to={"/forms/requests"} className="nav-link">
                  Comenzi
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/requests/sales"} className="nav-link">
                  Formulare vânzări
                </Link>
              </li>
              <li className="nav-item">
              <Link to={`/info`} className="nav-link">
                Statistici
              </Link>
            </li>
              </div>

            )}

       
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`/profile/${currentUser.id}`} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Delogare
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Nu aveți un cont?
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/add-car" component={AddCar} />
            <Route path="/inventory/car/:id" component={CarPage} />
            <Route path="/inventory" component={ViewCars} />
            <Route path="/forms/add/request/" component={AddRequest} />
            <Route path="/forms/requests" component={FormsRequests} />
            <Route path="/forms/:id" component={FormPage}/>
            <Route path="/contact/cmd" component={EmailComanda}/>
            <Route path="/requests/sales" component={SalesForms}/>
            <Route path="/requests/:id" component={SalePage}/>
            <Route path="/sales/add" component={AddSale}/>
            <Route path="/quiz" component={Quiz}/>
            <Route path="/taxes" component={Taxes}/>
            <Route path="/info" component={Graphs}/>
            <Route path="*" component={Home}/>
          </Switch>

        </div>
        {/* <Footer/> */}
      </div>
    </Router>
  );
};
export default App;