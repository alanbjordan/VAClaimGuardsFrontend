import React from 'react'
import WelcomeContent from '../components/Welcome/WelcomeContent.jsx'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the next step, e.g.:
    navigate('/service-dates');
  };

  return (
    <WelcomeContent onGetStarted={handleGetStarted} />
  );
}
