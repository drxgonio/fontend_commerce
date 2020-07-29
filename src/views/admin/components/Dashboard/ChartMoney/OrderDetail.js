import React, { Component } from 'react'
import axios from 'axios';
import { API_BASE_URL } from 'API/URLMapping'
import {
    Label,
    Container,
    Row,
    Col,
  } from "reactstrap";
  import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
export class OrderDetail extends Component {
 
    constructor(props) {
        super(props);
    }

    render() {
        return (
          
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'default' }}
            size={'default'}
          >  {this.props.data&&console.log(this.props.data)}
              <h1>Thông tin chi tiết</h1>
            <Form.Item label="Mã đơn hàng">
              <Input value={this.props.data&&this.props.data.id} disabled/>
            </Form.Item>
            <Form.Item label="Tên đơn hàng">
              <Input value={this.props.data&&this.props.data.name} disabled/>
            </Form.Item>
            <Form.Item label="Ngày đặt hàng">
              <Input value={this.props.data&&this.props.data.dateadd} disabled/>
            </Form.Item>
            <Form.Item label="Người đặt hàng">
              <Input value={this.props.data&&this.props.data.user.name} disabled/>
            </Form.Item>
           
            <Form.Item label="Sản phẩm">
                {
                    this.props.data&&this.props.data.lstOrder.map(item =>
                        <Input value={item.product.name} disabled/>
                    )
                }
             
            </Form.Item>
            <Form.Item label="Tổng tiền">
              <Input value={this.props.data&&this.props.data.totalprice} disabled/>
            </Form.Item>
            
            <Form.Item >
              <Button type="primary" onClick={this.props.data&&localStorage.setItem("idOrder",this.props.data.id)}>Giao hàng</Button>
            </Form.Item>
          </Form>
        );
    }
}

export default OrderDetail  