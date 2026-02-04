import './SignUp.css';
import {useForm} from "react-hook-form";
import axios from "axios";
import InputField
    from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";

function SignUp() {

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
                roles:['user'],
            },{
                headers: {
                    'novi-education-project-id': '',
                }
            })
            console.log(response);
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
                <Link to="/signin">
                <Button
                    className="secondary-button"
                    type="submit"
                >
                    continue
                </Button>
                </Link>
            </form>
        </>
    );
}

export default SignUp;