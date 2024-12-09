// utils/pdfHelper.js
const PDFDocument = require('pdfkit');

// Helper function to handle PDF generation and download
const downloadPDF = (data, res, filename) => {
  const doc = new PDFDocument();

  // Set headers for the PDF response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);

  doc.pipe(res); // Pipe the PDF into the response stream

  // Add a title to the PDF
  doc.fontSize(20).text(`${filename} Report`, { align: 'center' });
  doc.moveDown(2);

  // Loop through the data and add it to the PDF
  data.forEach(item => {
    // You can customize the layout here, add columns, styles, etc.
    doc.fontSize(12).text(`Username: ${item.username}`);
    doc.text(`Email: ${item.email}`);
    doc.text(`Role: ${item.role}`);
    doc.text(`Status: ${item.status}`);
    doc.text(`Manager ID: ${item.manager_id}`);
    doc.text(`Total Points Earned: ${item.total_points_earned}`);
    doc.text('---');
    doc.moveDown();
  });

  // Finalize the PDF document
  doc.end();
};

module.exports = { downloadPDF };
