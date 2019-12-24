
import React from "react";
import { Menu } from 'antd';
import SimpleImageSlider from "react-simple-image-slider";
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    Container,
    Row,
    Col
} from "reactstrap";
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;

const handleClick = e => {
    console.log('click ', e);
};

function Narbar(props) {


    return (
        <>



            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                        <h3>Menu</h3>
                    </div>
                    <br />
                    <Row>
                        <Col md="3">
                            <CategoryList lstCategory={props.lstCategory}></CategoryList>
                        </Col>
                        <Col md="9">
                            <Row>
                                <Col md="9">
                                    <Banner></Banner>
                                </Col>
                                <Col md="3">

                                    <BannerSmaill></BannerSmaill>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <BannerSmaill></BannerSmaill>
                                </Col>
                                <Col md="4">
                                    <BannerSmaill></BannerSmaill>
                                </Col>
                                <Col md="4">
                                    <BannerSmaill></BannerSmaill>
                                </Col>

                            </Row>

                        </Col>

                    </Row>
                    <Row>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);
                        </Col>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);

                            </Col>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);

                        </Col>
                        <Col md="3">
                           
                                <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);
                           
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

//
function BannerSmaill() {
    const images = [
        { url: "https://salt.tikicdn.com/cache/w206/ts/banner/09/e8/1c/3020ca1f22943775bea5505d381d0243.png" },

    ];
    return (
        <>
            <Navbar className="bg-white" expand="lg">
                <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                    <SimpleImageSlider
                        width={300}
                        height={300}
                        images={images}
                    />
                </NavbarBrand>
            </Navbar>

        </>
    );
}
//banner
function Banner() {
    const images = [
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/ee/70/7c/07b406098b20ed338e56f727b26c5975.png" },
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/f2/c8/97/ec1883bd8ec9821f490876824e4c39c5.png" },
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/01/cd/db/b43d3958c85585dcc6d9c14585398d58.png" },

    ];
    return (
        <>
            <Navbar className="bg-white" expand="lg">
                <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                    <SimpleImageSlider
                        width={600}
                        height={300}
                        images={images}
                    />
                </NavbarBrand>
            </Navbar>

        </>
    );
}
//category List
function CategoryList(props) {
    return (
        <>
            <Navbar className="bg-primary" expand="lg">
                <Menu
                    onClick={handleClick}
                    style={{ width: 256 }}

                    className="font-weight-bold"
                >
                    <span>Danh mục</span>
                    {props.lstCategory.map(item => (
                        <SubMenu

                            title={
                                <Link to={{
                                    pathname: `/product-of-category/${item.name}/${item.id}`
                                }}> <b>{item.name}</b></Link >
                            } className="border mt-3"
                        >

                        </SubMenu>
                    ))}



                </Menu>

            </Navbar>

        </>
    )
}
export default Narbar;
