import React from 'react';
// reactstrap components
import {
    Button,
    Container,
    Row,
    Col
} from "reactstrap";
function KeyWord() {
    return (<>
        <div className="section section-navbars">
            <Container id="menu-dropdown">
                <div className="title">
                    <h3>TỪ KHÓA HOT</h3>
                </div>
                <br />
                <Row>
                    <Col md="12">
                        <Button
                            className="btn-round mr-1"
                            color="default"
                            type="button"
                        >
                            Áo hodie        </Button>
                        <Button
                            className="btn-round mr-1"
                            color="primary"
                            type="button"
                        >
                            Quần kaki
                </Button>
                        <Button className="btn-round mr-1" color="info" type="button">
                            Áo thun nam tay dài
                </Button>
                        <Button
                            className="btn-round mr-1"
                            color="success"
                            type="button"
                        >
                            Áo vét nam
                </Button>
                        <Button
                            className="btn-round mr-1"
                            color="warning"
                            type="button"
                        >
                            Giày thể thao
                </Button>
                        <Button className="btn-round mr-1" color="danger" type="button">
                            Quần lửng
                </Button>
                        <Button className="btn-round" color="neutral" type="button">
                            Đồng hồ
                </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    );
}
export default KeyWord;