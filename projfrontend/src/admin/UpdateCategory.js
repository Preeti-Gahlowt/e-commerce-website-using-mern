import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import {Link} from "react-router-dom";
import {getcategory,updateCategory} from "./helper/adminapicall"

const UpdateCategory = ({match}) => {
    const [value,setName] = useState({
      name:""
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {name}= value;
    const{user,token }=isAuthenticated();

    const preload= (categoryId)=>{
      getcategory(categoryId).then(data=>{
        if(data.error){
            setError({
              error: true,
             
            })
        }else{
          setName({
            name: data.name,
            
          })
        }
   
      })
    } ;
    
    const successMessage=()=>{
      if(success){
          return <h4 className="text-success">Category updated successfully</h4>;
      }
  };
  const warningMessage=()=>{
      if(error){
          return <h4 className="text-success">Failed, category not updated</h4>;
      }
  };

  useEffect(()=>{
    preload(match.params.categoryId);
  }, [])
    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    );

    const handleChange =event=>{
        setError("");
        setName(event.target.value);
    };
    const onSubmit=event=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        //backend request fired
        updateCategory(match.params.categoryId,user._id, token, {name})
        .then(data=>{
            if(data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
              
            }
        })
        .catch(err=> console.log("category not updated"));
    };
   

    const CategoryUpdateForm =()=>(
        <form >
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" onChange={handleChange} value={name}
                 className="form-control my-3" 
                 autoFocus required 
                 placeholder="For Ex. summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    );

    return (
        <Base className="container bg-info p-4"
        title="Create a category here"
        desciption="Add a new category for new tshirt">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMessage()}
                {warningMessage()}
                {CategoryUpdateForm()}
                {goBack()}
                </div>
            </div>

        </Base>
           
        
    );
};

export default UpdateCategory;
