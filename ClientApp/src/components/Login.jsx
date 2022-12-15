import { useForm } from "react-hook-form";
import { useAppContext, LOGIN } from "../providers/Provider";

const Login = () => {
    const [store, dispatch] = useAppContext();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        dispatch({ type: LOGIN, payload: data })
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