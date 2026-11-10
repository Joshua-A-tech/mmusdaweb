import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { APIDomain } from "../../utils/APIDomain";
import { FiEye, FiEyeOff, FiCheck, FiX, FiInfo } from "react-icons/fi";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  const isPasswordValid = Object.values(checks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!fullName.trim()) return setError("Full name is required");
    if (!email.trim()) return setError("Email address is required");
    if (!isPasswordValid) return setError("Password does not meet all security requirements");
    if (password !== confirm) return setError("Passwords do not match");

    setLoading(true);

    try {
      const res = await axios.post(`${APIDomain}/api/auth/register`, {
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      setMessage(res.data.message || "Registration submitted! Check your email for verification code.");

      setTimeout(() => {
        navigate(`/auth/verify?email=${encodeURIComponent(email.trim())}`);
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <h1 className="panel-title">MMUSDA LEADERSHIP PORTAL</h1>
        <h2>Admin Registration</h2>

        <div className="register-notice">
          <FiInfo className="notice-icon" />
          <span>
            New registrations are verified by email and submitted to the Executive Committee for approval.
          </span>
        </div>

        {error && <div className="message-banner error-banner">{error}</div>}
        {message && <div className="message-banner success-banner">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Elder John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="leader@example.com"
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
                placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {password && (
              <div className="password-requirements">
                <span className={checks.length ? "met" : "unmet"}>
                  {checks.length ? <FiCheck /> : <FiX />} 8+ characters
                </span>
                <span className={checks.upper ? "met" : "unmet"}>
                  {checks.upper ? <FiCheck /> : <FiX />} Uppercase letter
                </span>
                <span className={checks.lower ? "met" : "unmet"}>
                  {checks.lower ? <FiCheck /> : <FiX />} Lowercase letter
                </span>
                <span className={checks.number ? "met" : "unmet"}>
                  {checks.number ? <FiCheck /> : <FiX />} Number
                </span>
                <span className={checks.special ? "met" : "unmet"}>
                  {checks.special ? <FiCheck /> : <FiX />} Symbol
                </span>
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex="-1"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="auth-links">
            <p>Already have an admin account?</p>
            <Link to="/login" className="link">
              Login here
            </Link>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Submitting Registration..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}