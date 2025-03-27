import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
    </div>
  );
};

export default LandingPage;
