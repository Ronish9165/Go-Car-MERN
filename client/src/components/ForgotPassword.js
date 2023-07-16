import React, { useState } from 'react';
import ForgotPassword from './ForgotPasswordPage';
import VerificationPage from './VerificationPage';
import NewPasswordPage from './NewPasswordPage';


const ForgotPasswordFlow = () => {
  const [page, setPage] = useState('forgotPassword');

  const renderPage = () => {
    switch (page) {
      case 'forgotPassword':
        return <ForgotPassword setPage={setPage} />;
      case 'verification':
        return <VerificationPage setPage={setPage} />;
      case 'newPassword':
        return <NewPasswordPage />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
};

export default ForgotPasswordFlow;
