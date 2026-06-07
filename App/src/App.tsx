import './App.css'

import { useState } from "react"

function App() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Username:", formData);
    }

    return (
        <>
            <div className="container">
                <div className="box">
                    <header>
                        <span>Login</span>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    username: e.target.value
                                })
                            } 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            } 
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>
                </div>

            </div>
        
            
        </>
  )
}

export default App
