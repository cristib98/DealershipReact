import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Card from './Cars/Item/MainCard'
import CarService from '../services/car.service'
import Button from '@material-ui/core/Button';
import { Grid, GridList } from "@material-ui/core";
import Services from './Homepage/services'
import Map from './Homepage/map'
import Footer from './Homepage/Footer'



const Home = (props) => {
  const [content, setContent] = useState("");
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visible, setVisible] = useState(3);
  const [button1Visible, setButton1Visible] = useState(true)

  let images = [
    'https://lh3.googleusercontent.com/proxy/6mgxs_KVzMQ52Bfc8LLq4Kt18D8aN1UWHgSzM8M8Qaw8XtuLzdP46QbUezPd5RcgP6sS9gMX1-EUHTTb8UR9Lt4rZv9cHc1HlTf09QHL2Md4G01HAz3NOB9aWDh6VU0',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI71OhJJcdTabPrXh1yX74ScMvul_L9yk0Jg&usqp=CAU'
  ];

  const loadMore = () => {
    var aux = visible;
    setVisible(aux + 1);

    if ((aux + 1) == 5) {
      setButton1Visible(false);
    }
  }

  const routeChange = () => {
    props.history.push("/inventory");
    window.location.reload();
  }


  const retrieveCars = () => {
    CarService.getAll().then(response => {
      setCars(response.data);
    })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );

    retrieveCars();


  }, []);

  return (
    <div>

      {/* IMPORTANT */}
      <div className="homePic">
        <img src="http://wallup.net/wp-content/uploads/2017/03/27/380380-digital_art-artwork-collage-vehicle-car.jpg" width="100%" height="100%"></img>

      </div>

      <div className="container mb-5">
        {/* <Header /> */}


        <h2 className='text-center mb-5'>Caută acum mașina perfectă pentru tine</h2>


        <Grid
          container
          spacing={5}
          direction="row"
          justify="center"
        // alignItems="flex-start"
        >

          {cars && cars.slice(0, visible).map((car, index) => (
            <Grid item >
              <Card data={car}></Card>
            </Grid>
          ))}




        </Grid>
        {button1Visible ? (
          <Button className="butonInv" onClick={loadMore} variant="outlined" color="dark">Încarcă mai multe</Button>
        ) : (<Button className="butonInv" onClick={routeChange} variant="outlined" color="dark">Vezi inventarul</Button>)}

        <Services />
        <Map></Map>

        





      </div>
      <Footer/>
    </div>


  );
};

export default Home;