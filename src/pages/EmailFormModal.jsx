import { useState } from 'react';
import '../app.css';

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
    else if (formData.introduction.trim().split(/\s+/).length > 50) newErrors.introduction = 'Introduction must be 50 words or less.';
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
      <div className="modal-content">
        <h2 className="modal-title">COMPLETE YOUR APPLICATION</h2>
        <p className="modal-subtitle">Please complete your hiring form.</p>
        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <input
              name="country"
              placeholder="Country *"
              value={formData.country}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.country && <p className="error-text">{errors.country}</p>}
          </div>
          <div>
            <input
              name="state"
              placeholder="State *"
              value={formData.state}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>
          <div>
            <input
              name="city"
              placeholder="City *"
              value={formData.city}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
          <div>
            <input
              name="education"
              placeholder="Education *"
              value={formData.education}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.education && <p className="error-text">{errors.education}</p>}
          </div>
          <div>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="modal-input"
            >
              <option value="">-- Select Experience Level --</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            {errors.experience && <p className="error-text">{errors.experience}</p>}
          </div>
          <div>
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="modal-input"
            >
              <option value="">-- Select Job Category --</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
            {errors.jobCategory && <p className="error-text">{errors.jobCategory}</p>}
          </div>
          <div>
            <textarea
              name="introduction"
              placeholder="Tell us about yourself in 50 words or less..."
              value={formData.introduction}
              onChange={handleChange}
              className="modal-textarea"
            />
            {errors.introduction && <p className="error-text">{errors.introduction}</p>}
            <p className="word-count">Word count: {formData.introduction.trim().split(/\s+/).filter(Boolean).length}/50</p>
          </div>
          <div>
            <label className="modal-label">15s Video Introduction *</label>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            {errors.video && <p className="error-text">{errors.video}</p>}
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-button cancel-button">Cancel</button>
            <button type="submit" className="modal-button submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
