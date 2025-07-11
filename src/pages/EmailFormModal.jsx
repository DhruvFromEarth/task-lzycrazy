import { useState } from 'react';
import '../App.css';

export default function CompleteApplicationModal({ onClose }) {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
    education: '',
    experience: '',
    jobCategory: '',
    introduction: '',
  });

  const [errors, setErrors] = useState({});
  const [video, setVideo] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.country.trim()) newErrors.country = 'Country is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.education.trim()) newErrors.education = 'Education is required.';
    if (!formData.experience) newErrors.experience = 'Experience Level is required.';
    if (!formData.jobCategory) newErrors.jobCategory = 'Job Category is required.';
    if (!formData.introduction.trim()) newErrors.introduction = 'Introduction is required.';
    else if (formData.introduction.trim().split(/\s+/).length > 50) newErrors.introduction = 'Max 50 words.';
    if (!video) newErrors.video = 'Video introduction is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) {
      setVideo(file);
    } else {
      setErrors(prev => ({ ...prev, video: 'Video file is too large.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData, video);
      alert('Application submitted!');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">COMPLETE YOUR APPLICATION</h2>
        <a href="#" className="modal-back-link" onClick={onClose}>← Back to login</a>
        <p className="modal-id-line">Your LzyCrazyID: lcxxxxxxxx005</p>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-row">
            <div className="modal-field">
              <label>Country <span className="required-star">*</span></label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <p className="error-text">{errors.country}</p>}
            </div>
            <div className="modal-field">
              <label>State <span className="required-star">*</span></label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>City <span className="required-star">*</span></label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
            <div className="modal-field">
              <label>Education <span className="required-star">*</span></label>
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
              {errors.education && <p className="error-text">{errors.education}</p>}
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Experience Level <span className="required-star">*</span></label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Entry">Entry</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              {errors.experience && <p className="error-text">{errors.experience}</p>}
            </div>
            <div className="modal-field">
              <label>Job Category <span className="required-star">*</span></label>
              <select
                name="jobCategory"
                value={formData.jobCategory}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
              </select>
              {errors.jobCategory && <p className="error-text">{errors.jobCategory}</p>}
            </div>
          </div>

          <div className="modal-field">
            <label>Introduction (Max 50 Words) <span className="required-star">*</span></label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            ></textarea>
            {errors.introduction && <p className="error-text">{errors.introduction}</p>}
            <p className="word-count">Word count: {formData.introduction.trim().split(/\s+/).filter(Boolean).length}/50</p>
          </div>

          <div className="modal-field">
            <label>15s Video Introduction <span className="required-star">*</span></label>
            <button
              type="button"
              className="video-record-btn"
              onClick={() => document.getElementById('videoUpload').click()}
            >
              Record Video
            </button>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={handleVideoChange}
            />
            {errors.video && <p className="error-text">{errors.video}</p>}
          </div>

          <span className="required-star">required fields *</span>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
