import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import WeeklyPdfExport from "./WeeklyPdfExport";
import { Link } from "react-router-dom";
import 'animate.css';

function EntrySummaryTable() {
  const [entries, setEntries] = useState({});
  const [show, setShow] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gutTrackerEntries")) || {};
    setEntries(stored);
  }, []);

  const getWeekNumber = (dateStr) => {
    const parseCustomDate = (str) => {
      const [day, monthName, year] = str.split(" - ");
      return new Date(`${monthName} ${day}, ${year}`);
    };

    const start = new Date("2025-04-02");
    const current = parseCustomDate(dateStr);
    const diffInDays = Math.floor((current - start) / (1000 * 60 * 60 * 24));
    return Math.floor(diffInDays / 7) + 1;
  };

  const handleView = (date) => {
    setSelectedEntry(entries[date]);
    setSelectedDate(date);
    setShow(true);
  };

  const handleDelete = (date) => {
    const confirm = window.confirm(`Are you sure you want to delete the entry for ${date}?`);
    if (!confirm) return;
    const updated = { ...entries };
    delete updated[date];
    localStorage.setItem("gutTrackerEntries", JSON.stringify(updated));
    setEntries(updated);
  };

  const handleEdit = (date) => {
    localStorage.setItem("editDate", date);
    window.scrollTo({ top: 0, behavior: "smooth" });
    alert(`Editing mode activated for ${date}`);
  };

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary mb-0">Saved Entries</h3>
        <Link to="/" className="btn btn-outline-secondary btn-sm">← Back to Tracker</Link>
      </div>

      <div className="card shadow-sm p-4 mb-4 bg-white rounded">
        {Object.keys(entries).length === 0 ? (
          <p className="text-muted">No entries yet. Start tracking your day!</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Week</th>
                  <th>Summary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(entries).map((date, idx) => (
                  <tr key={idx}>
                    <td>{date}</td>
                    <td>Week {getWeekNumber(date)}</td>
                    <td className="text-muted">
                      {entries[date].notes
                        ? entries[date].notes.slice(0, 40) + "..."
                        : "No notes"}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2 mb-1"
                        onClick={() => handleView(date)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2 mb-1"
                        onClick={() => handleEdit(date)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mb-1"
                        onClick={() => handleDelete(date)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Entry Details – {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry && (
            <div>
              {Object.entries(selectedEntry).map(([key, value], idx) => (
                <div key={idx} className="mb-2">
                  <strong className="text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</strong>:{" "}
                  {typeof value === "boolean"
                    ? value ? "✅ Yes" : "❌ No"
                    : typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value}
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <WeeklyPdfExport />
      </div>
    </div>
  );
}

export default EntrySummaryTable;
