import React, { useState } from 'react';
import FooterModal from '../components/FooterModal';
import ContactForm from '../components/ContactForm';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };
  
  // Content for each modal
  const privacyContent = (
    <>
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date: {new Date().toLocaleDateString()}</strong></p>
      
      <h3>1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you search for locations. This includes:</p>
      <ul>
        <li>Search history for weather locations</li>
        <li>Device information and IP address</li>
        <li>Location data (with your permission)</li>
      </ul>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide weather data for your requested locations</li>
        <li>Improve our services and develop new features</li>
        <li>Personalize your experience</li>
        <li>Comply with legal obligations</li>
      </ul>
      
      <h3>3. Data Security</h3>
      <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
      
      <h3>4. Your Rights</h3>
      <p>Depending on your location, you may have rights regarding your personal data, including:</p>
      <ul>
        <li>Access to your data</li>
        <li>Correction of inaccurate data</li>
        <li>Deletion of your data</li>
        <li>Restriction of processing</li>
      </ul>
      
      <h3>5. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </>
  );
  
  const termsContent = (
    <>
      <h2>Terms of Service</h2>
      <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
      
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing or using our WeatherNow service, you agree to be bound by these Terms of Service.</p>
      
      <h3>2. Weather Data</h3>
      <p>Weather information is provided "as is" and for informational purposes only. While we strive for accuracy, we cannot guarantee that the weather data will be error-free or up to date at all times.</p>
      
      <h3>3. User Conduct</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Use our service for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with the proper working of the service</li>
        <li>Make excessive requests to our servers</li>
      </ul>
      
      <h3>4. Intellectual Property</h3>
      <p>All content, features, and functionality of our service are owned by WeatherNow and are protected by copyright, trademark, and other intellectual property laws.</p>
      
      <h3>5. Limitation of Liability</h3>
      <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
      
      <h3>6. Changes to Terms</h3>
      <p>We reserve the right to modify these terms at any time. Your continued use of the service after such modifications constitutes your acceptance of the revised terms.</p>
    </>
  );
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} WeatherNow. All rights reserved.</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('privacy'); }}>Privacy Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('terms'); }}>Terms of Service</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact Us</a>
        </div>
      </div>
      
      {/* Render modal based on which link was clicked */}
      {activeModal === 'privacy' && (
        <FooterModal onClose={closeModal} title="Privacy Policy">
          {privacyContent}
        </FooterModal>
      )}
      
      {activeModal === 'terms' && (
        <FooterModal onClose={closeModal} title="Terms of Service">
          {termsContent}
        </FooterModal>
      )}
      
      {activeModal === 'contact' && (
        <FooterModal onClose={closeModal} title="Contact Us">
          <ContactForm />
        </FooterModal>
      )}
    </footer>
  );
};

export default Footer; 