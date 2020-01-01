import React,{useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";

// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Tasks from "../../custom_design/Tasks/Tasks.js";
import CustomTabs from "../../custom_design/CustomTabs/CustomTabs.js";
import { bugs } from "views/admin/variables/general";
import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import CardFooter from "../../custom_design/Card/CardFooter.js";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { Button, Icon } from "antd";
import { ACCESS_TOKEN,API_BASE_URL } from "API/URLMapping.js";
import { message } from 'antd';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const [lstOrder,setLstOrder]= useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [check, setCheck] = useState(true);
  React.useEffect(()=>{
    async function loadCategory() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
        }
      const result=await Axios.get(`http://localhost:8080/api/admin/findorderstatus?page=`+(activePage-1)+`&size=4`,{headers:headers});
      setLstOrder(result.data.content);
      setItemsCountPerPage(result.data.size);
      setTotalItemsCount(result.data.totalElements);
      
    }
    loadCategory();
  },[activePage,check]);
  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);

}
const successOrder = item => {
  async function successfull(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
  }
    const response = await Axios.get(API_BASE_URL + "/api/successorder/"+item.id,{headers:headers});
    console.log(response);
      if(response.status === 200){
        message.info('Đã giao thành công!!!'); 
        setCheck(!check); 
      }
      else{
        message.error('Đã có lỗi xảy ra!');
      }
  }
  successfull();
 
}
  const classes = useStyles();
  return (
    <div>
       <GridContainer>
      
      <GridItem xs={24} sm={24} md={24}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Các đơn hàng đang giao</h4>
          </CardHeader>
          <CardBody>
          <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã Order</TableCell>
                            <TableCell >Tên Order</TableCell>                         
                            <TableCell align="center">Người đặt hàng</TableCell>
                            <TableCell >Sản phẩm</TableCell>
                            <TableCell >Tổng tiền</TableCell>                
                            <TableCell >Đang giao hàng</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstOrder && lstOrder.map(item => (
                            <TableRow >
                              <TableCell component="th" scope="row">
                                {item.id}
                              </TableCell>
                                 <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                             
                              <TableCell component="th" scope="row">
                                {item.user.name}
                              </TableCell>
                              <TableCell >{item&&item.lstOrder.map(pr=>(
  <a>{pr.product.name},</a>
))}</TableCell>
                              <TableCell component="th" scope="row">
                                {item.totalprice}đ
                              </TableCell>                       
                              <TableCell component="th" scope="row">
                             <Button type="danger" onClick={()=>successOrder(item)}><Icon type="swap" /></Button>
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

      <GridContainer>
      <Card chart>
          <CardHeader color="danger">
            <ChartistGraph
              className="ct-chart"
              data={completedTasksChart.data}
              type="Line"
              options={completedTasksChart.options}
              listener={completedTasksChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Doanh thu các ngày gần đây</h4>
            
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> campaign sent 2 days ago
            </div>
          </CardFooter>
        </Card>
    
    </GridContainer>
     </div>
  
  );
}
