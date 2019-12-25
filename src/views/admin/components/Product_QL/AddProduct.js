import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import useForm from 'react-hook-form';
import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
import Axios from "axios";
import { message } from 'antd';
import { withRouter } from "react-router-dom"
import {
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import axios from 'axios';

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
// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label, register, lst }, ref) => (
  <>

    <select name={label} ref={ref} class="form-control">
      {lst.map(item =>
        <option value={item.id}>{item.name}</option>

      )}

    </select>
  </>
))

export default function AddProduct(props) {

  const [lstCategory, setLstCategory] = React.useState([]);
  const [lstCategory_Sub, setLstCategory_Sub] = React.useState([]);
  const [url,setUrl]=React.useState('');
  const [url1,setUrl1]=React.useState('');
  const [url2,setUrl2]=React.useState('');
  const [url3,setUrl3]=React.useState('');
  const [check,setCheck]=React.useState(false);
  const [flag,setFlag]=React.useState(true);
  const { register, handleSubmit, watch, errors } = useForm();
  React.useEffect(() => {
    const fetchData = async () => {
      const lstC = await axios(
        `http://localhost:8080/api/findAllCategory`
      );
      setLstCategory(lstC.data);


    };

    fetchData();
  }, []);

  const onSubmit = async data => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      data.url=url;
      data.url1=url1;
      data.url2=url2;
      data.url3=url3;
  
      const response = await Axios.post(API_BASE_URL + "/api/addproductbyAdmin", data, {
        headers: headers
      });
      if (response.status === 200) {
        message.info('Thêm Sản phẩm thành công.');
        props.history.push("/admin/product")
      }
      else {
        message.error('Đã có lỗi xảy ra.');
      }
    }

  }

  function ChangeURL(url){
    setUrl(url);
   
  }
  function ChangeURL1(url){
     setUrl1(url);
    
   }
   function ChangeURL2(url){
     setUrl2(url);
    
   }
   function ChangeURL3(url){
     setUrl3(url);
   }
  const selectCategory = async data => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }


      const response = await Axios.post(API_BASE_URL + "/api/findCategorySubOfCategory", data, {
        headers: headers
      });
      setLstCategory_Sub(response.data);
      setCheck(true);
    }

   
  }


  const classes = useStyles();
  return (

    <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thêm sản phẩm</h4>

          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(selectCategory)}>
              <Row className="p-3">
                <Col md={4}>
                  <label>Danh mục</label>
                </Col>
                <Col md={6}>
                  <Select label="id" ref={register} lst={lstCategory} />
                </Col>
                <Col md={2}></Col>
                <Col md={2}>
                   <input type="submit" className="btn btn-primary" value="Chọn" />
                </Col>

              </Row>
            </form>
            {check?( <form onSubmit={handleSubmit(onSubmit)}>

<Row className="p-3">
  <Col md={4}>
    <label>Danh mục chi tiết</label>
  </Col>
  <Col md={6}>
    <Select label="category_subID" ref={register} lst={lstCategory_Sub} />
  </Col>

</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Tên sản phẩm</label>
  </Col>
  <Col md={6}>
    <input className="form-control" placeholder="Tên sản phẩm" ref={register} name="name" required />

  </Col>
</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Mô tả</label>
  </Col>
  <Col md={20}>
    <input className="form-control" placeholder="Mô tả sản phẩm" ref={register } name="description" required/>

  </Col>
</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Giá gốc</label>
  </Col>
  <Col md={6}>
    <input className="form-control" placeholder="Giá" ref={register} name="price" type="number" required /> 

  </Col>
  <Col md={4} className="pl-2">
    <label>Giá sale</label>
  </Col>
  <Col md={6}>
    <input className="form-control" placeholder="Giá" ref={register} name="pricesale" type="number" required/>
  

  </Col>
</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Màu sắc</label>
  </Col>
  <Col md={6}>
    <input className="form-control" placeholder="Màu sắc" ref={register} name="color"  required /> 

  </Col>
  <Col md={4} className="pl-2">
    <label>Size</label>
  </Col>
  <Col md={6}>
    <input className="form-control" placeholder="Kích cỡ" ref={register} name="size"  required/>
  

  </Col>
</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Ảnh đại diện</label>
  </Col>
  <Col md={8}>
      <ImageUpload ChangeURL={ChangeURL}></ImageUpload>
  </Col>
</Row>
<Row className="p-3">
<Col md={4}>
    <label>Ảnh chi tiết</label>
  </Col>
</Row>
<Row className="p-3">
  
  <Col md={8}>
      <ImageUpload ChangeURL={ChangeURL1}></ImageUpload>
  </Col>
  <Col md={8}>
      <ImageUpload ChangeURL={ChangeURL2}></ImageUpload>
  </Col>
  <Col md={8}>
      <ImageUpload ChangeURL={ChangeURL3}></ImageUpload>
  </Col>
 
</Row>
<Row className="p-3">
  <Col md={4}>
    <label>Tình trạng</label>
  </Col>
  <Col md={4}>
    <input className="form-control" placeholder="Tình trạng" ref={register } name="productnew" type="number" required/>
    <label>(1): Sản phẩm mới </label> <br />
    <label>(2): Sản phẩm cũ </label>
  </Col>
  <Col md={4}>
    <label>Số lượng</label>
  </Col>
  <Col md={4}>
    <input className="form-control" placeholder="Số lượng" ref={register } name="countSL" type="number" required/>
    
  </Col>
</Row>
<Row className="p-3">
  <Col md={16}>

  </Col>
  <Col md={4}>
    <input type="submit" className="btn btn-warning" value="Thêm sản phẩm" />

  </Col>
</Row>
</form>

):(<Row></Row>)}
           

          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}
