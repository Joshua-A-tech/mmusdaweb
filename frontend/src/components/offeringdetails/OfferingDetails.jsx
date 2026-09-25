import React, { useEffect, useState } from "react";
import { getAllOfferingDetails } from "../../Features/offeringdetails/offeringDetailsAPI";
import { motion } from "framer-motion";
import { CreditCard, Phone } from "lucide-react";
import "./OfferingDetails.css";

const OfferingDetails = () => {
  const [offerings, setOfferings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await getAllOfferingDetails();
        setOfferings(data);
      } catch {
        setError("Failed to fetch offerings.");
      }
    };
    fetchOfferings();
  }, []);

  return (
    <div className="details-wrapper">
      <h3 className="details-title">Payment Methods</h3>
      {error && <p className="error">{error}</p>}
      <div className="offering-list">
        {offerings.map((offering) => (
          <motion.div 
            key={offering.id} 
            className="detail-item"
            whileHover={{ x: 8 }}
          >
            <div className="detail-icon"><CreditCard size={18} /></div>
            <div className="detail-info">
              <span className="name-text">{offering.name}</span>
              <span className="phone-text">{offering.phoneNumber}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OfferingDetails;