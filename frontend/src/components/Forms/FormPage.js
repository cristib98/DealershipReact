import React, { useState, useEffect, useRef } from "react";
import FormService from '../../services/form.service'
import UserService from '../../services/user.service'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Grid, GridList } from "@material-ui/core";
import Footer from "../Homepage/Footer"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeOneComanda } from '../../actions/deleteformcomanda'
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



const FormPage = props => {
    const initialFormState = {
        id: null,
        name: "",
        price: null,
        year: null,
        kms: null,
        engine: "",
        transmission: "",
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
        FormService.getOne(id)
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
        dispatch(removeOneComanda(currentForm.id))
            .then(() => {
                props.history.push('/forms/requests');
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
            <h3 className='text-center mb-5 mt-4'>Gestionare comandă nr. {currentForm.id}</h3>
            <div className="detaliiFormularComanda mt-5">
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                >
                    <Card className="text-center mt-4">
                        <Card.Header>Cerere comandă</Card.Header>
                        <Card.Body>
                            <Card.Title>{currentForm.name}</Card.Title>
                            <Card.Text>
                                Preț maxim: {currentForm.price}
                            </Card.Text>
                            <Card.Text>
                                Km. maximi: {currentForm.kms}
                            </Card.Text>
                            <Card.Text>
                                Motorizare: {currentForm.engine}
                            </Card.Text>
                            <Card.Text>
                                An de fabricație minim: {currentForm.year}
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

                    <div className="container mt-5">
                         <Link to={{ pathname: `/contact/cmd`, state: currentUser}}>
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
export default FormPage;