import React from 'react';
import logo from "../logo.png";
import Button from 'react-bootstrap/Button'

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Kyoshi salon logo"
            /> {'  '}
            <strong>Salon Kyoshi</strong>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
        
                {/* <button class="btn btn-outline-success my-2 my-sm-0" href="/login">Login</button> */}
                <Button variant="btn btn-outline-success my-2 my-sm-0" href="/login">Login</Button>
              
            </div>
        </nav>
      </header>
      <main>
        <div className='container mt-4'>
          <div className='bg-light p-5 mt-4 rounded-3'>
            <p>
            <h2><strong>Selamat Datang di Web Kyoshi Salon</strong></h2>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
