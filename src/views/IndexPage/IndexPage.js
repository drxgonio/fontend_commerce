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

function IndexPage(props){
  const [data, setData] = useState({lstCategory: [], lstProduct: [] ,lstProductNew:[]});
  const [page, setPage] = useState(1);
  
  useEffect( () => {
    const fetchData = async () => {
        const lstCategory = await axios(
          `http://localhost:8080/api/findAllCategory`
        );
        const lstProduct = await axios(
          `http://localhost:8080/api/getallProduct?page=`+(page-1)+`&size=8`
        );
        const lstProductNew=await axios.get("http://localhost:8080/api/getproductnew");
  
        setData({ lstCategory: lstCategory.data, lstProduct: lstProduct.data, lstProductNew:lstProductNew.data });
       

      };
  
    fetchData();
  },[page]);
  function checkPageable(number){
    setPage(number);
}


    return(
  
        <>
  
     <IndexNavbar authenticated={props.authenticated} onLogout={props.onLogout} />
        <IndexHeader />
      <div className="main">
        <Narbar lstCategory={data.lstCategory} ></Narbar>
        {props.authenticated ? (
        <ProductUserWatch  authenticated={props.authenticated}></ProductUserWatch>
        ):(<a></a>)}
        <ProductOfme lstProductNew={data.lstProductNew}></ProductOfme>
       
        <ProductList lstProduct={data.lstProduct} onPageable={checkPageable}></ProductList>
        <KeyWord></KeyWord>
       
        
        
        <DemoFooter />   
      
        
      
      </div>
      </>
      
    );
}
export default IndexPage;