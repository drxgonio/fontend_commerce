
import React from "react";
import { Menu, Icon } from 'antd';
import SimpleImageSlider from "react-simple-image-slider";
// reactstrap components
import {
    UncontrolledCollapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";
const { SubMenu } = Menu;
const handleClick = e => {
    console.log('click ', e);
};

function Narbar() {

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
                            <CategoryList></CategoryList>
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
                            <a href="#">
                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{width:300}} />);
                            </a>
                        </Col>
                        <Col md="3">
                        <a href="#">
                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{width:300}} />);
                            </a>    
                            </Col>
                        <Col md="3">
                        <a href="#">
                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{width:300}} />);
                            </a>
                        </Col>
                        <Col md="3"> 
                        <a href="#">
                            <img src="https://salt.tikicdn.com/ts/banner/f7/05/78/7b9398ef12e05e0da013019bc260a418.png" alt="https://tiki.vn/chuong-trinh/me-san-khuyen-mai-online" className="LazyLoadImage__Wrapper-sc-8w66ab-0 eQFYij" style={{width:300}} />);
                            </a>
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
function CategoryList() {
    return (
        <>
            <Navbar className="bg-primary" expand="lg">             
                        <Menu
                            onClick={handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            className="font-weight-bold"
                        >
                             <span>Danh mục</span>  
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Thiết bị điện tử</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup key="g1" title="Item 1">
                                    <Menu.Item key="1">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="g2" title="Item 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>Máy tính và lap top</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>Đồng hồ</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                  
            </Navbar>

        </>
    )
}
export default Narbar;
