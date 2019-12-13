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

import { Icon, Button } from "antd";
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

export default function Category_QL() {

  const [lstCategory,setLstCategory]= useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [activePage, setActivePage] = useState(1);
  React.useEffect(()=>{
    async function loadCategory() {
      const result=await Axios.get(`http://localhost:8080/api/category?page=`+(activePage-1)+`&size=4`);
      setLstCategory(result.data.content);
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
      {console.log(lstCategory)}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh mục sản phẩm</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <Button type="primary" className="p-2"><Icon type="plus" />Thêm danh mục</Button>
          <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã Danh Mục</TableCell>
                            <TableCell >Tên Danh Mục</TableCell>
                            <TableCell >Ngày Thêm</TableCell>
                            <TableCell align="center">Ngày Cập Nhập</TableCell>
                            <TableCell >Ghi Chú</TableCell>
                            <TableCell >Hình Ảnh</TableCell>
                            <TableCell >Tùy chọn</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstCategory && lstCategory.map(item => (
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
                                <a>{item.note}</a>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <a>{item.linkimage}</a>
                              </TableCell>
                              <TableCell component="th" scope="row">
                              <Button type="primary"><Icon type="edit" /></Button><Button type="danger"><Icon type="delete" /></Button>
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
