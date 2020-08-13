//login
import React ,{useEffect } from 'react';
import { useState } from 'react';
import DemoFooter from "../../components/Footers/DemoFooter.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import KeyWord from "../body/KeyWord";
// index sections
import Narbar from "../body/Narbar";
import ProductOfme from "../body/ProductOfme";
import ProductUserWatch from "../body/ProductUserWatch";

import axios from 'axios';
import ProductList from 'views/body/ProductList.js';
import {API_BASE_URL} from 'API/URLMapping'
function IndexPage(props){
  const [data, setData] = useState({lstCategory: [], lstProduct: [] ,lstProductNew:[]});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  
  useEffect( () => {
    const fetchData = async () => {
        const lstCategory = await axios(
          API_BASE_URL+ `/api/findAllCategory`
        );
        const lstProduct = await axios(
          API_BASE_URL+`/api/getallProduct?page=`+(page-1)+`&size=8`
        );
        const lstProductNew=await axios.get(API_BASE_URL+`/api/getproductnew?page=0&size=`+size);
  
        setData({ lstCategory: lstCategory.data, lstProduct: lstProduct.data, lstProductNew:lstProductNew.data });
       

      };
  
    fetchData();
  },[page,size]);
  function checkPageable(number){
    setPage(number);
  }
  function checkSize(number){
    setSize(number);
  }


    return(
  
        <>
  
     <IndexNavbar authenticated={props.authenticated} onLogout={props.onLogout} />
        <IndexHeader />
      <div className="main ">
      <br></br> <br></br> <br></br><br></br> <br></br> <br></br>
        <Narbar lstCategory={data.lstCategory} ></Narbar>
        {/* {props.authenticated ? (
        <ProductUserWatch  authenticated={props.authenticated}></ProductUserWatch>
        ):(<a></a>)} */}
        <ProductOfme lstProductNew={data.lstProductNew} onCheckSize={checkSize} size={size}></ProductOfme>
       
        <ProductList lstProduct={data.lstProduct} onPageable={checkPageable}></ProductList>
        <KeyWord></KeyWord>
       
        
        
        <DemoFooter />   
      
        
      
      </div>
      </>
      
    );
}
export default IndexPage;