import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import { Modal } from 'antd';
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { ACCESS_TOKEN, API_BASE_URL } from "API/URLMapping.js";
import { message } from 'antd';
import Barchart from './Barchart';
import DoughnutChart from './DoughnutChart';
import Linechart from './Linechart'
import ChartMoney from './ChartMoney/ChartMoney'
import OrderDetail from './ChartMoney/OrderDetail'

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Tabs } from 'antd';
import { Row, Col, Label } from "reactstrap";
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

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const [lstOrder, setLstOrder] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [check, setCheck] = useState(true);
  const [orderDetail, setorderDetail] = useState(null);
  const { TabPane } = Tabs;
  React.useEffect(() => {
    async function loadCategory() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const result = await Axios.get(API_BASE_URL + `/api/admin/findorderstatus?page=` + (activePage - 1) + `&size=4`, { headers: headers });
      setLstOrder(result.data.content);
      setorderDetail(result.data.content[0])
      setItemsCountPerPage(result.data.size);
      setTotalItemsCount(result.data.totalElements);
    }
    loadCategory();
  }, [activePage, check]);
  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);

  }
  const viewDetail = id => {
    async function view() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const response = await Axios.get(API_BASE_URL + "/dashboard/getOrderById/" + id, { headers: headers });
      setorderDetail(response.data);
    }
    view();
  }
  const successOrder = item => {
    async function successfull() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const response = await Axios.get(API_BASE_URL + "/api/successorder/" + item, { headers: headers });
      console.log(response);
      if (response.status === 200) {
        message.info('Đã giao thành công!!!');
        setCheck(!check);
      }
      else {
        message.error('Đã có lỗi xảy ra!');
      }
    }
    successfull();

  }
  const classes = useStyles();
  function callback(key) {
  }
  const [visible, setvisible] = useState(false);
  const [card, setCard] = useState(false);
  const [money, setMoney] = useState(0);
  function handleOk() {
    setvisible(false);
  }
  function handleCancel() {
    setvisible(false);
  }
  function showModal() {
    if (money === 0 || money < 100000) {
      message.error('Vui lòng nhập số tiền tối thiểu 100.000 vnđ.')
    }
    else {
      console.log(money);
      async function successfull() {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
        const response = await Axios.get(API_BASE_URL + "/app/gerateCode/" + money, { headers: headers });
        console.log(response);
        setCard(response.data);
        setvisible(true);
      }
      successfull()
    }


  }
  return (
    <div>
      <Row>
        <Col md={3}>
          <input type="text" placeholder="Nhập số tiền" onChange={e => setMoney(e.target.value)} className="form-control" type="number" />
        </Col>
        <Col md={3}>
          <Button type="primary" onClick={showModal}>
            Generate Code
        </Button>
        </Col>
      </Row>
      <Modal
        title="Thông tin Code:"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Label>Mã code: <h3 style={{ fontWeight: 'bold' }}>{card.code}</h3></Label> <br></br>
        <Label>Số tiền: <a style={{ fontWeight: 'bold' }}>{card.money} đồng</a></Label>

      </Modal>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tổng quan" key="1">
          <br></br>
          <Row>
            <Col md={6}>
              <GridContainer>

                <GridItem >
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleWhite}>Các đơn hàng đang giao</h4>
                    </CardHeader>
                    <CardBody>
                      <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell >Tên Order</TableCell>
                            <TableCell align="center">Người đặt hàng</TableCell>
                            <TableCell >Sản phẩm</TableCell>
                            <TableCell >Tổng tiền</TableCell>
                            <TableCell >Tình trạng</TableCell>
                            <TableCell >Xem chi tiết</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstOrder && lstOrder.map((item, index) => (
                            <TableRow >
                              <TableCell component="th" scope="row">
                                {index}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                {item.user && item.user.name}
                              </TableCell>
                              <TableCell >{item && item.lstOrder.map(pr => (
                                <a>{pr.product.name},</a>
                              ))}</TableCell>
                              <TableCell component="th" scope="row">
                                {item.totalprice}đ
                      </TableCell>
                              {item.bank === true ? <TableCell component="th" scope="row">
                                Đã thanh toán
                      </TableCell> : <TableCell component="th" scope="row">
                                  Chưa thanh toán
                      </TableCell>}

                              <TableCell component="th" scope="row">
                                <Button type="primary" onClick={() => viewDetail(item.id)}>Chọn</Button>
                              </TableCell>

                            </TableRow>
                          ))}


                        </TableBody>
                      </Table>
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
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>

            </Col>
            <Col md={6}>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: 'default' }}
                size={'default'}
                style={{ fontWeight: 'bold' }}
              ><Form.Item label="Thông tin đơn hàng">
                </Form.Item>
                <Form.Item label="Mã đơn hàng">
                  <Label className="text-primary" >{orderDetail && orderDetail.id}</Label>
                  {/* <Input value={orderDetail && orderDetail.id} disabled /> */}
                </Form.Item>
                <Form.Item label="Tên đơn hàng">
                  {/* <Input value={orderDetail && orderDetail.name} disabled /> */}
                  <Label className="text-primary">{orderDetail && orderDetail.name}</Label>
                </Form.Item>
                <Form.Item label="Ngày đặt hàng">
                  <Label className="text-primary">{orderDetail && orderDetail.dateadd}</Label>
                  {/* <Input value={orderDetail && orderDetail.dateadd} disabled /> */}
                </Form.Item>
                <Form.Item label="Người đặt hàng">
                  <Label className="text-primary">{orderDetail && orderDetail.user.name}</Label>
                  {/* <Input value={orderDetail && orderDetail.user.name} disabled /> */}
                </Form.Item>
                <Form.Item label="Địa chỉ">
                  <Label className="text-primary">{orderDetail && orderDetail.user.address}</Label>
                  {/* <Input value={orderDetail && orderDetail.user.name} disabled /> */}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Label className="text-primary">{orderDetail && orderDetail.user.phone}</Label>
                  {/* <Input value={orderDetail && orderDetail.user.name} disabled /> */}
                </Form.Item>

                <Form.Item label="Sản phẩm">
                  {
                    orderDetail && orderDetail.lstOrder.map(item =>
                      <Label className="text-primary">{item.product.name}</Label>
                      // <Input value={item.product.name} disabled />
                    )
                  }

                </Form.Item>
                <Form.Item label="Tổng tiền">
                  <Label className="text-primary">{orderDetail && orderDetail.totalprice} đồng.</Label>
                  {/* <Input value={orderDetail && orderDetail.totalprice} disabled /> */}
                </Form.Item>

                <Form.Item label="Chuyển giao">
                  <Button type="danger" onClick={() => successOrder(orderDetail.id)}>Giao hàng</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Thống kê" key="2">
          <Row>
            <Col md={6}>
              <Linechart></Linechart>
              <ChartMoney></ChartMoney>
            </Col>
            <Col md={6}>
              <Barchart></Barchart>
              <DoughnutChart></DoughnutChart>

            </Col>
          </Row>

        </TabPane>
        <TabPane tab="Số lượng sản phẩm bán ra" key="3">
          <br></br>
          <Row>
            <Col md={6}>
              <Barchart></Barchart>

            </Col>
            <Col md={6}>
              <DoughnutChart></DoughnutChart>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>

  );
}
