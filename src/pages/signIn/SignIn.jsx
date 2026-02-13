import './SignIn.css';
import {useForm} from 'react-hook-form';
import {useState, useContext} from "react";
import Button from "../../components/button/Button.jsx";
import InputField
    from "../../components/inputField/InputField.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {isValidPassword, isValidEmail} from "../../helpers/inputCheck.js"
import {Link} from "react-router-dom";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    async function handleFormSubmit(data) {

        try {
            const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/login`,{
                email:data.email,
                password: data.password,
            },{
                headers: {
                    'novi-education-project-id': 'fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8',
                }
            })
            console.log(response);
            login(response.data);
        } catch (e) {
            console.error(e);
            setLoginError("Email or password is incorrect");
        }
    }

    return (
        <>
            <section>
                <form
                    className="outer-container"
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <div className="inner-container">
                        <section className="login-section">
                        <h1>Login</h1>
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
                            <p className="login-error">{loginError}</p>
                        </section>
                        <span className="divider"></span>
                        <section className="signup-section">
                            <p>No account?</p>
                            <p>Here you can make an account</p>
                                <Link to="/signup">
                                    <Button
                                        className="secondary-button"
                                        type="submit"
                                    >
                                    Register
                                    </Button>
                                </Link>
                        </section>
                    </div>
                </form>
            </section>
        </>
    );
}

export default SignIn;