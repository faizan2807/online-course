import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"



export function Login(){


    const [cookie, setCookie, removecookie] = useCookies('userid')
let navigate = useNavigate();

const formik = useFormik({
    initialValues:{
        UserName:'',
        Password:''
    },
    onSubmit: (user)=>{
        axios.get(`http://127.0.0.1:9090/users`)
        .then(response=>{
            var client = response.data.find((item) => item.UserName === user.UserName)

            if(client) {
                if(client.Password===user.Password){
                    setCookie('userid', client.UserName); 
                    navigate('/dashboard');
                } else {
                   alert('Invalid Password');
                }
            }else{
                alert("user not found")
            }
        })
    }
})

    return(
        <div className="container-fluid d-flex justify-content-center mt-5">
            <form onSubmit={formik.handleSubmit} className="mt-5 p-3 w-25 border border-1 border-black">
                <h2 className="bi bi-person-fill">Login</h2>
                <dt>UserName</dt>
                <dd>
                    <input type="text" 
                    name="UserName"
                    className="form-control"
                    onChange={formik.handleChange}
                    />
                </dd>
                <dt>Password</dt>
                <dd>
                    <input type="text" 
                    name="Password"
                    className="form-control"
                    onChange={formik.handleChange}
                    />
                </dd>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                
            </form>
        </div>
    )
}