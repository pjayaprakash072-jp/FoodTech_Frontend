import { useState } from "react";
import { API_URI } from "./../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter email");
            return;
        }

        if (!password) {
            alert("Please enter password");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URI}/vendor/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.error ||
                    data.message ||
                    "Invalid email or password"
                );

                return;
            }


            // =====================================
            // LOGIN SUCCESS
            // =====================================

            setEmail("");
            setPassword("");


            // Store authentication information
            localStorage.setItem(
                "loginToken",
                data.token
            );

            localStorage.setItem(
                "vendorname",
                data.vendorname
            );


            // =====================================
            // IMPORTANT
            // =====================================
            // Don't select a restaurant during login.
            // The vendor will select one from Welcome.
            
            localStorage.removeItem(
                "Restaurantid"
            );


            console.log(
                "Login successful:",
                data
            );


            alert(
                "Vendor login successfully"
            );


            // Show Welcome page
            if (showWelcomeHandler) {
                showWelcomeHandler();
            }


            // Reload so the application recognizes
            // the logged-in vendor
            window.location.reload();


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="form-container">

            <h1 className="form-title">
                Vendor Login
            </h1>


            <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="form-group">

                    <label
                        className="form-label"
                        htmlFor="email"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        className="form-input"
                        name="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>


                {/* PASSWORD */}

                <div className="form-group">

                    <label
                        className="form-label"
                        htmlFor="password"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        className="form-input"
                        name="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>


                {/* SUBMIT */}

                <div className="button-container">

                    <button
                        type="submit"
                        className="form-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Submit"
                        }

                    </button>

                </div>

            </form>

        </div>
    );
};


export default Login;