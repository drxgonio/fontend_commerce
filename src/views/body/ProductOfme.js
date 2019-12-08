
import React from "react";
import { Menu, Icon, Button } from 'antd';
import SimpleImageSlider from "react-simple-image-slider";
// reactstrap components
import {

    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";
import ProductItem from "./ProductItem";


function ProductOfme() {

    return (
        <>
            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                   <h3>Sản phẩm giành cho bạn <i className="nc-icon nc-diamond" /> </h3>
                    </div>
                    <br />
                    <Row>

                    </Row>
                    <Row>
                        <Col md="3">
                            <ProductItem></ProductItem>
                        </Col>
                        <Col md="3">
                            <ProductItem></ProductItem>
                        </Col>
                        <Col md="3">
                            <ProductItem></ProductItem>
                        </Col>
                        <Col md="3">
                            <ProductItem></ProductItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center pt-3">
                            <Button class="btn btn-default text-info">Xem thêm</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default ProductOfme;