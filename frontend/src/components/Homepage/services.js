import React from 'react'

const Services = () => {
  return (
    <div className='py-5'>
      <section className='p-md-3 mx-md-5 text-lg-left'>
        <h2 className='text-center mb-5'>Ce oferim?</h2>
        <div className='row text-center d-flex justify-content-center mt-5'>
          <div className='col-lg-3 col-md-6 mb-lg-0 mb-5'>
            <i className='fas fa-car fa-3x indigo-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Cele mai bune mașini de pe piață</h4>
            <p className='text-muted px-2 mb-lg-0'>
             
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-lg-0 mb-5'>
            <i className='fas fa-tools pink-text fa-3x mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Mașini verificate</h4>
            <p className='text-muted px-2 mb-lg-0'>
             
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-md-0 mb-5'>
            <i className='fas fa-dollar-sign fa-3x amber-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Doar prețuri accesibile</h4>
            <p className='text-muted px-2 mb-md-0'>
              
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-md-0 mb-5'>
            <i className='fas fa-street-view fa-3x green-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Clientul pe primul loc</h4>
            <p className='text-muted px-2 mb-md-0'>
          
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services
