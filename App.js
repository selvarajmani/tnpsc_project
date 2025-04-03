import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: '',
    subject: '',
    topics: '',
    timeSpent: '',
    notes: '',
    confidence: '',
    nextPlan: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('tnpsc_journal');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tnpsc_journal', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.date || !form.subject) return;
    setEntries([form, ...entries]);
    setForm({ date: '', subject: '', topics: '', timeSpent: '', notes: '', confidence: '', nextPlan: '' });
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 font-sans">
      <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
        <h2 className="text-xl font-semibold">New Journal Entry</h2>
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date (YYYY-MM-DD)" className="w-full p-2 border rounded" />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full p-2 border rounded" />
        <input name="topics" value={form.topics} onChange={handleChange} placeholder="Topics Covered" className="w-full p-2 border rounded" />
        <input name="timeSpent" value={form.timeSpent} onChange={handleChange} placeholder="Time Spent (e.g., 2 hours)" className="w-full p-2 border rounded" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes or Summary" className="w-full p-2 border rounded" />
        <input name="confidence" value={form.confidence} onChange={handleChange} placeholder="Confidence Level (1-5)" className="w-full p-2 border rounded" />
        <textarea name="nextPlan" value={form.nextPlan} onChange={handleChange} placeholder="Next Day Plan" className="w-full p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save Entry</button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Previous Entries</h2>
        {entries.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow">
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Subject:</strong> {entry.subject}</p>
            <p><strong>Topics:</strong> {entry.topics}</p>
            <p><strong>Time Spent:</strong> {entry.timeSpent}</p>
            <p><strong>Notes:</strong> {entry.notes}</p>
            <p><strong>Confidence:</strong> {entry.confidence}</p>
            <p><strong>Next Plan:</strong> {entry.nextPlan}</p>
            <button onClick={() => handleDelete(index)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;