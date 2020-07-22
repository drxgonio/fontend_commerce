import React from 'react';
import {Link} from 'react-router-dom'
const well={
    boxShadow: "0.5px 0.5px 0.5px 0.5px #9E9E9E",
    borderRadius: "15px"
    }
function ProductItem(props){
    const[image,setImage]=React.useState("");
    React.useEffect(()=>{
        if(props.product!=null){
            setImage(props.product.imagephoto);
        }
    },[props.product])
    
  
    return(
        <>
            <div className="position-relative text-center border " style={well}>
            <Link  to={{
                                    pathname: `/product-details/${props.product&&props.product.name}/${props.product&&props.product.id}`
                                  }}>
                <img src={image}
                alt="Áo Thun Thể Thao Nam" className="form-control" 
                style={{width: '100%', height: '280px', opacity: 1, boxShadow: "1px 1px #9E9E9E"}} />
                </Link >   
    <p className="title" style={{ height: '40px'}}>{props.product&&props.product.name}</p>
                <p className="h5 m-auto text-center font-weight-bold ">
                {props.product&&props.product.product_details.pricesale}
                                <span class="h6 text-justify"><small className="align-baseline">{props.product&&(parseInt((1-(parseInt(props.product.product_details.pricesale)/parseInt(props.product.product_details.price)))*100))===0?"":<mark className="text-danger">-{props.product&&(parseInt((1-(parseInt(props.product.product_details.pricesale)/parseInt(props.product.product_details.price)))*100))}%</mark>}</small></span>
                   
                </p>
                <p className="h5 m-auto text-center ">
                                {props.product&&(parseInt((1-(parseInt(props.product.product_details.pricesale)/parseInt(props.product.product_details.price)))*100))===0?<br></br>: <strike>{props.product&&props.product.product_details.price} </strike>     }
                
                                  </p>
            </div>
            
        </>
    );
};






export default ProductItem;