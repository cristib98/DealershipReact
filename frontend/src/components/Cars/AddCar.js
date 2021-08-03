import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "react-validation/build/input";
import { add } from '../../actions/addcar';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import CarService from "../../services/car.service"
// import Image from 'react-bootstrap/Image';
import CarImg from '../../img/car.svg'
import './car.css'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Footer from '../Homepage/Footer'

const AddCar = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("")
    const [category, setCategory] = useState("Sedan");
    const [kms, setKms] = useState("");
    const [engine, setEngine] = useState("Electric");
    const [cc, setCc] = useState("");
    const [hp, setHp] = useState("");
    const [transmission, setTransmission] = useState("Automată");
    const [urlImage1, setUrlImage1] = useState("");
    const [urlImage2, setUrlImage2] = useState("");
    const [urlImage3, setUrlImage3] = useState("");
    const [urlImage4, setUrlImage4] = useState("");
    const [urlImage5, setUrlImage5] = useState("");
    const [urlImage6, setUrlImage6] = useState("");
    const [urlImage7, setUrlImage7] = useState("");
    const [features, setFeatures] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [marcaError, setMarcaError] = useState("")
    const [pretError, setPretError] = useState("")
    const [anError, setAnError] = useState("")
    const [kmError, setKmError] = useState("")
    const [ccError, setCcError] = useState("")
    const [hpError, setHpError] = useState("")
    const [url1Error, setUrl1Error] = useState("")
    const [url2Error, setUrl2Error] = useState("")
    const [url3Error, setUrl3Error] = useState("")

    const { message } = useSelector(state => state.message);

    const [tokenProvided, setTokenProvided] = useState(false);

    function validate() {
        if(!name) {
         setMarcaError("Introdu numele modelului!");
         window.scrollTo(0, 0);
         return false;
        }
    
        if(!price) {
          setPretError("Introdu prețul!");
          window.scrollTo(0, 0);
          return false;
        }

        if(price < 0) {
            setPretError("Prețul nu poate fi mai mic de 0!");
            window.scrollTo(0, 0);
            return false;
          }
    
        if(!year) {
          setAnError("Introdu anul fabricației!")
          window.scrollTo(0, 0);
          return false;
        }

        if(year < 1900) {
            setAnError("Anul introdus este incorect!")
            window.scrollTo(0, 0);
            return false;
          }
    
        if(!kms) {
            setKmError("Introdu numărul de kilometrii!")
            window.scrollTo(0, 0);
            return false;
        }

        if(kms < 0) {
            setKmError("Kilometrii nu pot fi mai mici de 0!")
            window.scrollTo(0, 0);
            return false;
        }
        
        if(!cc) {
          setCcError("Introdu capcitatea cilindrică!")
          window.scrollTo(0, 0);
          return false;
        }

        if(cc < 0) {
            setCcError("Capacitatea cilindrică este incorectă!")
            window.scrollTo(0, 0);
            return false;
          }
    
        if(!hp) {
          setHpError("Introdu numărul de cai putere!")
          window.scrollTo(0, 0);
          return false;
        }

        if(hp < 0) {
            setHpError("Caii putere nu pot fi mai mici de 0!")
            window.scrollTo(0, 0);
            return false;
          }
    
        if(!urlImage1) {
          setUrl1Error("Introdu toate pozele obligatorii!")
          return false;
        }

        if(!urlImage2) {
            setUrl2Error("Introdu toate pozele obligatorii!")
            return false;
          }

          if(!urlImage3) {
            setUrl3Error("Introdu toate pozele obligatorii!")
            return false;
          }
    
       
    
        return true;
    
      }



    const dispatch = useDispatch();

    useEffect(() => {
        CarService.getAddPage().then(
            (response) => {
                setTokenProvided(true);
            },
            (error) => {
                setTokenProvided(false)
            }
        );
    }, []);

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };

    const onChangeYear = (e) => {
        const year = e.target.value;
        setYear(year);
    };

    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
        console.log(category)
    };

    const onChangeKms = (e) => {
        const kms = e.target.value;
        setKms(kms);
    };

    const onChangeEngine = (e) => {
        const engine = e.target.value;
        setEngine(engine);
        console.log(engine)
    };

    const onChangeCc = (e) => {
        const cc = e.target.value;
        setCc(cc);
    };

    const onChangeHp = (e) => {
        const hp = e.target.value;
        setHp(hp);
    };

    const onChangeTransmission = (e) => {
        const transmission = e.target.value;
        setTransmission(transmission);
        console.log(transmission)
    };


    const onChangeUrlImage1 = (e) => {
        const urlImage1 = e.target.value;
        setUrlImage1(urlImage1);
    };

    const onChangeUrlImage2 = (e) => {
        const urlImage2 = e.target.value;
        setUrlImage2(urlImage2);
    };

    const onChangeUrlImage3 = (e) => {
        const urlImage3 = e.target.value;
        setUrlImage3(urlImage3);
    };

    const onChangeUrlImage4 = (e) => {
        const urlImage4 = e.target.value;
        setUrlImage4(urlImage4);
    };

    const onChangeUrlImage5 = (e) => {
        const urlImage5 = e.target.value;
        setUrlImage3(urlImage5);
    };

    const onChangeUrlImage6 = (e) => {
        const urlImage6 = e.target.value;
        setUrlImage6(urlImage6);
    };

    const onChangeUrlImage7 = (e) => {
        const urlImage7 = e.target.value;
        setUrlImage7(urlImage7);
    };

    const onChangeFeatures = (e) => {
        const features = e.target.value;
        setFeatures(features);
    };

    const handleEditorChange = (e, editor) => {
        
        const newContent = editor.getData();
        setFeatures(newContent)
        console.log(features)
        
    };


    const handleAdd = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        const isValid = validate()

        if (isValid) {
            dispatch(add(name,
                price,
                year,
                category,
                kms,
                engine,
                cc,
                hp,
                transmission,
                urlImage1,
                urlImage2,
                urlImage3,
                urlImage4,
                urlImage5,
                urlImage6,
                urlImage7,
                features,))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    if (tokenProvided) {
        return (
            <React.Fragment>
                

                <div className='container my-5'>
                    <div className='cardAddCar'>
                        <h5 className='card-header blue-gradient white-text text-center py-4'>
                            <strong>ADAUGĂ O MAȘINĂ NOUĂ ÎN INVENTAR</strong>
                        </h5>
                        

                        <div className='card-body px-lg-5 pt-0'>
                        <em>*Toate câmpurile sunt obligatorii</em>
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
                                        <div style={{ fontSize: 16, color: 'red' }}>{marcaError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Preț'
                                            name='price'
                                            value={price}
                                            onChange={onChangePrice}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{pretError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='An de fabricație'
                                            name='year'
                                            value={year}
                                            onChange={onChangeYear}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{anError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Kilometrii'
                                            name='kms'
                                            value={kms}
                                            onChange={onChangeKms}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{kmError}</div>


                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Capacitate cilindrică'
                                            name='cc'
                                            value={cc}
                                            onChange={onChangeCc}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{ccError}</div>

                                        <input
                                            type='number'
                                            id='input'
                                            className='form-control'
                                            placeholder='Cai putere'
                                            name='hp'
                                            value={hp}
                                            onChange={onChangeHp}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{hpError}</div>
                                        <p>Categorie</p>
                                        <div className="row">
                                            <select
                                                className='mdb-select mb-4 initialized'
                                                id='select'
                                                name='category'
                                                value={category}
                                                onChange={onChangeCategory}
                                            >
                                                <option value disabled selected>
                                                    Categorie
                                        </option>
                                                <option value='Sedan'>Sedan</option>
                                                <option value='Coupe'>Coupe</option>
                                                <option value='SUV'>SUV</option>
                                                <option value='Hatchback'>Hatchback</option>
                                            </select>
                                        </div>

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
                                            placeholder='URL Imagine'
                                            name='urlImage1'
                                            value={urlImage1}
                                            onChange={onChangeUrlImage1}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{url1Error}</div>
                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='URL Imagine'
                                            name='urlImage2'
                                            value={urlImage2}
                                            onChange={onChangeUrlImage2}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{url2Error}</div>
                                        <input
                                            type='text'
                                            id='input'
                                            className='form-control'
                                            placeholder='URL Imagine'
                                            name='urlImage3'
                                            value={urlImage3}
                                            onChange={onChangeUrlImage3}
                                        />
                                        <div style={{ fontSize: 16, color: 'red' }}>{url3Error}</div>

                                        <p className="mt-5">Descriere:</p>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={features}
                                            onChange={handleEditorChange}
                                        />

                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block mt-4">Adaugă mașina</button>
                                        </div>
                                    </div>
                                )}

                                {message && (
                                    <div className="form-group">
                                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                            Anunțul a fost adăugat cu succes și poate fi vizualizat în inventar!
                                        </div>
                                    </div>
                                )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />


                            </Form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    } else {
        return (
            <div className="error">
                <img id="imagine" src={CarImg} fluid />
                <h1>Eroare 403</h1>
                <h2>Nu aveți acces!</h2>
            </div>


        )
    }
}

export default AddCar;