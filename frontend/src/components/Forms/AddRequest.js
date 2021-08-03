import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "react-validation/build/input";
import { add } from '../../actions/addcar';
import { addRequest } from '../../actions/addform'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import FormService from "../../services/form.service"
import CarImg from '../../img/car.svg'
import Footer from '../Homepage/Footer'
import { Redirect } from 'react-router-dom';



const AddRequest = () => {

    const form = useRef();
    const checkBtn = useRef();
    const { user: currentUser } = useSelector((state) => state.auth);
    var userId = -1
    if (currentUser !== null) {
        userId = currentUser.id
    }


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("")
    const [kms, setKms] = useState("");
    const [engine, setEngine] = useState("Electric");
    const [transmission, setTransmission] = useState("Automată");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const [marcaError, setMarcaError] = useState('')
    const [pretError, setPretError] = useState('')
    const [anError, setAnError] = useState('')
    const [kmError, setKmError] = useState('')
    const [tokenProvided, setTokenProvided] = useState(false);
    const [mesaj, setMesaj] = useState('*Toate câmpurile sunt obligatorii')

    function validate() {
        if (!name) {
            setMarcaError("Marca este obligatorie!");
            return false;
        }

        if (!price) {
            setPretError("Prețul este obligatoriu!");
            return false;
        }

        if (price < 0) {
            setPretError("Pretul nu poate fi mai mic de 0!")
            return false;
        }

        if (!year) {
            setAnError("Anul este obligatoriu!");
            return false;
        }
        if (year < 1900) {
            setAnError("Anul nu este incorect!");
            return false;
        }

        if (!kms) {
            setKmError("Kilometrii sunt obligatorii!");
            return false;
        }
        if (kms < 0) {
            setKmError("Kilometrii nu pot fi mai mici de 0!");
            return false;
        }

        return true

    }



    const dispatch = useDispatch();

    const onChangeName = (e) => {
        setMarcaError('')
        const name = e.target.value;
        setName(name);
    };

    const onChangePrice = (e) => {
        setPretError('')
        const price = e.target.value;
        setPrice(price);
    };

    const onChangeYear = (e) => {
        setAnError('')
        const year = e.target.value;
        setYear(year);
        console.log(userId)
    };



    const onChangeKms = (e) => {
        setKmError('')
        const kms = e.target.value;
        setKms(kms);
    };

    const onChangeEngine = (e) => {
        const engine = e.target.value;
        setEngine(engine);
        console.log(engine)
    };


    const onChangeTransmission = (e) => {
        const transmission = e.target.value;
        setTransmission(transmission);
        console.log(transmission)
    };

    const handleAdd = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        const isValid = validate()

        if (isValid) {
            dispatch(addRequest(name,
                price,
                year,
                kms,
                transmission,
                engine,
                currentUser.id
            ))
                .then(() => {
                    setSuccessful(true);
                    setMesaj('')
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    if (userId === -1) {
        return <Redirect to="/login"></Redirect>
    }
    else {
        return (
            <React.Fragment>
                <div className='container my-5'>
                    <div className='cardAddCar'>
                        <h5 className='card-header blue-gradient white-text text-center py-4'>
                            <strong>COMANDĂ O MAȘINĂ</strong>
                        </h5>


                        <div className='card-body px-lg-5 pt-0'>
                            <em>{mesaj}</em>
                            <Form className="md-form" onSubmit={handleAdd} ref={form}>


                                {!successful && (
                                    <div>
                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='Marcă / Model'
                                            name='name'
                                            value={name}
                                            onChange={onChangeName}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {marcaError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Preț maxim'
                                            name='price'
                                            value={price}
                                            onChange={onChangePrice}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {pretError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='An de fabricație minim'
                                            name='year'
                                            value={year}
                                            onChange={onChangeYear}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {anError}</div>
                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Kilometrii maximi'
                                            name='kms'
                                            value={kms}
                                            onChange={onChangeKms}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {kmError}</div>


                                        <p>Motorizare:</p>
                                        <div className="row">
                                            <select
                                                className='mdb-select mb-4 initialized'
                                                id='select'
                                                name='engine'
                                                value={engine}
                                                onChange={onChangeEngine}
                                            >
                                                <option value disabled selected>
                                                    Motorizare
                                                </option>
                                                <option value='Electric'>Electric</option>
                                                <option value='Motorină'>Motorină</option>
                                                <option value='Benzină'>Benzină</option>
                                            </select>
                                        </div>


                                        <p>Transmisie:</p>
                                        <div className="row">
                                            <select
                                                className='mdb-select mb-4 initialized'
                                                id='select'
                                                name='transmission'
                                                value={transmission}
                                                onChange={onChangeTransmission}
                                            >
                                                <option value disabled selected>
                                                    Transmisise
                                                </option>
                                                <option value='Automată'>Automată</option>
                                                <option value='Manuală'>Manuală</option>
                                            </select>
                                        </div>



                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block mt-4">Plasează cererea</button>
                                        </div>
                                    </div>
                                )}

                                {message && (
                                    <div className="form-group">
                                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                            Comanda a fost plasată cu succes, urmeză să fiți contactat de un reprezentant!
                                        </div>
                                    </div>
                                )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />


                            </Form>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default AddRequest;