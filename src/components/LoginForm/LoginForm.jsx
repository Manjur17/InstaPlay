import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";


export default function LoginForm() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [errors, setErrors] = useState({ name: "", password: "" });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleValidation = (value, field) => {
        let errorMessage = "";

        if (field === "name") {
            if (value.trim() !== value) {
                errorMessage = "Username cannot start with spaces.";
            } else if (value.length < 3) {
                errorMessage = "Username must be at least 3 characters long.";
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                errorMessage = "Username can only contain letters, numbers, and underscores.";
            }
            setFormData({ ...formData, name: value });
            setErrors({ ...errors, name: errorMessage });
        }

        if (field === "password") {
            if (value.length < 8) {
                errorMessage = "Password must be at least 8 characters long.";
            } else if (!/[A-Z]/.test(value)) {
                errorMessage = "Password must have at least one uppercase letter.";
            } else if (!/[a-z]/.test(value)) {
                errorMessage = "Password must have at least one lowercase letter.";
            } else if (!/[0-9]/.test(value)) {
                errorMessage = "Password must have at least one number.";
            } else if (!/[!@#$%^&*]/.test(value)) {
                errorMessage = "Password must have at least one special character (!@#$%^&*).";
            }
            setFormData({ ...formData, password: value });
            setErrors({ ...errors, password: errorMessage });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!errors.name && !errors.password && formData.name && formData.password) {
            try {
                setIsSubmitting(true);
                const response = await fetch(
                    "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=019085ae8fd360fcd800ae1d44592de2",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            request_token: "13ba8a472d61e38aac8378a0fff22940e77831ad",
                            username: "deepakhegde",
                            password: "6318",
                        }),
                    }
                );

                const data = await response.json();
                console.log("Response:", data);
                if (data.success) {
                    toast.success("Login successful!", { autoClose: 2000 });
                    login("dummyToken");
                    navigate("/dashboard");

                } else {
                    toast.error("Login failed. Please check your credentials.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
                console.log(error);

            }
        } else {
            toast.error("Please fix the errors before submitting.");
        }

        setIsSubmitting(false);
    };

    const isButtonDisabled =
        isSubmitting ||
        !formData.name ||
        !formData.password ||
        errors.name ||
        errors.password;

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
                        <button className="login-button" type="submit"
                            disabled={isButtonDisabled}
                        >LOG IN</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
