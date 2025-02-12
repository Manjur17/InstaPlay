import NavBar from "../../components/NavBar/NavBar"
import LoginForm from "../../components/LoginForm/LoginForm";

const SignInPage = () => {

    return (
        <div className="signin-container">
            <NavBar displaySearchBar={false} />
            <LoginForm />
        </div>
    )
}

export default SignInPage;