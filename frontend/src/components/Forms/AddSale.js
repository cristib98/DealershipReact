import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "react-validation/build/input";
import { add } from '../../actions/addcar';
import { addSale } from '../../actions/addsale'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import FormService from "../../services/form.service"
import CarImg from '../../img/car.svg'
import Footer from '../Homepage/Footer'
import { Redirect } from 'react-router-dom';
import { jssPreset } from "@material-ui/styles";



const AddSale = () => {

    const form = useRef();
    const checkBtn = useRef();
    const { user: currentUser } = useSelector((state) => state.auth);
    var userId = -1
    if (currentUser !== null) {
        userId = currentUser.id
    }


    const [name, setName] = useState("");
    const [hp, setHp] = useState("");
    const [year, setYear] = useState("")
    const [kms, setKms] = useState("");
    const [engine, setEngine] = useState("Electric");
    const [transmission, setTransmission] = useState("Automată");
    const [urlImage1, setUrlImage1] = useState("")
    const [urlImage2, setUrlImage2] = useState("")
    const [urlImage3, setUrlImage3] = useState("")
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const [tokenProvided, setTokenProvided] = useState(false);
    const [marcaError, setMarcaError] = useState('')
    const [caiError, setCaiError] = useState('')
    const [anError, setAnError] = useState('')
    const [kmError, setKmError] = useState('')
    const [url1Error, setUrl1Error] = useState('')
    const [url2Error, setUrl2Error] = useState('')
    const [url3Error, setUrl3Error] = useState('')
    const [mesaj, setMesaj] = useState('*Toate câmpurile sunt obligatorii')



    function validate() {
        if (!name) {
            setMarcaError("Marca este obligatorie!");
            return false;
        }

        if (!hp) {
            setCaiError("Caii sunt obligatorii!");
            return false;
        }

        if (hp < 0) {
            setCaiError("Caii nu pot fi mai mici de 0!");
            return false;
        }

        if (!year) {
            setAnError("Anul este obligatoriu!");
            return false;
        }

        if (year < 1900) {
            setAnError("Anul introdus este incorect!");
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

        if (!urlImage1) {
            setUrl1Error("Introducerea pozelor este obligatorie!");
            return false;
        }

        if (!urlImage2) {
            setUrl2Error("Introducerea pozelor este obligatorie!");
            return false;
        }

        if (!urlImage3) {
            setUrl3Error("Introducerea pozelor este obligatorie!");
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

    const onChangeHp = (e) => {
        setCaiError('')
        const hp = e.target.value;
        setHp(hp);
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

    const onChangeUrlImage1 = (e) => {
        setUrl1Error('')
        const url = e.target.value;
        setUrlImage1(url);
    };

    const onChangeUrlImage2 = (e) => {
        setUrl2Error('')
        const url = e.target.value;
        setUrlImage2(url);
    };

    const onChangeUrlImage3 = (e) => {
        setUrl3Error('')
        const url = e.target.value;
        setUrlImage3(url);
    };

    const handleAdd = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();
        const isValid = validate()

        if (isValid) {
            dispatch(addSale(name,
                hp,
                year,
                kms,
                transmission,
                engine,
                urlImage1,
                urlImage2,
                urlImage3,
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
                            <strong>VINDE-ȚI MAȘINĂ</strong>
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
                                            placeholder='Cai putere'
                                            name='hp'
                                            value={hp}
                                            onChange={onChangeHp}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {caiError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='An de fabricație'
                                            name='year'
                                            value={year}
                                            onChange={onChangeYear}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {anError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Kilometrii '
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

                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='Url poză 1'
                                            name='urlImage1'
                                            value={urlImage1}
                                            onChange={onChangeUrlImage1}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {url1Error}</div>

                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='Url poză 2'
                                            name='urlImage2'
                                            value={urlImage2}
                                            onChange={onChangeUrlImage2}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {url2Error}</div>

                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='Url poză 3'
                                            name='urlImage3'
                                            value={urlImage3}
                                            onChange={onChangeUrlImage3}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>  {url3Error}</div>



                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block mt-4">Plasează oferta</button>
                                        </div>
                                    </div>
                                )}

                                {message && (
                                    <div className="form-group">
                                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                            Oferta a fost plasată cu succes, urmeză să fiți contactat de un reprezentant!
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

export default AddSale;