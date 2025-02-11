import React, { useState, useEffect } from 'react';
import {Button,Modal,Form,Alert,Container,Row,Col} from 'react-bootstrap';
import  "./cookies.css";
import { ApiUrl } from "../ApiUrl";

const CookieManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true,
    functional: true,
    advertising: false,
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
      setShowBanner(false);
    }
  }, []);

  const handleConsentUpdate = async (updatedPreferences) => {
    try {
      setError('');
      const userEmail = localStorage.getItem('email') || 'anonymous@example.com';
      const userName = localStorage.getItem('name') || 'Anonymous User';
      
      // Store preferences first
      localStorage.setItem('cookiePreferences', JSON.stringify(updatedPreferences));
      setShowBanner(false);

      // Backend communication
      const ipResponse = await fetch('https://ipinfo.io/json?token=c50d94473fb8f0');
      if (!ipResponse.ok) throw new Error('Failed to fetch location data');
      
      const { ip, city, region, country } = await ipResponse.json();
      
      const consentData = {
        consent: true,
        preferences: updatedPreferences,
        location: { ip, city, region, country },
        user: { email: userEmail, name: userName },
      };

      const response = await fetch(`${ApiUrl.BASEURL}/cookies/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consentData),
      });

      if (!response.ok) throw new Error('Failed to save consent data');

    } catch (error) {
      setError('Failed to save preferences to server. Your choices are saved locally.');
      console.error('Error saving consent:', error);
    }
  };

  const handleAcceptAll = () => {
    const allTrue = Object.keys(preferences).reduce((prefs, key) => ({
      ...prefs,
      [key]: true
    }), {});
    setPreferences(allTrue);
    handleConsentUpdate(allTrue);
    setShowModal(false);
  };

  const handleDeclineAll = () => {
    const allFalse = Object.keys(preferences).reduce((prefs, key) => ({
      ...prefs,
      [key]: false
    }), {});
    setPreferences(allFalse);
    handleConsentUpdate(allFalse);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    handleConsentUpdate(preferences);
    setShowModal(false);
  };

  const cookieDescriptions = {
    analytics: 'Help us understand how visitors interact with our website',
    marketing: 'Help us provide personalized content and ads',
    functional: 'Enable advanced website functionality and personalization',
    advertising: 'Allow us to deliver targeted advertisements',
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed-bottom  shadow p-4 cookiesbg text-center">
        <Container className='row d-flex'> 
          <Row className="align-items-center justify-content-center">
            <Col md={12}>
              <p className="mb-md-0 ">
                This site uses cookies and related technologies for site operation, analytics, and advertising. 
                You may choose to consent to our use of these technologies, or manage your own preferences.
              </p>
              <Col md={12} className="text-md-end d-flex justify-content-center">
              <Button 
              
               
                onClick={() => setShowModal(true)}
                className="me-2 cookiesbtn align-self-end"
              >
                Manage Preferences
              </Button>
              <Button
                className='cookiesbtn align-self-end'
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </Col>
            </Col>
            
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cookie Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form >
            {Object.entries(preferences).map(([key, value]) => (
              <Form.Group key={key} className="mb-3">
                <div className="d-flex justify-content-between align-items-start cookies-form">
                  <div>
                    <Form.Label className="mb-0 fw-bold text-capitalize">
                      {key}
                    </Form.Label>
                    <p className="text-muted small mb-0">
                      {cookieDescriptions[key]}
                    </p>
                  </div>
                  <Form.Check
                    type="switch"
                    className=''
                    checked={value}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                  />
                </div>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  className='cookiesbtn' onClick={handleDeclineAll}>
            Decline All
          </Button>
          <Button className='cookiesbtn' onClick={handleAcceptAll}>
            Accept All
          </Button>
          <Button className='cookiesbtn' onClick={handleSavePreferences}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CookieManager;