import React, { useState, useRef, useEffect } from "react";
import CarService from '../../services/car.service'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar } from '../../actions/deletecar'
import { updateCar } from '../../actions/updatecar';
import Button from '@material-ui/core/Button'
import { Carousel } from '3d-react-carousal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Footer from '../Homepage/Footer'
import Converter from './converter.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFav } from "../../actions/addfav";
import ReactTooltip from "react-tooltip";
import DateTimePicker from 'react-datetime-picker'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "rgb(103,103,103)"
    },
    paper: {
        backgroundColor: "#fff",
        borderRadius: 25,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};


const CarPage = props => {
    const initialCarState = {
        id: null,
        name: "",
        price: null,
        year: null,
        category: "",
        kms: null,
        engine: "",
        cc: null,
        hp: null,
        transmission: "",
        urlImage1: "",
        urlImage2: "",
        urlImage3: "",
        urlImage4: "",
        urlImage5: "",
        urlImage6: "",
        urlImage7: "",
        features: ""
    };


    const classes = useStyles();
    const dispatch = useDispatch();
    const youtubeURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBwXTDzQMHImtuJ8miHN0DWtcOAYJyDP6M'
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentCar, setCurrentCar] = useState(initialCarState);
    const [tokenProvided, setTokenProvided] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false)
    const [searchfor, setSearchfor] = useState('')
    const [reviewVisible, setReviewVisible] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [taxaFinala, setTaxaFinala] = useState("0")
    const [valueDate, onChangeValueDate] = useState(new Date())

    var search = require('youtube-search');

    var opts = {
        maxResults: 10,
        key: 'AIzaSyBO2KXCHE2ueuLQF4ghhtai8tVIeVGKPxk'
    };



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
        toast.info("Programarea a fost realizată cu succes!", {
            autoClose: 3000,
            pauseOnHover: true,
            draggable: false
        });
    };

    // const [currentImg, setCurrentImg] = useState(currentCar.urlImage1)
    // const [isImg1, setIsImg1] = useState(true);
    // const [isImg2, setIsImg2] = useState(false);
    // const [isImg3, setIsImg3] = useState(false);

    const update = () => {
        dispatch(updateCar(currentCar.id, currentCar))
            .then(response => {
                console.log(response);
                handleClose();
                handleOpen2();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const submit = () => {
        confirmAlert({
            title: 'Confirmați',
            message: 'Vreți să ștergeți această mașină?',
            buttons: [
                {
                    label: 'Da',
                    onClick: () => removeCar()
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const getCar = id => {
        console.log(id);
        CarService.getOne(id)
            .then(response => {
                // setCurrentImg(currentCar.urlImage1)
                setCurrentCar(response.data);
                calculate(response.data.cc)

            })
            .catch(e => {
                console.log(e)
            });



    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getCar(props.match.params.id);
        CarService.getAddPage().then(
            (response) => {
                setTokenProvided(false);
            },
            (error) => {
                setTokenProvided(true)
            }
        );



    }, [props.match.params.id]);

    const showReview = () => {
        setReviewVisible(true)
        search(`${currentCar.name} ${currentCar.year} review`, opts, function (err, results) {
            console.log(`----------------------------- ${currentCar.name} ${currentCar.year} review --------------------------------`)
            let link = results[0].link
            let link1 = link.slice(32, )
            setSearchfor(`https://www.youtube.com/embed/${link1}`)
            console.dir(results)
        });
    }








    // const changeImg = () => {
    //     if (isImg1) {
    //         setIsImg1(false);
    //         setIsImg2(true);
    //         setCurrentImg(currentCar.urlImage2);
    //     } 

    //     if (isImg2) {
    //         setIsImg2(false);
    //         setIsImg3(true);
    //         setCurrentImg(currentCar.urlImage3);
    //     } 
    //     if (isImg3) {
    //         setIsImg3(false);
    //         setIsImg1(true);
    //         setCurrentImg(currentCar.urlImage1);
    //     } 
    // }

    let slides;

    if (currentCar.urlImage3) {
        if (currentCar.urlImage2) {
            slides = [
                <img src={currentCar.urlImage1} alt="1" width="auto" height="500px" />,
                <img src={currentCar.urlImage2} alt="2" width="auto" height="500px" />,
                <img src={currentCar.urlImage3} alt="3" width="auto" height="500px" />]
            console.log("Nr slideuri: " + slides.length)
        }
        else {
            slides = [
                <img src={currentCar.urlImage1} alt="1" width="auto" height="500px" />,
                <img src={currentCar.urlImage3} alt="3" width="auto" height="500px" />]
            console.log("Nr slideuri: " + slides.length)
        }
    }
    else {
        if (currentCar.urlImage2) {
            slides = [
                <img src={currentCar.urlImage1} alt="1" width="auto" height="500px" />,
                <img src={currentCar.urlImage2} alt="2" width="auto" height="500px" />]
            console.log("Nr slideuri: " + slides.length)
        }
        else {
            slides = [<img src={currentCar.urlImage1} alt="1" width="auto" height="500px" />]
            console.log("Nr slideuri: " + slides.length)
        }
    }

    const removeCar = () => {
        dispatch(deleteCar(currentCar.id))
            .then(() => {
                props.history.push('/inventory');
            })
            .catch(e => {
                console.log(e);
            })
    }


    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCar({ ...currentCar, [name]: value });
    };


    const notify = (e) => {
        e.preventDefault();

        setSuccessful(false);
        dispatch(addFav(currentCar.id,
            currentUser.id))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });


        toast.info("Anunțul a fost salvat!", {
            autoClose: 3000,
            pauseOnHover: false,
            draggable: true
        });

    }

    const calculate = (nr) => {
        if (nr === 0) setTaxaFinala(0)
        else if (nr <= 1000) setTaxaFinala(48)
        else if (nr <= 1200) setTaxaFinala(56)
        else if (nr <= 1600) setTaxaFinala(64)
        else if (nr <= 1800) setTaxaFinala(171)
        else if (nr <= 2000) setTaxaFinala(190)
        else if (nr <= 2200) setTaxaFinala(836)
        else if (nr <= 2400) setTaxaFinala(912)
        else if (nr <= 2600) setTaxaFinala(988)
        else if (nr <= 2800) setTaxaFinala(2142)
        else if (nr <= 3000) setTaxaFinala(2295)
        else if (nr <= 3200) setTaxaFinala(4928)
        else if (nr <= 3400) setTaxaFinala(5236)
        else if (nr <= 3600) setTaxaFinala(5544)
        else if (nr <= 3800) setTaxaFinala(5852)
        else setTaxaFinala(6160)
    }





    return (
        <React.Fragment>

            <div className='row d-flex flex-wrap justify-content-center'>
                <section>
                    <div className='row'>
                        <div className='col-lg-8 col-sm-12'>
                            <div className='view zoom z-depth-1 rounded mb-5 mt-3 ml-5'>
                                <img
                                    src={currentCar.urlImage1}
                                    className='img-fix '
                                    alt='sample image'>
                                </img>

                            </div>
                        </div>


                        <div className='col-lg-4'>
                        <ToastContainer />
                            <div className='pt-1 mb-5 mt-3 mr-5 z-depth-1'>
                                <h3 className='text-center mb-4 mt-3'>{currentCar.name} <i data-tip data-for="favTip" onClick={notify} className="steluta fas fa-star blue-text"></i></h3>
                                <ReactTooltip id="favTip" place="top" effect="solid">
                                    Salvați anunțul!
                                </ReactTooltip>
                                <hr />
                                <section className='text-center p-md-3 mx-md-5'>
                                    <div className='row'>
                                        <div className='col-12 mb-5'>
                                            <h4 className='font-weight-bold mb-3'>
                                                <i className='fas fa-tools indigo-text pr-2' />{' '}
                                                Specificații
                                            </h4>
                                            <p className='text'>
                                                An de fabricație: {currentCar.year}
                                            </p>
                                            <p className='text'>
                                                Caroserie: {currentCar.category}
                                            </p>
                                            <p className='text'>
                                                Kilometrii: {currentCar.kms}
                                            </p>
                                            <p className='text'>
                                                Transmisiei: {currentCar.transmission}
                                            </p>
                                            <p className='text'>
                                                Capacitate cilindrică: {currentCar.cc} cm<sup>3</sup>
                                            </p>
                                            <p className='text'>
                                                Combustibil: {currentCar.engine}
                                            </p>
                                        </div>
                                        <div className='col-12 mb-5'>
                                            <h4 className='font-weight-bold mb-3'>
                                                <i className='fas fa-euro-sign green-text pr-2' />{' '}
                                                Preț: {currentCar.price}€ <i data-tip data-for="impozitTip" className="infoImpozit fas fa-info-circle blue-text"></i>
                                            </h4>
                                            <ReactTooltip id="impozitTip" place="top" effect="solid">
                                                Impozitul anual este de: {taxaFinala} lei
                                            </ReactTooltip>
                                            <p className='text-muted'>
                                                TVA inclus
                                            </p>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 hidden={!tokenProvided} className='font-weight-bold mb-3'>
                                                <i className='fas fa-car indigo-text pr-2' />{' '}
                                                Test-drive: valabil
                                            </h4>
                                            <button type="button" onClick={handleOpen3} hidden={!tokenProvided} class="btn btn-info">Programează test-drive</button>
                                            <div className="butoaneAdmin container">
                                                <h4 hidden={tokenProvided} className="mt-3 float-center">Gestionează anunțul:</h4>
                                                <Button hidden={tokenProvided} onClick={handleOpen} className="float-center mt-3 mr-2" variant="contained" color="primary">Actualizează</Button>
                                                <Button hidden={tokenProvided} onClick={submit} className="float-center mt-3" variant="contained" color="secondary">Șterge</Button></div>
                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <hr className='mx-5' />

            <div className='container-fluid pt-3 mb-5 my-2 shadow-sm'>
                <section className='p-md-3 mx-md-5'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6 text-center black-text'>
                            <h2 className='font-weight pb-2s'>Galerie</h2>
                            <i className='fas fa-images blue-text fa-3x mb-5' />

                        </div>
                    </div>
                    <Carousel slides={slides} autoplay={true} interval={4000} />
                </section>
            </div>

            {/* <hr className='mx-5  pt-10 pb-10' /> */}
            <div className='container-fluid pt-3 mb-5 my-2 shadow-sm'>
                <section className='p-md-3 mx-md-5'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6 text-center black-text'>
                            <h2 className='font-weight pb-2s'>Descriere</h2>
                            <i className='fas fa-book-open green-text fa-3x mb-5' />
                            <p
                                className='text mb-2'

                            >{currentCar.features}</p>
                        </div>
                    </div>
                </section>
            </div>


            <div className='container-fluid pt-3 mb-5 my-2 shadow-sm'>
                <section className='p-md-3 mx-md-5'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6 text-center black-text'>
                            <h2 className='font-weight pb-2s'>Review</h2>
                            <i className='fab fa-youtube red-text fa-3x mb-5' />
                            {reviewVisible ?
                                <iframe width="100%" height="500" src={searchfor} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                :
                                <div className="glassButton" onClick={showReview}>Afișează Review</div>
                            }
                        </div>

                    </div>
                </section>
            </div>


            <div className="mb-5">
                <Converter amount={currentCar.price}></Converter>
            </div>











            {/* <Button hidden={tokenProvided} onClick={handleOpen} className="float-left" variant="contained" color="primary">Update</Button>
            <Button hidden={tokenProvided} onClick={submit} className="float-left" variant="contained" color="secondary">Delete</Button> */}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="modalCarUpdate">
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title">Modificați anunțul</h2>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Marcă / Model</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={currentCar.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Pret</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        value={currentCar.price}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Categorie</label>
                                    <Input
                                        className="form-control"
                                        name="category"
                                        value={currentCar.category}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kms">Kilometrii</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="kms"
                                        value={currentCar.kms}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="engine">Tip motor</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="engine"
                                        value={currentCar.engine}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cc">Capacitate cilindrica:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="cc"
                                        value={currentCar.cc}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="hp">Cai putere:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="hp"
                                        value={currentCar.hp}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Descriere:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        value={currentCar.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urlImage1">Url imagine1:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="urlImage1"
                                        value={currentCar.urlImage1}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urlImage3">Url imagine2:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="urlImage2"
                                        value={currentCar.urlImage2}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="urlImage1">Url imagine3:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="urlImage3"
                                        value={currentCar.urlImage3}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form>
                            <div className="form-group">
                                <button type="submit" onClick={update} className="btn btn-primary btn-block">Modifică</button>
                            </div>


                        </div>
                    </Fade>
                </div>
            </Modal>

            <Dialog
                fullScreen={fullScreen}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Modificarea a fost realizată cu succes!"}</DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose2} color="primary">
                        Înapoi
                    </Button>
                </DialogActions>
            </Dialog>


            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open3}
                onClose={handleClose3}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="modalCarUpdate">
                    <Fade in={open3}>
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title">Programați un test-drive</h2>
                            <div className="form-group">
                                <h3 className="mt-4">Selectați data dorită:</h3>
                                <DateTimePicker className="mt-4" onChange={onChangeValueDate} value={valueDate} />
                                <button type="submit" onClick={handleClose3} className="btn btn-primary btn-block mt-5">Programează</button>

                            </div>


                        </div>
                    </Fade>
                </div>
            </Modal>




            <Footer></Footer>
        </React.Fragment>


    )
}

export default CarPage;