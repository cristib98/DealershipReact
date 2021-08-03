
import { useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Avatar from 'react-avatar';
import Card from '../Cars/Item/MainCard'
import { Grid, GridList } from "@material-ui/core";
import { Link } from 'react-router-dom'
import Footer from '../Homepage/Footer'
import { useSpring, animated } from 'react-spring/web.cjs';
import PropTypes from 'prop-types';
import { updateUser } from '../../actions/updateUser';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Service from '../../services/favorite_cars.service'


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

const Profile = props => {

  const initialUserState = {
    id: null,
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    birthDate: "",
    address: ""
  };


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { user: currentUser } = useSelector((state) => state.auth);
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(currentUser)
  const classes = useStyles();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    retrieveCars()
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const retrieveCars = () => {
    Service.getAll(currentUser.id).then(response => {
      setCars(response.data);
      console.log(response.data)
    })
      .catch(e => {
        console.log(e);
      });
  };



  const update = () => {
    console.log(currentUser)
    dispatch(updateUser(currentUser.id, currentUser))
      .then(response => {
        console.log(response);
        console.log("TEST")
        handleClose();
        handleOpen2();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrent({ ...current, [name]: value });
  };



  return (
    <React.Fragment>
      <div className='container my-5'>
        <div className='infoClass'>
          <div className='col-md-8 col-lg-12 mx-auto'>
            {/* Section: Block Content */}
            <section>
              {/* Card */}
              <div className='card testimonial-card'>
                {/* Background color */}
                <div className='card-up blue-gradient p-3'>
                  <h5 className='myProfil text-center py-3'>
                    <strong>Profilul meu - {' '}
                      {currentUser.username}</strong>
                  </h5>
                </div>
                {/* Avatar */}
                <div className='avatar mx-auto white mt-4'>
                  <Avatar color="rgb(86, 74, 255)" name={currentUser.username} size='90' round={true} />
                </div>
                {/* Content */}
                <div className='card-body px-3 py-4 mt-4'>
                  <div className='row'>
                    <div className='col-4 text-center border-right'>
                      <p className='font-weight-bold mb-0'>Nume:</p>
                      <p className='lead mb-0'>{currentUser.firstName.charAt(0).toUpperCase() + currentUser.firstName.slice(1)} {currentUser.lastName.charAt(0).toUpperCase() + currentUser.lastName.slice(1)}</p>
                    </div>
                    <div className='col-4 text-center'>
                      <p className='font-weight-bold mb-0'>E-mail:</p>
                      <p className='lead mb-0'>{currentUser.email}</p>
                    </div>
                    <div className='col-4 text-center border-left border-right'>
                      <p className='font-weight-bold mb-0'>Număr telefon:</p>
                      <p className='lead mb-0'>{currentUser.phoneNo}</p>
                    </div>

                  </div>
                  <div className='card-body px-0 py-4 mt-5'>
                    <div className="row">
                      <div className='col-4 text-center border-right'>
                        <p className='font-weight-bold mb-0'>Dată naștere:</p>
                        <p className='lead mb-0'>{currentUser.birthDate}</p>
                      </div>
                      <div className='col-4 text-center border-right'>
                        <p className='font-weight-bold mb-0'>Adresă:</p>
                        <p className='lead mb-0'>{currentUser.address}</p>
                      </div>

                      <div className='col-4 text-center border-right'>
                        <p className='font-weight-bold mb-0'>Nume utilizator:</p>
                        <p className='lead mb-0'>{currentUser.username}</p>
                      </div>

                    </div>

                  </div>

                  <div className='card-body px-0 py-3 mt-3'>

                    <button type="button" onClick={handleOpen} class="btn btn btn-outline-primary btn-block">Editare profil</button>


                  </div>

                </div>
              </div>
              {/* Card */}
            </section>
            {/* Section: Block Content */}
          </div>
        </div>

        <div className='container-fluid mt-5'>
          <h3 className='containerFav text-center text-white text-uppercase blue-gradient p-3 mb-5'>
            FAVORITE
          </h3>

          {cars.length >= 1 ? 
          <div className='row'>
            <Grid
              container
              spacing={5}
              direction="row"
              justify="center"
            // alignItems="flex-start"
            >

              {cars && cars.slice(0, 5).map((car, index) => (
                <Grid item >
                  <Card data={car}></Card>
                </Grid>
              ))}




            </Grid>
          </div>
            :
           <div className="noFavs">
            <h3 className='containerFav'>
              Nu aveți anunțuri salvate!
            </h3>
            <h4 className="noFavs">
              Puteți adăuga oricând din&nbsp;
              <Link className="linkInventar" to={`/inventory/`} >
                inventar
              </Link>
              !
            </h4>

          </div> 
        }

          {/* {!favorites.length && (
        <strong className='text-center'>
          You have no favorites currently. Go add some!
        </strong>
      )} */}
        </div>
      </div>

      <Footer />



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
              {/* TO DO */}
              <h2 id="spring-modal-title">Modificați datele contului</h2>
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Nume utilizator</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={current.username}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="username">Parolă</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value="********"
                    onChange={handleInputChange}
                  />

                  <label htmlFor="username">E-mail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="e-mail"
                    value={current.email}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="username">Număr de telefon</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneno"
                    value={current.phoneNo}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="username">Data nașterii</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="birthdate"
                    value={current.birthDate}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="username">Adresă</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={current.address}
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

    </React.Fragment>

  );
};


export default Profile;