
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
const well = {
    boxShadow: "1px 1px 1px 1px #9E9E9E",
    borderRadius: "15px",
    background: "#F8F8FF"
  }
const handleClick = e => {
    console.log('click ', e);
};

function Narbar(props) {


    return (
        <>



            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    {/* <div className="title">
                        <h3></h3>
                    </div> */}
                    <br />
                    <Row>
                        <Col md="3">
                            <CategoryList lstCategory={props.lstCategory}></CategoryList>
                            <br></br>
                        </Col>
                       
                        <Col md="9">
                            <Row>
                                <Col md="9">
                                    <Banner></Banner>
                                </Col>
                                <Col md="3" className="p-4">
                                    <Row>
                                    <img src="https://salt.tikicdn.com/cache/w206/ts/banner/51/e5/5c/73b5f409fd76e185a740025aebf9ccb8.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" 
                                className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: '100%',height: 165 }} />
                                
                                    </Row>
                                    <Row className="pt-2">
                                    <img src="https://salt.tikicdn.com/cache/w206/ts/banner/1d/3c/2a/2fd1516c0af893fa73f1927f1ffd1116.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" 
                                className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: '100%',height: 165 }} />
                                
                                    </Row>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4" >
                                <img src="https://salt.tikicdn.com/cache/w206/ts/banner/51/e5/5c/73b5f409fd76e185a740025aebf9ccb8.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" 
                                className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: '100%',height: 200 }} />
                          
                                </Col>
                                <Col md="4" >
                                <img src="https://salt.tikicdn.com/cache/w206/ts/banner/c9/d9/6a/2878b33ac6ee8984b43fedf7b66ab937.png" 
                                alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: '100%',height: 200 }} />);
                                </Col>
                                <Col md="4" >
                                <img src="https://salt.tikicdn.com/cache/w206/ts/banner/1d/3c/2a/2fd1516c0af893fa73f1927f1ffd1116.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: '100%',height: 200 }} />);
                                </Col>

                            </Row>

                        </Col>

                    </Row>
                    <Row>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/f9/a8/be/02339c3d69f7886a4f358e4a9a90eeec.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);
                        </Col>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/a5/f0/87/7e59d1a03f3813296783589c82fdcc50.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);

                            </Col>
                        <Col md="3">

                            <img src="https://salt.tikicdn.com/ts/banner/6e/66/5d/fdedcc0fdf00097eb69e2258136c8328.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);

                        </Col>
                        <Col md="3">
                           
                                <img src="https://salt.tikicdn.com/ts/banner/e7/f6/cf/e2eac8caabd1104e24d390d2e9f2287f.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{ width: 300 }} />);
                           
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
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/bc/91/f9/e83a7168e549de63ccda32cb559935e1.png" },
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/f2/c8/97/ec1883bd8ec9821f490876824e4c39c5.png" },
        { url: "https://salt.tikicdn.com/cache/w584/ts/banner/32/3e/40/b77dcf34e2ab12b6b7f9927fb9500f67.png" },

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
                        <SubMenu style={well}

                            title={
                                <Link to={{
                                    pathname: `/product-of-category/${item.name}/${item.id}`
                                }}>  <img src={item.linkimage} style={{ width: 50,height: 50 }} />
                                <b>{item.name}</b></Link >
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
