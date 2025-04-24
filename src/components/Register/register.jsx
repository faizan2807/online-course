import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: '',
      UserName: '',
      Email: '',
      Password: ''
    },
    validationSchema: Yup.object({
      UserId: Yup.string().required("UserId is required"),
      UserName: Yup.string().required("UserName is required"),
      Email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a valid @gmail.com address")
        .required("Email is required"),
      Password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .max(15, "Password must be at most 15 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("Password is required")
    }),
    onSubmit: (user) => {
      axios.post(`http://127.0.0.1:9090/register-user`, user)
        .then(() => {
          alert("Registered Successfully");
          navigate('/login');
        })
        .catch((err) => {
          console.error(err);
          alert("Registration failed.");
        });
    }
  });

  return (
    <div className="container-fluid d-flex justify-content-center mt-5 p-5">
      <form onSubmit={formik.handleSubmit} className="p-3 mt-4 w-25 border border-1 border-black">
        <h2>Register</h2>

        <dt>UserId</dt>
        <dd>
          <input
            type="text"
            className="form-control"
            name="UserId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.UserId && formik.errors.UserId && (
            <span className="text-danger">{formik.errors.UserId}</span>
          )}
        </dd>

        <dt>UserName</dt>
        <dd>
          <input
            type="text"
            className="form-control"
            name="UserName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.UserName && formik.errors.UserName && (
            <span className="text-danger">{formik.errors.UserName}</span>
          )}
        </dd>

        <dt>Email</dt>
        <dd>
          <input
            type="text"
            className="form-control"
            name="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Email && formik.errors.Email && (
            <span className="text-danger">{formik.errors.Email}</span>
          )}
        </dd>

        <dt>Password</dt>
        <dd>
          <input
            type="password"
            className="form-control"
            name="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Password && formik.errors.Password && (
            <span className="text-danger">{formik.errors.Password}</span>
          )}
        </dd>

        <button className="btn btn-warning w-100">Register</button>
        <div className="mt-3">
          <Link to="/login">Have account?</Link>
        </div>
      </form>
    </div>
  );
}
