import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// You need to create an account on EmailJS (https://www.emailjs.com/) 
// and replace these with your actual service IDs
const EMAILJS_SERVICE_ID = 'service_yvq57at'; // Replace with your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_tqaynn3'; // Replace with your actual template ID
const EMAILJS_PUBLIC_KEY = 'qt-0XXDHhXgZ4VBhy'; // Replace with your actual public key

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear any previous submit errors
    if (submitError) {
      setSubmitError(null);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Send email using EmailJS
      if (formRef.current) {
        emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitting(false);
          setSubmitMessage('Thank you for your message! We will get back to you soon.');
          
          // Reset form after successful submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error('Failed to send email:', error.text);
          setIsSubmitting(false);
          setSubmitError('Failed to send your message. Please try again later or contact us directly via phone.');
        });
      } else {
        // Demo mode or missing configuration
        setTimeout(() => {
          console.log('Email would be sent with the following data:', formData);
          setIsSubmitting(false);
          setSubmitMessage('Thank you for your message! This is in demo mode. In production, your message would be sent to the site owner.');
          
          // Reset form after successful submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitMessage(null);
          }, 5000);
        }, 1500);
      }
    }
  };
  
  return (
    <div className="contact-form-container">
      {submitMessage ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <p>{submitMessage}</p>
        </div>
      ) : (
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" 
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject" 
              className={errors.subject ? 'error' : ''}
            />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5} 
              placeholder="Enter your message"
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
          
          {submitError && (
            <div className="error-message">
              <p>{submitError}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
      
      <div className="contact-info">
        <h3>Other Ways to Reach Us</h3>
        <p><strong>Email:</strong> info@weathernow.example</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Weather Lane, Forecast City, FC 12345</p>
        <p><strong>Hours:</strong> Monday-Friday, 9am-5pm EST</p>
      </div>
    </div>
  );
};

export default ContactForm; 