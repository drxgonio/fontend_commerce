
import React, { useEffect } from "react";


import { makeStyles } from '@material-ui/core/styles';

import DemoFooter from "components/Footers/DemoFooter";

import NarbarGlobal from "components/Navbars/NarbarGlobal";
import {
    Container,
    Row,
    Col,
    Label, Input,Form
} from "reactstrap";

import { Progress, Button } from 'antd';
import useForm from "Aform/useForm";

function Shipping(props) {
    const [activeTab, setActiveTab] = React.useState("1");


    const [user, setUser] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    React.useEffect(() => {
        setUser(props.currentUser);


    }, [props.currentUser]);

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });
    function editProfile() {
        setChecked(true);
    }
   





    return (
        <>
    

            <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
            <div className="section section-navbars pt-100">
                <Container >

                    <br />
                    <Row>
                        <Progress percent={50} size="small" status="active" />
                    </Row>
                    <Row>
                        <span>Chọn địa chỉ giao hàng có sẵn bên dưới:</span>

                    </Row>
                    <Row >
                        <Col md="8" className="border">
                            <Row>
                                <label className="font-weight-bold p-2">{user && user.name}</label>
                            </Row>
                            <Row>
                                <label className=" p-1">Địa chỉ: {user && user.address}</label>
                            </Row>
                            <Row>
                                <label className=" p-1"> Điện thoại: {user && user.phone}</label>
                            </Row>
                            <Row>
                                <Col md="4" className="m-1 p-1"><Button type="danger">Giao đến địa chỉ này</Button></Col>
                                <Col md="4" className="m-1 p-1"><Button onClick={editProfile}>Sửa</Button></Col>
                            </Row>

                        </Col>
                    </Row>
                    {checked ? (
                        <Form >
                            <span>Bạn muốn giao hàng đến địa chỉ khác?</span>
                            <Col md="12">
                                <Row>
                                    <Col md="4" align="right"> <Label>Họ tên</Label></Col>
                                    <Col md="6"> <Input placeholder="Nhập tên" value={props.currentUser && props.currentUser.name} className="form-group" /></Col>
                                </Row>
                                <Row>
                                    <Col md="4" align="right"> <Label>Số điện thoại</Label></Col>
                                    <Col md="6"> <Input placeholder="Nhập Số điện thoại" value={props.currentUser && props.currentUser.phone} className="form-group" type="number" /></Col>
                                </Row>
                                <Row>
                                    <Col md="4" align="right"> <Label>Địa chỉ</Label></Col>
                                    <Col md="6"> <Input placeholder="Nhập địa chỉ" value={props.currentUser && props.currentUser.address} className="form-group" /></Col>
                                </Row>
                                <Row>
                                    <Col md="8"></Col>
                                    <Col md="3" className="m-1 p-1"><Button type="primary">Cập nhập</Button></Col>
                                </Row>
                            </Col>

                        </Form>
                    ) : (
                            <Row></Row>
                        )
                    }

                </Container>
            </div>

            <DemoFooter />
        </>
    );
}



const useStyles = makeStyles(theme => ({

}));
export default Shipping;
