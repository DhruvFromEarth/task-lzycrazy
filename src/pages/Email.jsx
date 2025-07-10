import {React , useState} from 'react'
import CompleteApplicationModal from './EmailFormModal';

const Email = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
        console.log("Form submitted");
        
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit} className="main-form">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required/>
            <br />
            <button type="submit">submit</button>
        </form>
            {showModal && (
                <CompleteApplicationModal onClose={() => setShowModal(false)} />
            )}
    </div>
  )
}

export default Email;