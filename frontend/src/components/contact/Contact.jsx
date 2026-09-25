import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { createContact } from "../../Features/contacts/contactsAPI";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await createContact(form);
      if (res?.message || res) {
        setStatus("Thank you! Your message has been sent to church leadership.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section className="bg-white section-pad">
      <div className="container">
        <div className="contact-main-header">
          <span className="label">Contact & Connect</span>
          <h2 className="heading-1 contact-main-title">
            Get in Touch with Our<br />
            <em>MMUSDA Church</em>
          </h2>
          <p className="body-lg contact-main-sub">
            Whether you have a question, need counseling, or want to connect
            with our church family, we are here for you.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="contact-details-col">
            <div className="contact-info-blocks">
              <div className="info-block">
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="info-block-title">Campus Location</h4>
                  <p className="info-block-text">
                    Masinde Muliro University of Science and Technology (MMUST),
                    Main Campus, Kakamega, Kenya
                  </p>
                </div>
              </div>

              <div className="info-block">
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="info-block-title">Phone & WhatsApp</h4>
                  <p className="info-block-text">+254 705 214 338</p>
                </div>
              </div>

              <div className="info-block">
                <div className="info-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="info-block-title">Email Inquiries</h4>
                  <p className="info-block-text">Mmusdachurch1844@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-socials-box">
              <span className="socials-label">Connect Online</span>
              <div className="socials-icons-row">
                <a
                  href="https://m.facebook.com/@MasindeMuliroSDA/?wtsid=rdr_0aLQHB4isZ7jCnp0Q&hr=1"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://x.com/Mmusda_church?s=09"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.tiktok.com/@mmustsda?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://youtube.com/@mmustsdachurch?si=Mzu6ODG4WY-aMk9z"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Vb2VS6M5vKA9AQyoJD3P"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle"
                  aria-label="WhatsApp Channel"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="mailto:Mmusdachurch1844@gmail.com"
                  className="social-circle"
                  aria-label="Email Us"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="contact-form-card">
            <h3 className="contact-form-title">Send a Message</h3>
            <p className="contact-form-sub">
              Leave your details below and a church elder or departmental leader
              will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="contact-form-inner">
              <div className="form-double-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
              </div>

              <div className="form-double-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="field-input"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject / Department"
                  value={form.subject}
                  onChange={handleChange}
                  className="field-input"
                />
              </div>

              <textarea
                name="message"
                placeholder="How can we help or pray for you?..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input textarea"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary contact-send-btn"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={14} />
              </button>

              {status && (
                <div className="contact-status-box">
                  <CheckCircle2 size={16} />
                  <span>{status}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;