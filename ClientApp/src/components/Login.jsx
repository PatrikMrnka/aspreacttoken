import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext, LOGIN } from "../providers/Provider";

const Login = () => {
    const [store, dispatch] = useAppContext();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post("https://localhost:44414/api/Auth/login?username=" + data.username + "&password=" + data.password,
            {
                header: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                dispatch({ type: "SET_ACCESS_TOKEN", payload: { accessToken: response.data.value } })
            });
    }
    return (
        <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" {...register("username", { required: true })} />
                {errors.username && <span>This field is required</span>}
                <input type="text" placeholder="Password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
        <div>
            <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </div>
        </>
    )
}

export default Login;