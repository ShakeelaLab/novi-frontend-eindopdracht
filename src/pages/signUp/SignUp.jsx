import './SignUp.css';
import {useForm} from "react-hook-form";
import axios from "axios";
import InputField
    from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {isValidPassword, isValidEmail} from "../../helpers/inputCheck.js"
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    async function handleFormSubmit(data) {

        try {
            const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users`,{
                email:data.email,
                password: data.password,
                roles:['user'],
            },{
                headers: {
                    'novi-education-project-id': 'fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8',
                }
            })
            console.log(response);
            navigate("/signin");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <form
                className="outer-container-register"
                onSubmit={handleSubmit(handleFormSubmit)}>
                <h1>Register</h1>
                <label
                    htmlFor="email">Email address</label>
                <InputField
                    type="text"
                    id="email-field"
                    {...register("email", {
                        required:"This field is required",
                        validate: (value) =>
                            isValidEmail(value) || "Please enter a valid email address",
                    })}
                />
                {errors.email &&
                    <p className="message">{errors.email.message}</p>}
                <label
                    htmlFor="password">Password</label>
                <InputField
                    type="password"
                    id="password-field"
                    {...register("password", {
                        required: "This field is required",
                        validate: (value) =>
                            isValidPassword(value) ||
                            "Password must contain 6 characters, one uppercase letter and one number",
                    })}
                />
                {errors.password &&
                    <p className="message">{errors.password.message}</p>}
                <Button
                    className="secondary-button"
                    type="submit"
                >
                    continue
                </Button>
            </form>
            <p>Once your account has been created, you’ll be redirected to the login page.</p>
        </>
    );
}

export default SignUp;