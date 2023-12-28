import React, { useState } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false);
    }
  };

  const handleSubmit = () => {
    const { username, email, phone, dob } = formData;

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);

    if (dobDate >= today) {
      alert('Invalid date of birth. Date must be in the past.');
      return;
    }

    // On successful submission, reset form data and close modal
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                pattern=".+@.+" 
                title={`Please include an '@' in the email address. '${formData.email} is missing an '@'`}
                required
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />

              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
