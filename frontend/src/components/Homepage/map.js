import React, { Component } from 'react';
import { notification} from 'antd';

const initState = {
  email: ''
};

class Map extends Component {
  state = { ...initState };

  //  Clear all state/fields values
  clearState = () => {
    this.setState({ ...initState });
  };
  //  Form validation
  validateForm = () => {
    const { email } = this.state;
    const isInvalid = !email;
    return isInvalid;
  };

  //  Get the typed values
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email } = this.state;
    const openNotification = () => {
     this.clearState();
      notification.open({
        message: 'Successfully Sent!',
        description: 'We will get back to you soon!',
        // icon: <Icon type='smile' theme='twoTone' />
      });
    };

    return (
      <div>
        <section className='contact-section dark-text'>
          <div className='card'>
            <div className='row'>
              <div className='col-lg-8'>
                <div className='card-body form m-5'>
                  <div
                    id='map-container-google-1'
                    className='z-depth-1 map-container mb-5'
                  >
                    <iframe
                      src='https://maps.google.com/maps?q=Ploiesti&t=&z=15&ie=UTF8&iwloc=&output=embed'
                      frameBorder={0}
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-4 mdb-color darken-2'>
                <div className='card-body contact text-center h-100 white-text'>
                  <h3 className='font-weight-bold my-4 pb-2 text-white'>
                    Informații de contact
                  </h3>
                  <ul className='text-lg-left list-unstyled ml-4'>
                    <li>
                      <p>
                        <i className='fas fa-map-marker-alt pr-2' />
                        Ploiești, str. Lipscani, nr. 17
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className='fas fa-phone pr-2' />
                        +40 736024191
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className='fas fa-envelope pr-2' />
                        crst.baban@gmail.com
                      </p>
                    </li>
                  </ul>
                  <hr className='hr-light my-4' />
                  <ul className='list-inline text-center list-unstyled'>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg tw-ic'>
                        <i className='fab fa-twitter' />
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg li-ic'>
                        <i className='fab fa-linkedin-in'> </i>
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg ins-ic'>
                        <i className='fab fa-instagram'> </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Map;
