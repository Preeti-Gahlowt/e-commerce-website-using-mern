import React,{useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';


 const Card = ({product,AddtoCart=true,removeFromCart=false}) => {
    const [redirect, setRedirect] = useState(false);

      const cartTitle=product? product.name:"A photo from pexel"
      const cartDescription=product? product.descripton:"Default description"
      const cartPrice=product? product.price:"default"

      const addToCart=()=>{
        addItemToCart(product, ()=>setRedirect(true))
      }
      const getARedirect=(redirect)=>{
        if(redirect){
          return<Redirect to="/cart"/>
        }
      }

      const showAddToCart=(AddtoCart)=>{
        return(
          AddtoCart && (
            <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
          )
        );
      };
      const showRemoveFromCart=(removeFromCart)=>{
        return(
          removeFromCart &&( <button
            onClick={() => {}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>)
        )
      }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
              <div className="rounded border border-success p-2">
               <ImageHelper product={product}/>
              </div>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
              <div className="row">
                <div className="col-12">
                {showAddToCart(AddtoCart)}
                </div>
                <div className="col-12">
                 {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };   
    

export default Card;
