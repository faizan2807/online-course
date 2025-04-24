import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:9090/all-Course")
      .then(res => {
        setArr(res.data);
      })
      .catch(err => {
        console.error("Error fetching course:", err);
      });
  }, []);

  function handleDeleteClick(CourseId) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`http://127.0.0.1:9090/delete-course/${CourseId}`)
        .then(() => {
          alert("Course deleted successfully.");
          setArr((prevArr) => prevArr.filter((item) => item.CourseId !== CourseId));
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
          alert("Failed to delete the course.");
        });
    }
  }


  function handleEditClick(item) {
    navigate('/edit', { state: { course: item } });
  }

  function handleLesson(CourseId) {
    navigate(`/course/${CourseId}/dashlesson`);
  }

  function handleAddClick() {
    navigate('/add')
  }

  return (
    <div className="container-fluid mt-4">
      <div className="m-3 p-3">
        <button className="btn btn-success bi bi-plus p-3 float-end " onClick={handleAddClick}>Add Course</button>
      </div>
      <h2 className="mb-4">All Courses</h2>

      <div className="row">
        {arr.map((item, index) => (
          <div className="col-md-4 mb-4" key={item.CourseId || index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.Title}</h5>
                <p className="card-text"><strong>CourseId:</strong> {item.CourseId}</p>
                <p className="card-text"><strong>Description:</strong> {item.Description}</p>
                <p className="card-text"><strong>Category:</strong> {item.Category}</p>
                <p className="card-text"><strong>Created By:</strong> {item.CreatedBy}</p>

                <button className="btn btn-info mx-2" onClick={() => handleEditClick(item)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(item.CourseId)}>Delete</button>
                <button className="btn btn-warning mx-2" onClick={() => handleLesson(item.CourseId)}>Lessons</button>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
