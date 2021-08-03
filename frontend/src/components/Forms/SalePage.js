import React, { useState, useEffect, useRef } from "react";
import FormService from '../../services/form.service'
import UserService from '../../services/user.service'
import { Card, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap';
import { Grid, GridList } from "@material-ui/core";
import Footer from "../Homepage/Footer"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeOneVanzare } from '../../actions/deleteformvanzare'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSpring, animated } from 'react-spring/web.cjs';
import { confirmAlert } from 'react-confirm-alert';


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

const SalePage = props => {

    const initialFormState = {
        id: null,
        name: "",
        hp: null,
        year: null,
        kms: null,
        transmission: "",
        engine: "",
        urlImage1: "",
        urlImage2: "",
        urlImage3: "",
        userId: ""
    };

    const initialUserState = {
        id: null,
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        birthDate: "",
        address: "",
    };

    const dispatch = useDispatch();
    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [currentUser, setCurrentUser] = useState(initialUserState);


    const getForm = id => {
        console.log("Form id = " + id);
        FormService.getOneSale(id)
            .then(response => {
                setCurrentForm(response.data);

            })
            .catch(e => {
                console.log(e)
            });
    };

    const getUser = id => {
        console.log("User id = " + currentForm.userId);
        UserService.getOne(id)
            .then(response => {
                setCurrentUser(response.data);

            })
            .catch(e => {
                console.log(e)
            });
    };



    useEffect(() => {
        window.scrollTo(0, 0);
        getForm(props.match.params.id)

        console.log(currentUser)
    }, [props.match.params.id]
    );


    getUser(currentForm.userId)

    const removeForm = () => {
        dispatch(removeOneVanzare(currentForm.id))
            .then(() => {
                props.history.push('/requests/sales');
            })
            .catch(e => {
                console.log(e);
            })
    }

    const submit = () => {
        confirmAlert({
            title: 'Confirmați',
            message: 'Vreți să ștergeți aceast formular?',
            buttons: [
                {
                    label: 'Da',
                    onClick: () => removeForm()
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    return (
        <React.Fragment>
            <h3 className='text-center mb-5 mt-4'>Gestionare formular vânzare: {currentForm.id}</h3>
            <div className="detaliiFormularComanda mt-5">
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                >
                    <Card className="text-center mt-4">
                        <Card.Header>Formular vânzare</Card.Header>
                        <Card.Body>
                            <Card.Title>{currentForm.name}</Card.Title>
                            <Card.Text>
                                Km. parcurși: {currentForm.kms}
                            </Card.Text>
                            <Card.Text>
                                Motorizare: {currentForm.engine}
                            </Card.Text>
                            <Card.Text>
                                An de fabricație: {currentForm.year}
                            </Card.Text>
                            <Card.Text>
                                Transmisie: {currentForm.transmission}
                            </Card.Text>

                        </Card.Body>
                        <Card.Footer className="text-muted">Id comandă: {currentForm.id}</Card.Footer>
                    </Card>

                    <Card className="cerere" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Detalii client</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Nume utilizator: {currentUser.username}</ListGroupItem>
                            <ListGroupItem>Nume: {currentUser.lastName} {currentUser.firstName}</ListGroupItem>
                            <ListGroupItem>E-mail: {currentUser.email}</ListGroupItem>
                            <ListGroupItem>Nr. telefon: {currentUser.phoneNo}</ListGroupItem>
                            <ListGroupItem>Adresă: {currentUser.address}</ListGroupItem>

                        </ListGroup>
                        <Card.Body>
                        </Card.Body>
                    </Card>

                    {/* De aici */}
                    <div className="container mt-5">

                        {/* <h3 className='text-center mb-5 mt-4'><i className='fab fa-youtube red-text fa-3x'/>Fotografii</h3> */}
                        <h3 className='font-weight-bold mb-3 text-center'>
                            <i className="fas fa-images indigo-text"></i>{' '}
                                Galerie
                                </h3>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={currentForm.urlImage1}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{currentForm.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={currentForm.urlImage2}
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <h3>{currentForm.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={currentForm.urlImage3}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>{currentForm.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    {/* Pana aici */}

                    <div className="container mt-4">
                        <Link to={{ pathname: `/contact/cmd`, state: currentUser }}>
                            <button type="button" className="btn btn-success  btn-block mt-4">Contactare client</button>
                        </Link>
                        <button type="button" onClick={submit} className="btn btn-outline-danger btn-block mt-3 ">Ștergere</button>
                    </div>

                </Grid>
            </div>
            <Footer></Footer>
        </React.Fragment>

    )
}

export default SalePage;