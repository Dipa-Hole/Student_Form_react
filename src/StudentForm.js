import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    campus: '',
    module: '',
    startDate: '',
    endDate: '',
    culturalGrowth: '',
    englishLevel: '',
    daysSpent: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const campuses = ["Amravati", "Bangalore", "Sarjapur", "Kisan jang", "Jashpur", "Dantewada", "Raipur", "Udaipur"];
  const modules = ["Module0", "Module1", "Module2A", "Module2B", "Module3", "Module4", "Module5A", "Module5B", "Module6A", "Module6B"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === 'startDate' || name === 'endDate') {
      const { startDate, endDate } = newFormData;
      if (startDate && endDate) {
        const daysSpent = calculateDaysSpent(startDate, endDate);
        newFormData.daysSpent = daysSpent;
      } else {
        newFormData.daysSpent = '';
      }
    }

    setFormData(newFormData);
  };

  const calculateDaysSpent = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff + 1;  // Include both start and end dates
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // Log form data
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzJAs0xj4JvqtH8IRK8dzhXKfmgq5l5gO9UwZWd9ryrpLYd7IxFY2ZCPJhUIpDX6Pkx/exec', {  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors",
        }
      );
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);  // Log error
      setSubmissionStatus('error');
      alert('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>
        Student Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Student Email ID:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Student Campus:
        <select name="campus" value={formData.campus} onChange={handleChange} required>
          <option value="">Select Campus</option>
          {campuses.map(campus => (
            <option key={campus} value={campus}>{campus}</option>
          ))}
        </select>
      </label>
      <label>
        Student Module:
        <select name="module" value={formData.module} onChange={handleChange} required>
          <option value="">Select Module</option>
          {modules.map(module => (
            <option key={module} value={module}>{module}</option>
          ))}
        </select>
      </label>
      <label>
        Module Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
      </label>
      <label>
        Module End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
      </label>
      <label>
        Cultural Growth:
        <input type="text" name="culturalGrowth" value={formData.culturalGrowth} onChange={handleChange} required />
      </label>
      <label>
        English Level:
        <input type="text" name="englishLevel" value={formData.englishLevel} onChange={handleChange} required />
      </label>
      <label>
        Days Spent on Module:
        <input type="number" name="daysSpent" value={formData.daysSpent} onChange={handleChange} required readOnly />
      </label>
      <button type="submit">Submit</button>
      {submissionStatus === 'success' && <p className="success-message">Data submitted successfully!</p>}
      {submissionStatus === 'error' && <p className="error-message">Failed to submit data.</p>}
    </form>
  );
};

export default StudentForm;
