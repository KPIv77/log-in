import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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

    const updateField = <K extends keyof FormData> (
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        
        console.log("Submit:", formData)
    }

    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-card__title">Log in</h1>
                    <p className="login-card__sub">Sign in to continue</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={e => updateField("username", e.target.value)}
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className="field__error">{errors.username}</p>}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <div className="field__wrap">
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    value={formData.password}
                                    onChange={e => updateField("password", e.target.value)}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPass(v => !v)}>
                                    {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="field__error">{errors.password}</p>}
                        </div>



                    </form>


                </div>
            </div>
        </>
    )
};
