import React from 'react';


function ProductItem(){
    return(
        <>
            <div className="position-relative text-center border ">
                <a href="#">
                <img src="https://salt.tikicdn.com/cache/280x280/ts/product/2c/a2/03/64747878884bbe1090a5f14b6dd768cc.jpg" 
                alt="Áo Thun Thể Thao Nam" className="form-control" 
                style={{width: '100%', height: '100%', opacity: 1}} />
                </a>
                <p className="title" style={{ height: '40px'}}>Áo thun thể thao nam.</p>
                <p className="h5 m-auto text-center font-weight-bold ">
                    253.000 ₫
                    <span class="h6 text-justify"><small className="align-baseline"><mark>-48%</mark></small></span>
                   
                </p>
                <p className="h5 m-auto text-center ">
                    <strike>451.000 ₫ </strike>        
                </p>

            </div>
        </>
    );
};




export default ProductItem;