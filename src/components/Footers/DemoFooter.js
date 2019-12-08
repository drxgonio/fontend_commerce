
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
function DemoFooter() {
  return (
  
     
    <footer className="footer section section-dark section-nucleo-icons">
         <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title">Ecommerce</h2>
              <br />
              <p className="description">
                Xin chào các bạn. Chào mừng các bạn đến với Website Ecommerce số 1 Việt Nam
              </p>
              <br />
              <Button
                className="btn-round"
                color="danger"
                href="#"
              >
                Xem chi tiết
              </Button>
              <Button
                className="btn-round ml-1"
                color="danger"
                href="https://facebook.com/triphannn"
                outline
              >
                Liên hệ Admin
              </Button>
            </Col>
            <Col lg="6" md="12">
              <div className="icons-container">
                <i className="nc-icon nc-time-alarm" />
                <i className="nc-icon nc-atom" />
                <i className="nc-icon nc-camera-compact" />
                <i className="nc-icon nc-watch-time" />
                <i className="nc-icon nc-key-25" />
                <i className="nc-icon nc-diamond" />
                <i className="nc-icon nc-user-run" />
                <i className="nc-icon nc-layout-11" />
                <i className="nc-icon nc-badge" />
                <i className="nc-icon nc-bulb-63" />
                <i className="nc-icon nc-favourite-28" />
                <i className="nc-icon nc-planet" />
                <i className="nc-icon nc-tie-bow" />
                <i className="nc-icon nc-zoom-split" />
                <i className="nc-icon nc-cloud-download-93" />
              </div>
              <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Phan Van Tri
            </span>
          </div>
            </Col>
          </Row>
        </Container>

    </footer>
  );
}

export default DemoFooter;
