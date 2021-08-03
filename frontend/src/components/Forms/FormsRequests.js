import React, { useState, useEffect, useRef } from "react";
import FormService from '../../services/form.service'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Grid, GridList } from "@material-ui/core";
import { Link } from 'react-router-dom'
import Footer from "../Homepage/Footer"

const FormsRequests = () => {

    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [currentUser, setCurrentUser] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1);

    const retrieveForms = () => {
        FormService.getAll().then(response => {
            setForms(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        retrieveForms();
    }, []);



    return (
        <React.Fragment>
            <h2 className='text-center mb-5 mt-4'>Comenzi plasate</h2>

            <div className="allCommands container mt-5 mb-5">


                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                >

                    {forms &&
                        forms.map((form, index) => (
                            <Card className="cerere" style={{ width: '18rem' }}>
                                <Card.Body>
                                
                                    <Card.Title>{form.name}</Card.Title>
                               
                                  

                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Preț maxim: {form.price}</ListGroupItem>
                                    <ListGroupItem>Km. maximi: {form.kms}</ListGroupItem>
                                    <ListGroupItem>Motorizare: {form.engine}</ListGroupItem>
                                    <ListGroupItem>An de fabricație minim: {form.year}</ListGroupItem>
                                    <ListGroupItem>Transmisie: {form.transmission}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={`/forms/${form.id}`} >
                                    <button type="button" class="btn btn-outline-info btn-block">Detalii</button>
                                    </Link>
                                    
                                </Card.Body>
                            </Card>
                        ))}
                </Grid>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default FormsRequests;