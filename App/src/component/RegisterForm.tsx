import { useState } from "react"
import { Eye, EyeOff, Check, X } from "lucide-react"
import "./RegisterForm.css"

// Types 
type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

type FormErrors = {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: string
}

const INITIAL_FORM: FormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
}

const INITIAL_ERRORS: FormErrors = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: "",
}


const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter",       test: (p: string) => /[A-Z]/.test(p) },
  { label: "Number",                 test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

const getStrengthScore = (password: string): number =>
  PASSWORD_RULES.filter(r => r.test(password)).length

const getStrengthMeta = (score: number) => {
  if (score === 0) return { label: "",        mod: "" }
  if (score <= 1)  return { label: "Weak",    mod: "weak" }
  if (score === 2) return { label: "Fair",    mod: "fair" }
  if (score === 3) return { label: "Good",    mod: "good" }
  return             { label: "Strong",  mod: "strong" }
}

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

type Props = { onGoLogin?: () => void }

export default function RegisterForm({ onGoLogin }: Props) {

  const [formData, setFormData]         = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors]             = useState<FormErrors>(INITIAL_ERRORS)
  const [showPass, setShowPass]         = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [submitted, setSubmitted]       = useState(false) 

  const strengthScore = getStrengthScore(formData.password)
  const strengthMeta  = getStrengthMeta(strengthScore)

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (key !== "agreeTerms") {
      setErrors(prev => ({ ...prev, [key]: "" }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = { ...INITIAL_ERRORS }

    if (!formData.username.trim())
      newErrors.username = "Username is required"
    else if (formData.username.trim().length < 3)
      newErrors.username = "Username must be at least 3 characters"

    if (!formData.email.trim())
      newErrors.email = "Email is required"
    else if (!isValidEmail(formData.email))
      newErrors.email = "Please enter a valid email address"

    if (!formData.password)
      newErrors.password = "Password is required"
    else if (strengthScore < 3)
      newErrors.password = "Password is too weak"

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms"

    setErrors(newErrors)

    return Object.values(newErrors).every(e => e === "")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    console.log("Register:", formData)
    setSubmitted(true) 
  }

  if (submitted) {
    return (
      <div className="login-container">
        <div className="login-card register-success">
          <div className="success-icon">
            <Check size={28} strokeWidth={2.5} />
          </div>
          <h1 className="login-card__title" style={{ textAlign: "center" }}>
            Account created!
          </h1>
          <p className="login-card__sub" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Welcome aboard, <strong>{formData.username}</strong>. You can now sign in.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onGoLogin}
          >
            Go to Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-card__accent" />

        <h1 className="login-card__title">Create account</h1>
        <p className="login-card__sub">Fill in the details below to get started</p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={e => updateField("username", e.target.value)}
              placeholder="Choose a username"
            />
            {errors.username && <p className="field__error">{errors.username}</p>}
          </div>

          <div className="field">
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => updateField("email", e.target.value)}
                placeholder="you@example.com"
                />
               {errors.email && <p className="field__error">{errors.email}</p>}
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

            {formData.password && (
              <div className="strength">
                <div className="strength__bars">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`strength__bar ${strengthScore >= i ? `strength__bar--${strengthMeta.mod}` : ""}`}
                    />
                  ))}
                </div>
                {strengthMeta.label && (
                  <span className={`strength__label strength__label--${strengthMeta.mod}`}>
                    {strengthMeta.label}
                  </span>
                )}
              </div>
            )}

            {formData.password && (
              <ul className="password-rules">
                {PASSWORD_RULES.map(rule => {
                  const passed = rule.test(formData.password)
                  return (
                    <li key={rule.label} className={`password-rules__item ${passed ? "passed" : ""}`}>
                      {passed ? <Check size={11} /> : <X size={11} />}
                      {rule.label}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="field__wrap">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={e => updateField("confirmPassword", e.target.value)}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field__error">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="field" style={{ marginBottom: "1.5rem" }}>
            <label className="check-label">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={e => updateField("agreeTerms", e.target.checked)}
              />
              I agree to the{" "}
              <a href="#" className="inline-link">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="inline-link">Privacy Policy</a>
            </label>
            {errors.agreeTerms && (
              <p className="field__error">{errors.agreeTerms}</p>
            )}
          </div>

          <button type="submit" className="btn-primary">Create account</button>

          <p className="register-signin">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={onGoLogin}>
              Sign in
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}