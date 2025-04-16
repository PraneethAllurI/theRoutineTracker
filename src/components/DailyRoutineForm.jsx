import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";

const DailyRoutineForm = () => {
  const [entryData, setEntryData] = useState({});
  const [editDate, setEditDate] = useState(null);
  const supplementList = [
    "Licorice Tea",
    "Digestive Enzymes",
    "Megnisium",
    "Gastro Comfort",
    "Liver Detox",
    "Oregano Oil",
    "L-Glutamine",
    "Peppermint oil",
    "Folivate Active",
    "Vitamin D3",
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gutTrackerEntries")) || {};
    const editKey = localStorage.getItem("editDate");
    if (editKey && stored[editKey]) {
      setEntryData(stored[editKey]);
      setEditDate(editKey);
      localStorage.removeItem("editDate"); // Clear flag once loaded
    } else {
      setEntryData({
        palmsRub: false,
        oilPulling: false,
        gargling: false,
        lukewarmWater: false,
        breathing: false,
        sunlight: false,
        breakfast: "",
        tea: false,
        preLunchBreathing: false,
        lunch: "",
        postLunchWalk: false,
        muscleRelaxPostLunch: false,
        snacks: "",
        dinner: "",
        muscleRelaxPostDinner: false,
        pruneJuice: false,
        supplements: {},
        notes: "",
        yogaAsanas: {
          earlyMorning: { done: "", notes: "" },
          postBreakfast: { done: "", notes: "" },
          postLunch: { done: "", notes: "" },
          postDinner: { done: "", notes: "" },
        },
        poop: {
          time: "",
          consistency: "",
          type: "",
          notes: "",
        },
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    // Detect if it's a supplement checkbox
    if (supplementList.includes(name)) {
      setEntryData((prev) => ({
        ...prev,
        supplements: {
          ...prev.supplements,
          [name]: checked,
        },
      }));
    } else {
      setEntryData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getFormattedDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} - ${month} - ${year}`;
    };

    const dateKey = editDate || getFormattedDate();
    const stored = JSON.parse(localStorage.getItem("gutTrackerEntries")) || {};

    stored[dateKey] = entryData;
    localStorage.setItem("gutTrackerEntries", JSON.stringify(stored));

    alert(
      editDate ? "Entry updated successfully!" : "Entry saved successfully!"
    );
    setEditDate(null);
    window.location.reload();
  };

  return (
    <>
      <div className="mb-4 "></div>

      <div className="container my-5">
        <div
          className="p-4 rounded shadow-lg"
          style={{ background: "rgba(255, 255, 255, 0.9)" }}
        >
          <div className="d-flex justify-content-around align-items-center mb-4">
            <Link to="/summary" className="btn btn-outline-info">
              View Entry Summary
            </Link>
            <h3 className="text-primary animate__animated animate__fadeInDown m-0">
              {editDate
                ? `Editing Entry – ${editDate}`
                : "Daily Routine – New Entry"}
            </h3>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="p-3 bg-white rounded shadow-sm"
          >
            <Accordion defaultActiveKey="0" flush>
              {/* 🌞 Morning Routine */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>🌞 Morning Routine</Accordion.Header>
                <Accordion.Body>
                  <Form.Check
                    label="7:00 AM – Rub Palms"
                    name="palmsRub"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="7:15 AM – Coconut Oil Pulling"
                    name="oilPulling"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="7:30 AM – Gargling with Rock Salt"
                    name="gargling"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="8:00 AM – Drink Lukewarm Water"
                    name="lukewarmWater"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="8:15 AM – Breathing Routine"
                    name="breathing"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="8:30 AM – Sunlight + Walk + Basic Exercise"
                    name="sunlight"
                    type="checkbox"
                    onChange={handleChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              {/* 🍽️ Meals */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>🍽️ Meals</Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <Form.Label>9:00 AM – Breakfast</Form.Label>
                    <Form.Control
                      type="text"
                      name="breakfast"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Check
                    label="11:00 AM – Licorice Tea / Pomegranate"
                    name="tea"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="Before Lunch – Breathing Exercise"
                    name="preLunchBreathing"
                    type="checkbox"
                    onChange={handleChange}
                  />

                  <Form.Group>
                    <Form.Label>1:00 PM – Lunch</Form.Label>
                    <Form.Control
                      type="text"
                      name="lunch"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Check
                    label="Post Lunch Walk (15 mins)"
                    name="postLunchWalk"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="2:30 PM – Muscle Relaxation Exercises"
                    name="muscleRelax1"
                    type="checkbox"
                    onChange={handleChange}
                  />

                  <Form.Group>
                    <Form.Label>4:00 PM – Snacks</Form.Label>
                    <Form.Control
                      type="text"
                      name="snacks"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>7:30 PM – Dinner</Form.Label>
                    <Form.Control
                      type="text"
                      name="dinner"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Check
                    label="8:30 PM – Muscle Relaxation Exercises"
                    name="muscleRelax2"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <Form.Check
                    label="12:00 AM – Prune Juice + Lukewarm Water"
                    name="pruneJuice"
                    type="checkbox"
                    onChange={handleChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              {/* 💊 Supplements */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>💊 Supplements</Accordion.Header>
                <Accordion.Body>
                  {supplementList.map((label, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={label}
                      name={label}
                      onChange={handleChange}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* 📝 Notes */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>📝 Notes / Body Response</Accordion.Header>
                <Accordion.Body>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    onChange={handleChange}
                  />
                </Accordion.Body>
              </Accordion.Item>
              {/* 🧘 Yoga Asanas */}
              <Accordion.Item eventKey="4">
                <Accordion.Header>🧘 Yoga Asanas</Accordion.Header>
                <Accordion.Body>
                  {[
                    { label: "Early Morning", key: "earlyMorning" },
                    { label: "Post Breakfast", key: "postBreakfast" },
                    { label: "Post Lunch", key: "postLunch" },
                    { label: "Post Dinner", key: "postDinner" },
                  ].map(({ label, key }) => (
                    <div key={key} className="mb-4">
                      <Form.Label>
                        <strong>{label}</strong>
                      </Form.Label>
                      <div className="mb-2">
                        <Form.Check
                          inline
                          label="Yes"
                          name={`yoga-${key}`}
                          type="radio"
                          value="yes"
                          checked={entryData?.yogaAsanas?.[key]?.done === "yes"}
                          onChange={(e) =>
                            setEntryData((prev) => ({
                              ...prev,
                              yogaAsanas: {
                                ...prev.yogaAsanas,
                                [key]: {
                                  ...(prev.yogaAsanas?.[key] || {}),
                                  done: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                        <Form.Check
                          inline
                          label="No"
                          name={`yoga-${key}`}
                          type="radio"
                          value="no"
                          checked={entryData?.yogaAsanas?.[key]?.done === "no"}
                          onChange={(e) =>
                            setEntryData((prev) => ({
                              ...prev,
                              yogaAsanas: {
                                ...prev.yogaAsanas,
                                [key]: {
                                  ...(prev.yogaAsanas?.[key] || {}),
                                  done: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                      {entryData?.yogaAsanas?.[key]?.done === "yes" && (
                        <Form.Control
                          placeholder={`What yoga asanas did you do in ${label.toLowerCase()}?`}
                          value={entryData?.yogaAsanas?.[key]?.notes || ""}
                          onChange={(e) =>
                            setEntryData((prev) => ({
                              ...prev,
                              yogaAsanas: {
                                ...prev.yogaAsanas,
                                [key]: {
                                  ...(prev.yogaAsanas?.[key] || {}),
                                  notes: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      )}
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              {/* 💩 Bowel Movement */}
              <Accordion.Item eventKey="5">
                <Accordion.Header>💩 Bowel Movement</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., 7:00 AM"
                      name="poopTime"
                      value={entryData?.poop?.time || ""}
                      onChange={(e) =>
                        setEntryData((prev) => ({
                          ...prev,
                          poop: {
                            ...prev.poop,
                            time: e.target.value,
                          },
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Consistency</Form.Label>
                    <Form.Select
                      name="poopConsistency"
                      value={entryData?.poop?.consistency || ""}
                      onChange={(e) =>
                        setEntryData((prev) => ({
                          ...prev,
                          poop: {
                            ...prev.poop,
                            consistency: e.target.value,
                          },
                        }))
                      }
                    >
                      <option value="">-- Select Consistency --</option>
                      <option value="Hard">Hard</option>
                      <option value="Smooth">Smooth</option>
                      <option value="Loose">Loose</option>
                      <option value="Watery">Watery</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Type 4"
                      name="poopType"
                      value={entryData?.poop?.type || ""}
                      onChange={(e) =>
                        setEntryData((prev) => ({
                          ...prev,
                          poop: {
                            ...prev.poop,
                            type: e.target.value,
                          },
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Any additional observations?"
                      name="poopNotes"
                      value={entryData?.poop?.notes || ""}
                      onChange={(e) =>
                        setEntryData((prev) => ({
                          ...prev,
                          poop: {
                            ...prev.poop,
                            notes: e.target.value,
                          },
                        }))
                      }
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* ✅ Submit Button */}
            <div className="text-end mt-3">
              <Button variant="primary" type="submit">
                Submit Entry
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default DailyRoutineForm;
