// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// // Sample data to be used in the bill
// const billItems = [
//   { product_id: "001", product_name: "Product 1", sell_price: 10, quantity: 2, total_price: 20 },
//   { product_id: "002", product_name: "Product 2", sell_price: 15, quantity: 1, total_price: 15 },
//   { product_id: "003", product_name: "Product 3", sell_price: 8, quantity: 5, total_price: 40 },
// ];

// const GenerateBillPDF = () => {

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(18);
//     doc.text('Bill', 105, 20, null, null, 'center');

//     // Add table headers
//     const headers = [["Product ID", "Product Name", "Sell Price", "Quantity", "Total Price"]];

//     // Add table rows from billItems
//     const rows = billItems.map(item => [
//       item.product_id,
//       item.product_name,
//       item.sell_price,
//       item.quantity,
//       item.total_price
//     ]);

//     // Add table to document
//     doc.autoTable({
//       head: headers,
//       body: rows,
//       startY: 30,
//       theme: 'grid',
//     });

//     // Add total amount
//     const totalAmount = billItems.reduce((acc, item) => acc + item.total_price, 0);
//     doc.setFontSize(14);
//     doc.text(`Total Amount: $${totalAmount}`, 14, doc.autoTable.previous.finalY + 10);

//     // Save the PDF
//     doc.save('bill.pdf');
//   };

//   return (
//     <div>
//       <h2>Generate Bill</h2>
//       <button onClick={generatePDF} className='btn btn-dark'>Download Bill as PDF</button>
//     </div>
//   );
// };

// export default GenerateBillPDF;




import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const billItems = [
  { product_id: "001", product_name: "Product 1", sell_price: 10, quantity: 2, total_price: 20 },
  { product_id: "002", product_name: "Product 2", sell_price: 15, quantity: 1, total_price: 15 },
  { product_id: "003", product_name: "Product 3", sell_price: 8, quantity: 5, total_price: 40 },
];

const GenerateBillPDF = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    generatePDF(false); // Generate PDF for preview on component load
  }, []);

  const generatePDF = (download = false) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Bill', 105, 20, null, null, 'center');

    // Add table headers and rows
    const headers = [["Product ID", "Product Name", "Sell Price", "Quantity", "Total Price"]];
    const rows = billItems.map(item => [
      item.product_id,
      item.product_name,
      item.sell_price,
      item.quantity,
      item.total_price,
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 30,
      theme: 'grid',
    });

    // Add total amount
    const totalAmount = billItems.reduce((acc, item) => acc + item.total_price, 0);
    doc.setFontSize(14);
    doc.text(`Total Amount: $${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);

    if (download) {
      doc.save('bill.pdf'); // Download the PDF
    } else {
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url); // Update state for preview
    }
  };

  const printPDF = () => {
    if (pdfUrl) {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.src = pdfUrl;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      };
    }
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      <button onClick={() => generatePDF(true)} className="btn btn-dark" style={{ marginRight: '10px' }}>
        Download Bill as PDF
      </button>
      <button onClick={printPDF} className="btn btn-dark">Print Bill</button>
      {pdfUrl && (
        <div style={{ height: '600px', marginTop: '20px' }}>
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default GenerateBillPDF;
