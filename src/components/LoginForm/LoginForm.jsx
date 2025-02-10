import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { validateField } from "../../utils/validateField";
import { loginRequest } from "../../apis/loginRequest";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [errors, setErrors] = useState({ name: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleValidation = (value, field) => {
        const errorMessage = validateField(value, field);
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!errors.name && !errors.password && formData.name && formData.password) {
            try {
                setIsSubmitting(true);

                const data = await loginRequest(formData.name, formData.password);

                if (data.success) {
                    toast.success("Login successful!", { autoClose: 2000 });
                    login("dummyToken");
                    navigate("/dashboard");
                } else {
                    toast.error("Login failed. Please check your credentials.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error("Please fix the errors before submitting.");
        }
    };

    const isButtonDisabled = isSubmitting || !formData.name || !formData.password || errors.name || errors.password;

    return (
        <div className="container">
            <div className="signin-box">
                <h2 className="title">Sign in</h2>
                <p className="subtitle">Sign in to your Self Service Portal</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                            className="input-field"
                            value={formData.name}
                            onChange={(e) => handleValidation(e.target.value, "name")}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleValidation(e.target.value, "password")}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <div className="input-group">
                        <button className="login-button" type="submit" disabled={isButtonDisabled}>
                            LOG IN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
