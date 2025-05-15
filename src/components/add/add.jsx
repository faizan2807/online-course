import axios from "axios";
import { useEffect, useState } from "react"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


export function Add() {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            CourseId:'',
            Title:'',
            Description:'',
            Category:'',       
            CreatedBy:''      
        },
        onSubmit:(values)=>{
            axios.post("http://127.0.0.1:9090/add-course", values)
            .then(()=>{
                alert("Course added");
                navigate('/dashboard')
            });
        }
    });
    
    function handleBack(){
        navigate('/dashboard')
    }

    return (
        <div className="container-fluid d-flex justify-content-center w-100  p-4">
            
            <div className="border border-1 border-black w-50">
                <button className="btn btn-close float-end p-3" onClick={handleBack}></button>
            <form className=" p-5" onSubmit={formik.handleSubmit}>
                <h2>Add Course</h2>
                <dt>CourseId</dt>
               <dd>
                <input type="text"
                name="CourseId"
                className="form-control"
                onChange={formik.handleChange}
                />
               </dd>
               <dt>Title</dt>
               <dd>
                <input type="text"
                name="Title"
                className="form-control"
                onChange={formik.handleChange}
                />
               </dd>
               <dt>Description</dt>
               <dd>
                <input type="text"
                name="Description"
                className="form-control"
                onChange={formik.handleChange}
                />
               </dd>
               <dt>Category</dt>
               <dd>
                <select name="Category"  className="form-control" onChange={formik.handleChange}>
                <option value="-1">select Category</option>
                    <option value="Development">Development</option>
                    <option value="Tester">Tester</option>
                    <option value="project manager">project manager</option>
                    <option value="data analysis">data analysis</option>
                </select>
                
               </dd>
               <dt>CreateBy</dt>
               <dd>
                <input type="text" 
                name="CreatedBy"
                className="form-control"
                onChange={formik.handleChange}
                />
               </dd>
               <button type="submit" className="btn btn-success bi bi-plus w-100 mt-3">Add course</button>
            </form>
            </div>
        </div>
    )
}