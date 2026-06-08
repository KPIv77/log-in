import { useState } from "react"
import "./LoginForm.css"

// Set type
type FormData = {
  username: string
  password: string
  rememberMe: boolean
}

const INITIAL_FORM: FormData = {
  username: "",
  password: "",
  rememberMe: false,
}

export default function LoginForm() {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

    const [showPass, setShowPass] = useState(false);

    const [errors, setErrors] = useState({ username: "", password: "" });

    const updateForm = <K extends keyof FormData> (
        key: K,
        value: FormData[K]
    ) => {
        setFormData(prev => ({ ...prev, [key]: value }))
        if (key !== "rememberMe") setErrors(e => ({ ...e, [key]: ""}))
    }

    const validate = (): boolean => {
        const newErrors = { 
            username: formData.username.trim() ? "" : "Username is required", 
            password: formData.password.trim() ? "" : "Password is required"
        }
        
        setErrors(newErrors)
        return !newErrors.username && !newErrors.password
    } 

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        
        console.log("Submit:", formData)
    }

    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-card__title">Login</h1>

                </div>
            </div>
        </>
    )
};
