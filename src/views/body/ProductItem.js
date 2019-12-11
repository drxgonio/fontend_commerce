import React from 'react';
import {Link} from 'react-router-dom'

function ProductItem(props){
    const[image,setImage]=React.useState("");
    React.useEffect(()=>{
        if(props.product!=null){
            setImage(props.product.imagephoto);
        }
    },[props.product])
    
  
    return(
        <>
            <div className="position-relative text-center border ">
            <Link   to={{
                                    pathname: `/product-details/${props.product&&props.product.name}/${props.product&&props.product.id}`
                                  }}>
                <img src={image}
                alt="Áo Thun Thể Thao Nam" className="form-control" 
                style={{width: '100%', height: '100%', opacity: 1}} />
                </Link >   
    <p className="title" style={{ height: '40px'}}>{props.product&&props.product.name}</p>
                <p className="h5 m-auto text-center font-weight-bold ">
                {props.product&&props.product.product_details.pricesale}
                    <span class="h6 text-justify"><small className="align-baseline"><mark>-48%</mark></small></span>
                   
                </p>
                <p className="h5 m-auto text-center ">
                    <strike>{props.product&&props.product.product_details.price} </strike>        
                </p>

            </div>
        </>
    );
};




export default ProductItem;