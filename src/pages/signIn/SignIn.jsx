import './SignIn.css';
import {useForm} from 'react-hook-form';
import {useState, useContext} from "react";
import Button from "../../components/button/Button.jsx";
import {At} from "phosphor-react";
import InputField
    from "../../components/inputField/InputField.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

function SignIn() {
    const { login } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    async function handleFormSubmit(data) {

        try {
            const response = await axios.post(``,{
                email:data.email,
                password: data.password,
            },{
                headers: {
                    'novi-education-project-id': '',
                }
            })
            console.log(response);
            login(response.data);
        } catch (e) {
            console.error(e);
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
                                required:"You need to fill in an emailaddress",
                            })}
                        />
                        {errors.email &&
                            <p className="message">{errors.email.message}</p>}
                        <label
                            htmlFor="password">Password</label>
                        <InputField
                            type="text"
                            id="password-field"
                            {...register("password", {
                                required: "You need to fill in a password",
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