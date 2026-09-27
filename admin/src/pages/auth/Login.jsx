import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { APIDomain } from "../../utils/APIDomain";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      return setMessage("Please fill in all fields to Login");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      if (res.data.fullName) localStorage.setItem("adminName", res.data.fullName);
      if (res.data.email) localStorage.setItem("adminEmail", res.data.email);
      navigate("/admin/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">WELCOME TO MMUSDA ADMIN PANEL</h1>
        <h2>Login</h2>

        {message && <div className="message-banner">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FiEyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <FiEye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Forgot your password? <Link to="/forgot-password">Click here</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p><Link to="/">Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}