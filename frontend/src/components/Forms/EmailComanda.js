import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { send } from 'emailjs-com';
import { init } from 'emailjs-com';
import Footer from "../Homepage/Footer"
import { ToastContainer, toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring/web.cjs';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

init("user_0TziJdgFkHlUlwl6Fwx7Y");

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




const EmailComanda = ({ history, match }) => {

    const { path } = match;
    const { id } = match.params;

    const classes = useStyles();
    const { state } = useLocation();
    const [toSend, setToSend] = useState({
        to_name: state.firstName,
        message: '',
        email: state.email,
        subject: ''
    });
    const onSubmit = (e) => {
        e.preventDefault();
        send(
            'service_28dxh0c',
            'template_ws9p592',
            toSend,
            'user_0TziJdgFkHlUlwl6Fwx7Y'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                console.log(toSend.email)
                toast.info("Mesajul a fost trimis cu succes!", {
                    autoClose: 5000,
                    pauseOnHover: false,
                    draggable: true
                });
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
            
        

    };

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
        
    };


    useEffect(() => {
        console.log(state);
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <ToastContainer />
           <h3 className='text-center mb-4 mt-4'><i class="fas blue-text fa-info-circle"></i>&nbsp;&nbsp;&nbsp;Trimite o actualizare clientului</h3>
            <div>
                <div className="container"> 
                    <form onSubmit={onSubmit}>
                        <div className="row pt-5 mx-auto">
                            <div className="col-8 form-group mx-auto">
                                <input type="email"
                                    className="inputEmail1 form-control"
                                    placeholder="E-mail"
                                    name="email"
                                    value={toSend.email}
                                    onChange={handleChange} />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <input type="text"
                                    className="inputEmail1 form-control"
                                    placeholder="Nume"
                                    name="to_name"
                                    value={toSend.to_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <input type="text"
                                    className="inputEmail1 form-control"
                                    placeholder="Subiect"
                                    name="subject"
                                    value={toSend.subject}
                                    onChange={handleChange} />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <textarea
                                    className="inputEmail1 form-control"
                                    id=""
                                    cols="30"
                                    rows="8"
                                    placeholder="Mesaj"
                                    name="message"
                                    value={toSend.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="col-8 pt-3 mx-auto">
                                <input type="submit" className="btn btn-info btn-block mb-5" value="Trimitere"></input>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </React.Fragment>
    )
}

export default EmailComanda;