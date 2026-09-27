import { useEffect, useState } from "react";
import {
  getAllOfferings,
  deleteOffering
} from "../../Features/offering/offeringAPI";

import { FaTrash } from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "./Offering.css";

export default function Offering() {

  const [offerings, setOfferings] = useState([]);

  const loadOfferings = async () => {
    const data = await getAllOfferings();
    setOfferings(data);
  };

  useEffect(() => {
    loadOfferings();
  }, []);

  const handleDelete = async (id) => {
    await deleteOffering(id);
    loadOfferings();
  };

  // DOWNLOAD PDF
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text("Offerings Report", 14, 15);

    const tableData = offerings.map((item) => [
      item.phoneNumber,
      item.name,
      item.amount,
      item.purpose,
      new Date(item.createdAt).toLocaleDateString()
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["Phone Number", "Name", "Amount", "Purpose", "Date"]],
      body: tableData
    });

    doc.save("offerings.pdf");
  };

  return (
    <div className="offering-page">

      <div className="offering-header">
        <h2>Offerings</h2>

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          Download All
        </button>
      </div>

      <div className="table-container">
        <table className="offering-table">

          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Name</th>
              <th>Amount (KES)</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {offerings.map((item) => (

              <tr key={item.offeringId}>

                <td>{item.phoneNumber}</td>
                <td>{item.name}</td>
                <td style={{ fontWeight: 600, color: "var(--navy-900)" }}>{item.amount}</td>
                <td><span className="badge badge-gold">{item.purpose}</span></td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>

                  <button
                    className="delete-icon-btn"
                    onClick={() => handleDelete(item.offeringId)}
                    title="Delete record"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}