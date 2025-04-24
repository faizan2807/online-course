import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function Addlesson() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      LessonId: '',
      Title: '',
      Content: '',
      CourseId: '',
      Order: ''
    },
    onSubmit: (values) => {
        axios.post("http://127.0.0.1:9090/add-lesson", values)
          .then(() => {
            alert("Lesson added");
            navigate(`/dashboard`);
          })
          .catch(err => {
            console.error("Error adding lesson:", err);
            alert("Failed to add lesson.");
          });
      }
  });

  function handleBack(){
    navigate('/dashboard')
  }
  return (
    <div className="container-fluid d-flex justify-content-center mt-5 p-4">
      <div className="border border-1 border-black p-4 w-50">
       <div><button className="btn btn-close float-end" onClick={handleBack}></button></div>
        <h2>Add Lesson</h2>
        <form onSubmit={formik.handleSubmit}>
          <dt>LessonId</dt>
          <dd>
            <input type="text" name="LessonId" onChange={formik.handleChange} className="form-control" />
          </dd>

          <dt>Title</dt>
          <dd>
            <input type="text" name="Title" onChange={formik.handleChange} className="form-control" />
          </dd>

          <dt>Content</dt>
          <dd>
            <textarea name="Content" onChange={formik.handleChange} className="form-control"></textarea>
          </dd>

          <dt>CourseId</dt>
          <dd>
            <input type="text" name="CourseId" onChange={formik.handleChange} className="form-control" />
          </dd>

          <dt>Order</dt>
          <dd>
            <input type="number" name="Order" onChange={formik.handleChange} className="form-control" />
          </dd>

          <button type="submit" className="btn btn-success mt-3 w-100">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
}
