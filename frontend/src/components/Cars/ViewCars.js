import React, { useState, useEffect } from 'react';
import CarService from '../../services/car.service'
import { Link } from 'react-router-dom'
import './car.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider';
// import Card from './Item/MainCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Icon from '@ant-design/icons'
import { Grid, GridList } from "@material-ui/core";
import Footer from '../Homepage/Footer' 
import Input from "react-validation/build/input";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valueText(value) {
    return `${value}+000`;
}

const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [currentCar, setCurrentCar] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchCar, setSearchCar] = useState("");
    const [engineFilter, setEngineFilter] = useState(false);
    const [engine, setEngine] = useState("");
    const [transmission, setTransmission] = useState("")
    const [openTransmission, setOpenTransmission] = useState(false)
    const [transmissionFilter, setTransmissionFilter] = useState(false)
    const [kms, setKms] = useState("")
    const [openKms, setOpenKms] = useState(false)
    const [kmsFilter, setKmsFilter] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState(false);
    const [category, setCategory] = useState("");
    const [openEngine, setOpenEngine] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [price, setPrice] = useState([0, 99999]);
    const classes = useStyles();



    useEffect(() => {
        window.scrollTo(0, 0);
        retrieveCars();
    }, []);





    const handlePriceChange = (ev, newPrice) => {
        setPrice(newPrice);
    }

    const handleChangeEngine = (event) => {
        setEngineFilter(true)
        setEngine(event.target.value);
    };

    const handleChangeKms = (event) => {
        setKmsFilter(true)
        setKms(event.target.value);
    };

    const handleChangeTransmission = (event) => {
        setTransmissionFilter(true)
        setTransmission(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategoryFilter(true)
        setCategory(event.target.value);
    };

    const handleCloseEngine = () => {
        setOpenEngine(false);
    };
    const handleCloseTransmission = () => {
        setOpenTransmission(false);
    };

    const handleOpenEngine = () => {
        setOpenEngine(true);
    };

    const handleCloseKms = () => {
        setOpenKms(false);
    };

    const handleOpenKms = () => {
        setOpenKms(true);
    }

    const handleOpenTransmission = () => {
        setOpenTransmission(true);
    }

    const handleCloseCategory = () => {
        setOpenCategory(false);
    };

    const handleOpenCategory = () => {
        setOpenCategory(true);
    };






    const retrieveCars = () => {
        CarService.getAll().then(response => {
            setCars(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    };

    

    // const setActiveCar = (car, index) => {
    //     setCurrentCar(car);
    //     setCurrentIndex(index);
    // };

    const findByName = (e) => {
        const search = e.target.value;
        setSearchCar(search)
        CarService.getByName(search)
            .then(response => {
                setCars(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleClearEngine = () => {
        setEngineFilter(false);
        setEngine("");
    };

    const handleClearKms = () => {
        setKmsFilter(false);
        setKms("");
    };

    const handleClearTransmission = () => {
        setTransmissionFilter(false);
        setTransmission("");
    };

    const handleClearCategory = () => {
        setCategoryFilter(false);
        setCategory("");
    };

  

    const deleteAllFilters = () => {
        setEngineFilter(false);
        setEngine("");
        setCategoryFilter(false);
        setCategory("");
        setPrice([0, 100000]);
        setKmsFilter(false);
        setKms("");
        setTransmissionFilter(false);
        setTransmission("");
    }

    return (
        <React.Fragment>
        <div className="filtre container">
        <input
                    type="text"
                    className="form-control"
                    placeholder="Căutare..."
                    value={searchCar}
                    onChange={findByName}
                />

                <h3 className="titluFiltre"> <i className="lupa fas fa-search indigo-text"></i>Filtrează rezultatele:</h3>
                <div className="filtreitem">
                    <p className="titluFiltru">Motorizare:<Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openEngine}
                        onClose={handleCloseEngine}
                        onOpen={handleOpenEngine}
                        value={engine}
                        onChange={handleChangeEngine}
                    >
                        <MenuItem value={"Motorină"}>Motorină</MenuItem>
                        <MenuItem value={"Benzină"}>Benzină</MenuItem>
                        <MenuItem value={"Electric"}>Electric</MenuItem>
                    </Select>
                    <i className="fas fa-cut blue-text" onClick={handleClearEngine}></i></p>
                    
                </div>


                <div className="filtreitem">
                    <p className="titluFiltru">Categorie:<Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openCategory}
                        onClose={handleCloseCategory}
                        onOpen={handleOpenCategory}
                        value={category}
                        onChange={handleChangeCategory}
                    >
                        <MenuItem value={"SUV"}>SUV</MenuItem>
                        <MenuItem value={"Coupe"}>Coupe</MenuItem>
                        <MenuItem value={"Sedan"}>Sedan</MenuItem>
                        <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
                    </Select>
                    <i className="fas fa-cut blue-text" onClick={handleClearCategory}></i> </p>
                    
                </div>
                

                {/* TO DO */}
                <div className="filtreitem">
                    <p className="titluFiltru">Km. Max.:<Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openKms}
                        onClose={handleCloseKms}
                        onOpen={handleOpenKms}
                        value={kms}
                        onChange={handleChangeKms}
                    >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"10000"}>10.000</MenuItem>
                        <MenuItem value={"50000"}>50.000</MenuItem>
                        <MenuItem value={"100000"}>100.000</MenuItem>
                        <MenuItem value={"150000"}>150.000</MenuItem>
                    </Select>
                    <i className="fas fa-cut blue-text" onClick={handleClearKms}></i> </p> 
                </div>


                 {/* TO DO */}
                 <div className="filtreitem">
                    <p className="titluFiltru">Transmisie:<Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openTransmission}
                        onClose={handleCloseTransmission}
                        onOpen={handleOpenTransmission}
                        value={transmission}
                        onChange={handleChangeTransmission}
                    >
                        <MenuItem value={"Manuală"}>Manuală</MenuItem>
                        <MenuItem value={"Automată"}>Automată</MenuItem>

                    </Select>
                    <i className="fas fa-cut blue-text" onClick={handleClearTransmission}></i> </p> 
                </div>




                <div className="filtreitem2">
                    <p className="titluFiltru"> Preț: </p>
                    <Slider
                        value={price}
                        onChange={handlePriceChange}
                        min={0}
                        max={100000}
                        step={1000}
                        valueLabelDisplay='auto'
                        aria-labelledby="range-slider"  
                    />
                    
                </div>
               
                <div>
                <Button className="butonFiltre mt-3" color="secondary" onClick={deleteAllFilters}>Șterge toate filtrele</Button>

                </div>
                
                
                </div>
        <div className="container mt-3">
            <div >
                

    

               
                
                <div>


                </div>






                {cars && cars.filter(car => (engineFilter ? car.engine === engine : car) && (kmsFilter ? car.kms <= kms : car) && (transmissionFilter ? car.transmission === transmission : car)  
                && (categoryFilter ? car.category === category : car) && ((car.price <= price[1]) && (car.price >= price[0]))).map((car, index) => (
                    
                    
                    <div className="invCard card mb-5" style={{ width: '68%' }}>
                        <div className="row">
                            <div className="col-md-4">
                            <Link to={`/inventory/car/${car.id}`}>
                            <img
                                    className="imgCard bd-placeholder-img"
                                    width="100%"
                                    height="100%"
                                    src={car.urlImage1}
                                    ></img>
                                    </Link>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="line">
                                    <Link to={`/inventory/car/${car.id}`}>
                                        <h3 className="card-title">{car.name}</h3>
                                        </Link>
                                        <h4 className="card-price mr-4">{car.price}€</h4>
                                    </div>
                                    
                                    <p className="detaliiCard">
                                    
                                    <i className="fas fa-check green-text"></i>
                                    &nbsp;{car.hp} cai putere&nbsp;
                                    <i className="fas fa-check green-text"></i>
                                    &nbsp;{car.cc}cm<sup>3</sup>&nbsp;
                                    &nbsp;<i className="fas fa-check green-text"></i>
                                    {car.category}&nbsp;
                                    &nbsp;<i className="fas fa-check green-text"></i>
                                    {car.engine}&nbsp;
                                    </p>
                                    <p className="card-text">
                                        <small className="textkms text-muted">Kilometrii: {car.kms}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                ))}







            </div >

        </div>

        

           <Footer></Footer>             
        </React.Fragment>
    )

}

export default ViewCars;