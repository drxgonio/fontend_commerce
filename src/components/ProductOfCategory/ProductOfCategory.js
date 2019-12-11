
import React, { useState, useEffect } from "react";
import { Menu, Icon, Button } from 'antd';
import SimpleImageSlider from "react-simple-image-slider";
import Pagination from "react-js-pagination";
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
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProductItem from "views/body/ProductItem";
import IndexHeader from "components/Headers/IndexHeader"; 
import Axios from "axios";
import DemoFooter from "components/Footers/DemoFooter";

function ProductOfCategory(props) {

    const [listProduct, setListProduct] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [page, setPage] = useState(1);
    useEffect(()=>{
        const fetchData= async ()=>{
            const lst= await Axios.get(`http://localhost:8080/api/getProductOfCategory?idCategory=`+props.match.params.id+`&page=`+(page-1)+`&size=4`);
            setListProduct(lst.data.content);
            setItemsCountPerPage(lst.data.size);
            setTotalItemsCount(lst.data.totalElements);
            
        }
        fetchData();
    },[props.match.params.id,page])

    function fetchURL(page) {
        // console.log(page);
       //  props.onPageable(page);
     }
     function handlePageChange(pageNumber) {
         setPage(pageNumber);
     }
    
    return (
        <>

             {console.log(listProduct)}
            
           <IndexNavbar authenticated={props.authenticated} onLogout={props.onLogout}></IndexNavbar>  
           <IndexHeader></IndexHeader>  
            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                        <h3>Sản phẩm thuộc danh mục: {props.match.params.name} </h3>
                    </div>
                    <br />
                    <Row>

                    </Row>
                    <Row>
                         {
                            listProduct&&listProduct.map(item => (
                                <Col md="3">  <ProductItem product={item}></ProductItem> </Col>
                            ))

                        } 
                        
                    </Row>
                    <Row className="text-center pt-5">
                    <Pagination
                            hideNavigation
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={10}
                            itemClass='page-item'
                            linkClass='btn btn-light'
                            onChange={handlePageChange}
                        />
                    </Row>
                </Container>
            </div>
            <DemoFooter></DemoFooter>
        </>
    )
}
export default ProductOfCategory;