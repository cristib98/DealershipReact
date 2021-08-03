import React from 'react';

const Header = () => {
  return (
    <header className='masthead'>
      <div className='container h-100'>
        <div className='row h-100 align-items-center'>
          <div className='col-12 text-center'>
            <h1 className='font-weight-light bg-text py-5 animated bounce'>
              CABAuto
            </h1>
            <p className='lead bg-text py-3 animated bounce'>
              Locul potrivit pentru a-ți găsi mașina perfectă!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
