import { useState } from "react"
import LoginForm from "./component/LoginForm"
import RegisterForm from "./component/RegisterForm"

// page state กำหนดว่าจะแสดงหน้าไหน
type Page = "login" | "register"

export default function App() {
  const [page, setPage] = useState<Page>("login") // เริ่มต้นที่หน้า Login

  return page === "login"
    ? <LoginForm  onGoRegister={() => setPage("register")} />
    : <RegisterForm onGoLogin={() => setPage("login")} />
}