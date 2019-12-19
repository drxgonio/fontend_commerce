import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { Button, Icon } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Product_QL() {

  const [lstProduct,setLstProduct]= useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [activePage, setActivePage] = useState(1);
  React.useEffect(()=>{
    async function loadCategory() {
      const result=await Axios.get(`http://localhost:8080/api/getallProduct?page=`+(activePage-1)+`&size=4`);
      setLstProduct(result.data.content);
      setItemsCountPerPage(result.data.size);
      setTotalItemsCount(result.data.totalElements);
      
    }
    loadCategory();
  },[activePage]);
  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);

}

  const classes = useStyles();
  return (
    
    <GridContainer>
      {console.log(lstProduct)}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Quản lý sản phẩm</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <Link  className="p-2" to="/admin/add-product" > <Button type="primary" className="p-2"><Icon type="plus" />Thêm sản phẩm</Button></Link>
          <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã Sản Phẩm</TableCell>
                            <TableCell >Tên Sản Phẩm</TableCell>                         
                            <TableCell align="center">Ngày Thêm</TableCell>
                            <TableCell >Ngày Cập Nhập</TableCell>
                            <TableCell >Giá Cả</TableCell>
                            <TableCell >Tùy chọn</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstProduct && lstProduct.map(item => (
                            <TableRow >
                              <TableCell component="th" scope="row">
                                <a>{item.id}</a>
                              </TableCell>
                               <TableCell component="th" scope="row">
                                <a>{item.name}</a>
                              </TableCell>
                             
                              <TableCell component="th" scope="row">
                                <a>{item.dateAdd}</a>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <a>{item.dateUpdate}</a>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <a>{item.product_details.price}</a>
                              </TableCell> 
                              <TableCell component="th" scope="row">
                              <Link to="/admin/edit-product" ><Button type="primary"><Icon type="edit" /></Button></Link><Button type="danger"><Icon type="delete" /></Button>
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
  );
}
