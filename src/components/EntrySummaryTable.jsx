import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function EntrySummaryTable() {
  const [entries, setEntries] = useState({});
  const [show, setShow] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  
  useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("gutTrackerEntries")) || {};
      setEntries(stored);
      console.log(stored);
  }, []);

  const getWeekNumber = (dateStr) => {
    const parseCustomDate = (str) => {
      const [day, monthName, year] = str.split(" - ");
      return new Date(`${monthName} ${day}, ${year}`);
    };
  
    const start = new Date("2025-04-02");
    const current = parseCustomDate(dateStr);
  
    const diffInDays = Math.floor((current - start) / (1000 * 60 * 60 * 24));
    return Math.floor(diffInDays / 7) + 0;
  };
  

  const handleView = (date) => {
    setSelectedEntry(entries[date]);
    setSelectedDate(date);
    setShow(true);
  };

  const handleDelete = (date) => {
    const confirm = window.confirm(
      `Are you sure you want to delete the entry for ${date}?`
    );
    if (!confirm) return;

    const updated = { ...entries };
    delete updated[date];
    localStorage.setItem("gutTrackerEntries", JSON.stringify(updated));
    setEntries(updated);
  };

  const handleEdit = (date) => {
    localStorage.setItem("editDate", date);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: scroll to form
    alert(`Editing mode activated for ${date}`);
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Saved Entries</h4>
      {Object.keys(entries).length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
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
                <td>
                  {entries[date].notes
                    ? entries[date].notes.slice(0, 40) + "..."
                    : "No notes"}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleView(date)}
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleEdit(date)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(date)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Entry Details – {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry && (
            <div>
              {Object.entries(selectedEntry).map(([key, value], idx) => (
                <div key={idx} className="mb-2">
                  <strong>{key}</strong>:{" "}
                  {typeof value === "boolean"
                    ? value
                      ? "✅ Yes"
                      : "❌ No"
                    : typeof value === "object"
                    ? JSON.stringify(value)
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
    </div>
  );
}

export default EntrySummaryTable;
