import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";

export function Edit() {
  const navigate = useNavigate();
  const { CourseId } = useParams();
  const location = useLocation();

  const course = location.state?.course

  const formik = useFormik({
    initialValues: {
      CourseId: '',
      Title: '',
      Description: '',
      Category: '',
      CreatedBy: ''
    },
    onSubmit: (values) => {
        axios.put(`http://127.0.0.1:9090/edit-course/${values.CourseId}`, values)
        .then(() => {
          alert("Course updated");
          navigate('/dashboard');
        });
    }
  });

  
  useEffect(() => {
    if (course) {
      formik.setValues(course);
    }
  }, [course]); 

  function handleCancel(){
    navigate('/dashboard')
  }

  return (
    <div className="container-fluid d-flex justify-content-center w-100 p-4">
      <div className="border border-1 border-dark w-50">
        <button className="btn btn-close float-end" onClick={handleCancel}></button>
        <form className="p-5" onSubmit={formik.handleSubmit}>
          <h2>Edit Course</h2>

          <dt>CourseId</dt>
          <dd>
            <input
              type="text"
              name="CourseId"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.CourseId}
              disabled 
            />
          </dd>

          <dt>Title</dt>
          <dd>
            <input
              type="text"
              name="Title"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.Title}
            />
          </dd>

          <dt>Description</dt>
          <dd>
            <input
              type="text"
              name="Description"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.Description}
            />
          </dd>

          <dt>Category</dt>
          <dd>
            <select
              name="Category"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.Category}
            >
              <option value="">Select Category</option>
              <option value="Development">Development</option>
              <option value="Tester">Tester</option>
              <option value="project manager">Project Manager</option>
              <option value="data analysis">Data Analysis</option>
            </select>
          </dd>

          <dt>CreatedBy</dt>
          <dd>
            <input
              type="text"
              name="CreatedBy"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.CreatedBy}
            />
          </dd>

          <button type="submit" className="btn btn-success bi bi-plus w-100 mt-3">
            Edit Course
          </button>
        </form>
      </div>
    </div>
  );
}
