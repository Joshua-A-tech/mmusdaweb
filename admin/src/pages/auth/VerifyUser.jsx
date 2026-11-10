import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { APIDomain } from "../../utils/APIDomain";
import { FiMail, FiCheckCircle, FiClock } from "react-icons/fi";
import "./VerifyUser.css";

export default function VerifyUser() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const qEmail = searchParams.get("email");
    if (qEmail && !email) setEmail(qEmail);
  }, [searchParams]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim() || !code.trim()) {
      return setError("Please provide both email and verification code.");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/verify`, {
        email: email.trim(),
        code: code.trim(),
      });
      setMessage(res.data.message || "Verification successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed. Check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    if (!email.trim()) return setError("Please enter your email to resend verification code.");

    setResending(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${APIDomain}/api/auth/resend-code`, {
        email: email.trim(),
      });
      setMessage(res.data.message || "A new code has been sent to your email.");
      setCooldown(60);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">VERIFY ACCOUNT</h1>
        <h2>Email Verification</h2>

        <p className="verify-instructions">
          A 6-digit verification code was sent to your email address. Codes expire in 15 minutes.
        </p>

        {error && <div className="message-banner error-banner">{error}</div>}
        {message && <div className="message-banner success-banner">{message}</div>}

        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label>Registered Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>6-Digit Verification Code</label>
            <input
              type="text"
              placeholder="e.g. 123456"
              maxLength="6"
              className="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Activate"}
          </button>

          <div className="resend-section">
            <button
              type="button"
              className="resend-btn"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : resending ? "Sending..." : "Resend Verification Code"}
            </button>
          </div>

          <div className="auth-links">
            <Link to="/login" className="link">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}