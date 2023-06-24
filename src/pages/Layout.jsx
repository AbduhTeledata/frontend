import React from 'react';
// import NavbarComponent from '../components/NavbarComponent';
import Sidebar from '../components/Sidebar';
import { Container, Row, Col} from 'react-bootstrap';
import Navbar from '../components/Navbar'
// import NavbarComponent from '../components/NavbarComponent'


const Layout = ({ children }) => {
  return (
    <div>
    <Container fluid>
    <Navbar />
      <Row className='show-container'>  
        <Col>
          <div className="columns mt-6" style={{ minHeight: "100vh" }}>
            <div className="column is-2">
                <Sidebar />
            </div>
            <div className="column has-background-light mt-6">
                <main>{children}</main>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Layout;
