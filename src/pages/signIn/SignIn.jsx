import './SignIn.css';
import {useForm} from 'react-hook-form';
import {useState} from "react";
import Button from "../../components/button/Button.jsx";
import {At} from "phosphor-react";
import InputField
    from "../../components/inputField/InputField.jsx";

function SignIn() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();
    // const [postSubmitted, setPostSubmitted] = useState(false);
    // const [loading, toggleLoading] = useState(false);
    // const [createdPostId, setCreatedPostId] = useState(null);

    return (
        <>
            <section>
                <form
                    className="outer-container"
                    // onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <div className="inner-container">
                        <section className="login-section">
                        <h1>Login</h1>
                        <label
                            htmlFor="email">Emailaddress</label>
                        <InputField
                            type="text"
                            id="email-field"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "You need to fill in an emailaddress",
                                },
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
                                required: {
                                    value: true,
                                    message: "You need to fill in a password",
                                },
                            })}
                        />
                            {errors.password &&
                                <p className="message">{errors.password.message}</p>}
                        <Button
                        className="sign-in-button"
                        type="submit"
                        >
                            continue
                        </Button>
                        </section>
                        <span className="divider"></span>
                        <section className="signup-section">
                            <p>No account?</p>
                            <p>Here you can make an account</p>
                            <Button
                                className="sign-in-button"
                                type="submit"
                            >
                                register
                            </Button>
                        </section>
                        {/*<Button type="submit"*/}
                        {/*        text="Toevoegen"*/}
                        {/*        className="new-post-button"*/}
                        {/*        loading={loading}/>*/}
                    </div>
                    {/*{postSubmitted &&*/}
                    {/*    <p>text <Link to={`/allposts/${createdPostId}`}>text</Link></p>}*/}
                </form>
            </section>
        </>
    );
}

export default SignIn;