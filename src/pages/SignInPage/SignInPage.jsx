import NavBar from "../../components/NavBar/NavBar"
import LoginForm from "../../components/LoginForm/LoginForm";
import "./SignInPage.css";

const SignInPage = () => {

    return (
        <div className="signin-container">
            <NavBar displaySearchBar={false} />

            <div className="form-container">
                <LoginForm />
            </div>
        </div>
    )
}

export default SignInPage;