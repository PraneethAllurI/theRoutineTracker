import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DailyRoutineForm from './components/DailyRoutineForm';
import EntrySummaryTable from './components/EntrySummaryTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DailyRoutineForm />} />
        <Route path="/summary" element={<EntrySummaryTable />} />
      </Routes>
    </Router>
  );
}

export default App;
