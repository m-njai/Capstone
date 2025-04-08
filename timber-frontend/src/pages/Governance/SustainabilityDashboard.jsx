import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SustainabilityDashboard = ({ projectId: propProjectId }) => {
  const { projectId: routeProjectId } = useParams();
  const projectId = propProjectId || routeProjectId;
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    axios
      .get(`/api/sustainability/score/${projectId}`)
      .then((res) => setScore(res.data))
      .catch((err) => {
        console.error("Error fetching sustainability score:", err);
        setScore(null);
      });
  }, [projectId]);

  if (!projectId) return <p style={{ color: "red" }}>Missing project ID.</p>;
  if (!score) return <p>Loading sustainability data...</p>;

  return (
    <div style={{ padding: 16, backgroundColor: "#eef5ea", borderRadius: 8 }}>
      <h3>Sustainability Score</h3>
      <p>Total Material Orders: {score.total}</p>
      <p>FSC-Certified Orders: {score.fscCertified}</p>
      <p>FSC Percentage: {score.fscPercent.toFixed(1)}%</p>
      <h4>Rating: {score.rating}</h4>
    </div>
  );
};

export default SustainabilityDashboard;
