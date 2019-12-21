
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
// reactstrap components
import {
    Container,
    Row,
    Col
} from "reactstrap";
import ProductItem from "./ProductItem";


function ProductList(props) {

    const [listProduct, setListProduct] = useState([]);
    const [data, setData] = useState([]);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {

        setListProduct(props.lstProduct.content);
        setItemsCountPerPage(props.lstProduct.size);
        setTotalItemsCount(props.lstProduct.totalElements);

    }, [props.lstProduct.content]);
    useEffect(() => {
       setData(listProduct)

    }, [listProduct])
    function fetchURL(page) {
        props.onPageable(page);
    }
    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
        fetchURL(pageNumber);
    }
    return (
        <>

              
            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                        <h3>Sản phẩm của cửa hàng </h3>
                    </div>
                    <br />
                    <Row>

                    </Row>
                    <Row>
                         {
                            data&&data.map(item => (
                                <Col md="3" className="pt-3">  <ProductItem product={item}></ProductItem> </Col>
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
        </>
    )
}
export default ProductList;