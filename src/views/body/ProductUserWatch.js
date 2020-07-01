import React, {useEffect} from 'react';
import {  Button } from 'antd';
// reactstrap components
import {
   
    Container,
    Row,
    Col
} from "reactstrap";
import ProductItem from './ProductItem';
import { ACCESS_TOKEN, API_BASE_URL } from 'API/URLMapping';
import Axios from 'axios';
function ProductUserWatch(props){
    const[lstproduct,setLstProduct] =React.useState([]);

    useEffect( ()=>{
        if(props.authenticated){
            if (localStorage.getItem(ACCESS_TOKEN)) {
                  const headers = {
                      'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
                   }
            Axios.get(API_BASE_URL+'/user/getproductwatch',{
                headers: headers
            })
            .then(res => {
                setLstProduct(res.data);
            
            })
            .catch(error => console.log(error));
        }
    }
     
      
    },[])
   return(<>
    <div className="section section-navbars">
            <Container id="menu-dropdown">
                <div className="title">
                    <h3>Sản phẩm xem gần đây</h3> 
                </div>
                <br />
                <Row>
                    
                </Row>
                <Row className="d-flex">
                    {lstproduct&&lstproduct.map(item=>(
                        <Col md="3">
                        <ProductItem  product={item}></ProductItem>
                        </Col>
                    ))}
                                    
                </Row>
                <Row>
                <Col className="text-center pt-3">
                    <Button class="btn btn-default text-info">Xem thêm</Button>
                </Col>
                </Row>
            </Container>
        </div>
    </>
   );

}
export default ProductUserWatch;