import React, { useState } from 'react';
import CompleteApplicationModal from './EmailFormModal';
import '../App.css';

const Email = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", email);
    setShowModal(true);
  };

  return (
    <div className="email-page">
      <div className="email-box">
        <h2 className="email-title">ENTER EMAIL TO CONTINUE</h2>
        <p className="email-subtext">
          We'll verify your email and continue to the hiring form.
        </p>
        <form onSubmit={handleSubmit} className="email-form">
          <label htmlFor="email">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="email-btn">
            CONTINUE
          </button>
        </form>
      </div>

      {showModal && (
        <CompleteApplicationModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Email;
