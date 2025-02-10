export const validateField = (value, field) => {
    let errorMessage = "";

    if (field === "name") {
        if (value.trim() !== value) {
            errorMessage = "Username cannot start with spaces.";
        } else if (value.length < 3) {
            errorMessage = "Username must be at least 3 characters long.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            errorMessage = "Username can only contain letters, numbers, and underscores.";
        }
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
    }

    return errorMessage;
};
