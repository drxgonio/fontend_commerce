import React, { useState, useEffect } from 'react'
import NarbarGlobal from 'components/Navbars/NarbarGlobal'
import Axios from 'axios';
import {





    Container,
    Row,
    Col
} from "reactstrap";
import Pagination from "react-js-pagination";
import ProductItem from 'views/body/ProductItem';
import {API_BASE_URL} from 'API/URLMapping'
function Search(props){
    const[keyword,setKeyword]= useState(props.match.params.name);
    const [listProduct, setListProduct] = useState([]);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
    const [totalItemsCount, setTotalItemsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    

    useEffect(()=>{
        async function searchProduct(){
                const result= await Axios.get(API_BASE_URL+`/api/search?keyword=`+keyword+`&page=`+(activePage-1)+`&size=4`);
                setListProduct(result.data.content);
                setItemsCountPerPage(result.data.size);
                setTotalItemsCount(result.data.totalElements);
        }
        searchProduct();
    },[props.match.params.name,activePage])
    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);

    }

  
    
    return(
        <>
        <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
        <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                    <h3>Sản phẩm tìm kiếm theo: {props.match.params.name}</h3>
                    </div>
                    <br />
                    <Row>

                    </Row>
                    <Row>
                         {
                            listProduct&&listProduct.map(item => (
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
export default  Search;