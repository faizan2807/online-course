import axios from "axios"
import { useFormik } from "formik"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export function Editlesson() {
    const navigate = useNavigate();
    const location = useLocation();
    const lesson = location.state?.lesson;

    const formik = useFormik({
        enableReinitialize: true, 
        initialValues: {
          LessonId: lesson?.LessonId || '',
          Title: lesson?.Title || '',
          Content: lesson?.Content || '',
          CourseId: lesson?.CourseId || '',
          Order: lesson?.Order || ''
        },
        onSubmit: (values) => {
          axios.put(`http://127.0.0.1:9090/edit-lesson/${values.LessonId}`, values)
            .then(() => {
              alert("Lesson updated successfully");
              navigate(`/course/${values.CourseId}/dashlesson`);
            })
            .catch(err => {
              console.error("Error updating lesson:", err);
              alert("Failed to update lesson.");
            });
        }
      });
      

    useEffect(() => {
        if (lesson) {
            formik.setValues(lesson);
        }
    }, [lesson]);

    function handleReturn() {
        navigate(`/dashlesson/${formik.values.CourseId}`);
    }

    return (
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="border border-1 border-black p-4 w-50">
                <div><button className="btn btn-close float-end" onClick={handleReturn}></button></div>
                <h2>Edit Lesson</h2>
                <form onSubmit={formik.handleSubmit}>
                    <dt>LessonId</dt>
                    <dd>
                        <input type="text" name="LessonId" onChange={formik.handleChange} value={formik.values.LessonId} className="form-control" />
                    </dd>

                    <dt>Title</dt>
                    <dd>
                        <input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Title} className="form-control" />
                    </dd>

                    <dt>Content</dt>
                    <dd>
                        <textarea name="Content" onChange={formik.handleChange} value={formik.values.Content} className="form-control"></textarea>
                    </dd>

                    <dt>CourseId</dt>
                    <dd>
                        <input type="text" name="CourseId" onChange={formik.handleChange} value={formik.values.CourseId} className="form-control" />
                    </dd>

                    <dt>Order</dt>
                    <dd>
                        <input type="number" name="Order" onChange={formik.handleChange} value={formik.values.Order} className="form-control" />
                    </dd>

                    <button type="submit" className="btn btn-success mt-3 w-100">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
