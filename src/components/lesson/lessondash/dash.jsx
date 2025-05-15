import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Dashlesson() {
  const { CourseId } = useParams();
  const [lessons, setLessons] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:9090/lesson")
      .then(res => {
        const filtered = res.data.filter(lesson => String(lesson.CourseId) === String(CourseId));
        console.log("All Lessons:", res.data);
        console.log("Filtered Lessons:", filtered);
        setLessons(filtered);
      })
      .catch(err => {
        console.error("Error fetching lessons:", err);
      });
  }, [CourseId]);

  const handleDelete = (LessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      axios.delete(`http://127.0.0.1:9090/Lesson-delete/${LessonId}`) 
        .then(() => {
          alert("Lesson deleted");
          setLessons(prev => prev.filter(lesson => lesson.LessonId !== LessonId));
        })
        .catch(err => {
          console.error("Error deleting lesson:", err);
          alert("Failed to delete lesson");
        });
    }
  };

  function handleAddClick(){
    navigate('/addlesson')
  }

  function handleBack(){
    navigate('/dashboard')
  }

  function handleEdit(lesson){
    navigate('/editlesson', { state: { lesson: lesson } });
  }

  return (
    <div className="container mt-4">
      <div>
        <button className="bi bi-arrow-left btn btn-light mb-5 w-25" onClick={handleBack}></button>
      </div>
      <div className="float-end">
        <button className="btn btn-success bi bi-plus p-3" onClick={handleAddClick}>Add Lesson</button>
      </div>
      <h2>Lessons for CourseId: {CourseId}</h2>
      <div className="row">
        {lessons.length > 0 ? (
          lessons.map(lesson => (
            <div className="col-md-4 mb-4" key={lesson.LessonId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{lesson.Title}</h5>
                  <p className="card-text"><strong>LessonId:</strong> {lesson.LessonId}</p>
                  <p className="card-text">
                    <strong>Content:</strong>{" "}
                    <a href={lesson.Content || lesson.content} target="_blank" rel="noopener noreferrer">
                      View Lesson
                    </a>
                  </p>
                  <p className="card-text"><strong>Order:</strong> {lesson.Order || lesson.order}</p>

                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(lesson.LessonId)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleEdit(lesson)}
                  >
                    Edit
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No lessons found for this course.</p>
        )}
      </div>
    </div>
  );
}
