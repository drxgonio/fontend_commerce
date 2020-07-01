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
import {

  Link,

} from "react-router-dom";
import Pagination from "react-js-pagination";
import { Button, Icon } from "antd";
import { message } from 'antd';
import { ACCESS_TOKEN,API_BASE_URL } from "API/URLMapping.js";
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

export default function User_QL() {

  const [lstUser,setLstUser]= useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [check, setCheck] = useState(true);//update lai component when delete
  React.useEffect(()=>{
    async function loadCategory() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
        }
      const result=await Axios.get(API_BASE_URL+`/user/findalluser?page=`+(activePage-1)+`&size=4`,{headers:headers});
      setLstUser(result.data.content);
      setItemsCountPerPage(result.data.size);
      setTotalItemsCount(result.data.totalElements);
      
    }
    loadCategory();
  },[activePage,check]);
  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);

}
const removeUser = item => {
  async function deletePUser(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
  }
    const response = await Axios.get(API_BASE_URL + "/user/deleteUser/"+item.id,{headers:headers});
    console.log(response);
      if(response.status === 200){
        message.info('Đã xóa thành công!!!'); 
        setCheck(!check); 
      }
      else{
        message.error('Đã có lỗi xảy ra!');
      }
  }
  deletePUser();
 
}

  const classes = useStyles();
  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Quản lý Người dùng</h4>
          
          </CardHeader>
          <CardBody>
          <Link  className="p-2" to="/admin/add-user" > <Button type="primary">
   <Icon type="plus" />Thêm người dùng</Button></Link>
           
          <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã User</TableCell>
                            <TableCell >Tên User</TableCell>                         
                            <TableCell align="center">Email</TableCell>
                            <TableCell >Địa chỉ</TableCell>
                            <TableCell >Số điện thoại</TableCell>
                            <TableCell >Tùy chọn</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstUser && lstUser.map(item => (
                            <TableRow >
                              <TableCell component="th" scope="row">
                                {item.id}
                              </TableCell>
                                <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                             
                              <TableCell component="th" scope="row">
                                {item.email}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.address}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.phone}
                              </TableCell> 
                              <TableCell component="th" scope="row">
                              {item&&item.role==="ROLE_ADMIN"?(<Button type="danger" disabled><Icon type="delete" /></Button>):(<Button type="danger" onClick={()=>removeUser(item)}><Icon type="delete" /></Button>)}
                        
                                
                              <Link  className="p-2" to={{
                                    pathname: `/admin/edit-user/${item&&item.id}`
                                  }}
                               ><Button type="primary"><Icon type="edit" /></Button></Link>
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
