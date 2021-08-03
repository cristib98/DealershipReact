import React, { useState, useEffect, useRef } from "react";
import FormService from '../../services/form.service'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Grid, GridList } from "@material-ui/core";
import { Link } from 'react-router-dom'
import Footer from "../Homepage/Footer"

const SalesForms = () => {

    const [forms, setForms] = useState([]);

    const retrieveForms = () => {
        FormService.getAllSale().then(response => {
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
            <h2 className='text-center mb-5 mt-4'>Formulare vânzări</h2>

            <div className="allCommands container mt-5 mb-5">


                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                >
                    {forms &&
                        forms.map((form, index) => (
                            <Card className="vanzare" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={form.urlImage1} />
                                <Card.Body>
                                    <Card.Title>{form.name}</Card.Title>
                                    
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                <ListGroupItem>An: {form.year} </ListGroupItem>
                                    <ListGroupItem>Transmisie: {form.transmission} </ListGroupItem>
                                    <ListGroupItem>Cai putere: {form.hp}</ListGroupItem>
                                    <ListGroupItem>Motorizare: {form.engine}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                <Link to={`/requests/${form.id}`} >
                                <button type="button" class="btn btn-light btn-block">Detalii</button>
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

export default SalesForms;