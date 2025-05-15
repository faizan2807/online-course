var express = require("express");
var cors = require("cors");
const mongoClient = require("mongodb").MongoClient;

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


var conString = "mongodb://127.0.0.1:27017";

// Get All Users
app.get("/users", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("Courseapp");
    database.collection("user").find({}).toArray().then((documents) => {
      res.send(documents);
      console.log("Users rescived");
    });
  });
});

// Register User
app.post("/register-user", (req, res) => {
  var user = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
  };

  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("Courseapp");
    database.collection("user").insertOne(user).then(() => {
      console.log("User Registered");
      res.end();
    });
  });
});

// Get All Courses
app.get("/all-Course", (req, res) => {
  mongoClient.connect(conString)
    .then(clientObj => {
      var database = clientObj.db("Courseapp");
      database.collection("course").find({}).toArray()
        .then(documents => res.send(documents));
    })
    .catch(err => res.status(500).send({ error: "Failed to fetch users" }));
});

app.get("/course/:CourseId", (req, res) => {
  mongoClient.connect(conString).then(clientObj => {
    const database = clientObj.db("Courseapp");
    database.collection("course").findOne({ CourseId: req.params.CourseId })
      .then(course => {
        if (course) res.send(course);
        else res.status(404).send({ error: "Course not found" });
      });
  });
});


app.post("/add-course", (req, res) => {
  const course = {
    CourseId: req.body.CourseId,
    Title: req.body.Title,
    Description: req.body.Description,
    Category: req.body.Category,
    CreatedBy: req.body.CreatedBy   
  };

  mongoClient.connect(conString)
    .then(clientObj => {
      var database = clientObj.db("Courseapp");
      return database.collection("course").insertOne(course);
    })
    .then(() => res.send({ message: "Course added successfully" }))
    .catch(err => {
      console.error("Insert Error:", err);
      res.status(500).send({ error: "Error adding course" });
    });
});



// Edit Course
app.put("/edit-course/:CourseId", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    const database = clientObj.db("Courseapp");

    database.collection("course").updateOne(
      { CourseId: req.params.CourseId }, // matching CourseId from the URL
      {
        $set: {
          Title: req.body.Title,
          Description: req.body.Description,
          Category: req.body.Category,
          CreatedBy: req.body.CreatedBy 
        }
      }
    ).then((result) => {
      if (result.matchedCount === 0) {
        console.warn("No course found with CourseId:", req.params.CourseId);
        res.status(404).send({ error: "Course not found" });
      } else {
        console.log("Course updated");
        res.sendStatus(200);
      }
    }).catch(err => {
      console.error("Update failed:", err);
      res.sendStatus(500);
    });
  });
});


app.delete("/delete-course/:CourseId", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("Courseapp");
    database.collection("course").deleteOne({ CourseId: req.params.CourseId })
      .then(() => {
        console.log("Course deleted");
        res.sendStatus(200);
      }).catch(err => {
        console.error("Delete error:", err);
        res.sendStatus(500);
      });
  });
});


// Get Lessons
app.get("/lesson", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("Courseapp");
    database.collection("lesson").find({}).toArray().then((documents) => {
      res.send(documents);
    });
  });
});

// Add Lesson
app.post("/add-lesson", (req, res) => {
  var lesson = {
    LessonId: req.body.LessonId,
    Title: req.body.Title,
    Content: req.body.Content,
    CourseId: req.body.CourseId,
    Order: req.body.Order,
  };

  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("Courseapp");
    database.collection("lesson").insertOne(lesson).then(() => {
      console.log("Lesson added");
      res.end();
    });
  });
});

// Edit Lesson
app.put("/edit-lesson/:LessonId", (req, res) => {
  mongoClient.connect(conString)
    .then((clientObj) => {
      const db = clientObj.db("Courseapp");
      return db.collection("lesson").updateOne(
        { LessonId: req.params.LessonId },
        {
          $set: {
            Title: req.body.Title,
            Content: req.body.Content,
            CourseId: req.body.CourseId,
            Order: req.body.Order
          }
        }
      );
    })
    .then(() => {
      console.log("Lesson updated");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.sendStatus(500);
    });
});

// Delete Lesson
app.delete("/Lesson-delete/:LessonId", (req, res) => {
  mongoClient.connect(conString)
    .then(clientObj => {
      const database = clientObj.db("Courseapp");
      return database.collection("lesson").deleteOne({ LessonId: req.params.LessonId });
    })
    .then(result => {
      if (result.deletedCount === 1) {
        console.log("Lesson deleted");
        res.status(200).send("Lesson deleted successfully");
      } else {
        res.status(404).send("Lesson not found");
      }
    })
    .catch(error => {
      console.error("Error deleting lesson:", error);
      res.status(500).send("Internal server error");
    });
});

app.listen(9090, () => console.log("Server started at http://127.0.0.1:9090"));
