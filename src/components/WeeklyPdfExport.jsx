import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatDate = (date) => new Date(date).toISOString().split("T")[0];

function WeeklyPdfExport() {
  const stored = JSON.parse(localStorage.getItem('gutTrackerEntries')) || {};

  const getWeekNumber = (dateStr) => {
    const start = new Date("2025-04-02");
    const current = new Date(dateStr);
    const diff = Math.floor((current - start) / (1000 * 60 * 60 * 24));
    return Math.floor(diff / 7) + 1;
  };

  const groupEntriesByWeek = () => {
    const weeks = {};
    Object.keys(stored).forEach((date) => {
      const weekNum = getWeekNumber(date);
      if (!weeks[weekNum]) weeks[weekNum] = [];
      weeks[weekNum].push({ date, ...stored[date] });
    });
    return weeks;
  };

  const generatePDF = (all = false) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Gut Health Tracker – Praneeth Kumar", 10, 10);

    const weekGroups = groupEntriesByWeek();
    const weekNums = all ? Object.keys(weekGroups) : [getWeekNumber(new Date().toISOString())];

    let y = 20;

    weekNums.forEach((weekNum, idx) => {
      const entries = weekGroups[weekNum];
      if (!entries) return;

      doc.setFontSize(13);
      doc.text(`Week ${weekNum}`, 10, y);
      y += 10;

      entries.forEach((entry, i) => {
        doc.setFontSize(12);
        doc.text(`${i + 1}. Entry Date: ${entry.date}`, 10, y);
        y += 6;

        // DAILY ROUTINE TABLE
        const routineData = Object.entries(entry)
          .filter(([key]) => key !== 'supplements' && key !== 'date')
          .map(([k, v]) => {
            const val = typeof v === 'boolean' ? (v ? 'Yes' : 'No') : v;
            return [k, val];
          });

        autoTable(doc, {
          startY: y,
          head: [['Daily Routine', 'Value']],
          body: routineData,
          styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
          headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
          margin: { left: 10, right: 10 },
        });

        y = doc.lastAutoTable.finalY + 6;

        // SUPPLEMENTS TABLE
        const supplements = entry.supplements || {};
        const supplementData = Object.entries(supplements).map(([supp, taken]) => [
          supp,
          taken ? 'Yes' : 'No',
        ]);

        if (supplementData.length > 0) {
          doc.setFontSize(11);
          doc.text('Supplements Taken:', 10, y);
          y += 4;

          autoTable(doc, {
            startY: y,
            head: [['Supplement', 'Taken']],
            body: supplementData,
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [255, 235, 205], textColor: 0 },
            margin: { left: 10, right: 10 },
          });

          y = doc.lastAutoTable.finalY + 12;
        } else {
          y += 6;
        }

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      });

      y += 6;
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(all ? "gut-tracker-all-weeks.pdf" : "gut-tracker-week.pdf");
  };

  return (
    <div className="mb-4">
      <button className="btn btn-primary me-3" onClick={() => generatePDF(false)}>
        Export Current Week (Grid Style)
      </button>
      <button className="btn btn-dark" onClick={() => generatePDF(true)}>
        Export All Weeks
      </button>
    </div>
  );
}

export default WeeklyPdfExport;