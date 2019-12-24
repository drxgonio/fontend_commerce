
import React from "react";
import { Button } from 'antd';

// reactstrap components
import {
    Container,
    Row,
    Col
} from "reactstrap";
import ProductItem from "./ProductItem";


function ProductOfme(props) {
    const [size,setSize]=React.useState(props.size);
    React.useEffect(()=>{
        props.onCheckSize(size);
    },[size]);
   
    return (
        <>
            <div className="section section-navbars">
                <Container id="menu-dropdown">
                    <div className="title">
                   <h3>Sản phẩm mới </h3>
                    </div>
                    <br />
                    <Row>

                    </Row>
                   
                            <Row>
                            {props.lstProductNew.content&&props.lstProductNew.content.map(item=>(
                                    <Col md="3">
                                        <ProductItem product={item}></ProductItem>
                                    </Col>
                           
                             ))}
                        </Row>
                   
                    
                    <Row>
                        <Col className="text-center pt-3">
                            <Button class="btn btn-default text-info" onClick={() => setSize(size + 4)}>Xem thêm</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default ProductOfme;