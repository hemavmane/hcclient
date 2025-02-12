import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CookieManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true,
    functional: true,
    advertising: true,
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

      const response = await fetch('https://api.justoconsulting.com/api/cookies/create', {
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
      <div className="fixed-bottom  shadow p-4 bg-success">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-md-0 text-white">
                This site uses cookies and related technologies for site operation, analytics, and advertising.
                You may choose to consent to our use of these technologies, or manage your own preferences.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                onClick={() => setShowModal(true)}
                className="me-2 border-0 btn-md-lg fw-semibold px-4 py-2 mt-3 align-self-end bg-pink text-dark"
              >
                Manage Preferences
              </Button>
              <Button
                className='border-0 btn-md-lg fw-semibold px-4 py-2 mt-3 align-self-end bg-lightBlue text-dark'
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
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
                    checked={value}
                    disabled={key === 'analytics' || key === 'advertising'}
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
          <Button className='border-0 btn-md-lg fw-semibold px-4 py-2 mt-3 align-self-end bg-lightBlue text-dark' onClick={handleAcceptAll}>
            Accept All
          </Button>
          <Button className='border-0 btn-md-lg fw-semibold px-4 py-2 mt-3 align-self-end bg-lightBlue text-dark' onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CookieManager;
