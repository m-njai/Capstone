import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Slideshow Images
import photo1 from '../photos/photo1.jpg';
import photo4 from '../photos/photo4.jpg';
import photo7 from '../photos/photo7.jpg';
import photo15 from '../photos/photo15.jpg';
import photo22 from '../photos/photo22.jpg';
import photo55 from '../photos/photo55.jpg';

// Feature Images
import projectImg from '../photos/photo29.jpg';
import supplyChainImg from '../photos/photo28.jpg';
import financeImg from '../photos/photo26.jpg';
import complianceImg from '../photos/photo23.jpg';
import sustainabilityImg from '../photos/photo20.jpg';
import aiImg from '../photos/photo4.jpg';

const LandingPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  // Background slideshow state
  const [currentImage, setCurrentImage] = useState(0);
  const images = [photo1, photo4, photo7, photo15, photo22, photo55];

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      {/* Branded Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        backgroundColor: "#1f2937",
        color: "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#93c5fd",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#1f2937"
          }}>
            SG
          </div>
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>SmartGrain Systems</h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/login")}
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1.2rem",
              fontSize: "1rem",
              backgroundColor: "transparent",
              border: "1px solid #93c5fd",
              color: "#93c5fd",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "0.5rem 1.2rem",
              fontSize: "1rem",
              backgroundColor: "#3b82f6",
              border: "none",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section with animated background */}
      <section
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "background-image 1s ease-in-out",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Smart Timber Construction, Powered by TECH
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Streamline supply chains, manage your site, and stay compliant — all from a single, intelligent platform built for the construction industry.
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#ffffff" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Core Features</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {[
            {
              title: "Project Management",
              desc: "Gantt charts, Kanban boards, and calendar views for smooth scheduling.",
              image: projectImg,
            },
            {
              title: "Supply Chain",
              desc: "Order materials, track shipments, and monitor supplier performance.",
              image: supplyChainImg,
            },
            {
              title: "Financial Planning",
              desc: "Manage budgets, invoices, and generate financial reports.",
              image: financeImg,
            },
            {
              title: "Compliance",
              desc: "Track documentation and stay aligned with local regulations.",
              image: complianceImg,
            },
            {
              title: "Sustainability",
              desc: "Monitor eco-impact and Green Star performance.",
              image: sustainabilityImg,
            },
            {
              title: "AI Assistant",
              desc: "Smart suggestions for next steps, warnings, and insights.",
              image: aiImg,
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 300px",
                maxWidth: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{ padding: "1.2rem" }}>
                <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>{feature.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "#555" }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#f9fafb" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Why Choose Us?</h2>
        <ul style={{ maxWidth: "700px", margin: "0 auto", listStyle: "none", padding: 0 }}>
          {[
            "Save time and cut delays with automated workflows.",
            "Boost project transparency and team collaboration.",
            "Meet local compliance standards effortlessly.",
            "Minimize costs and track financial performance.",
            "Make data-driven decisions using AI insights.",
          ].map((benefit, index) => (
            <li key={index} style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
               {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* Who It's For */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#ffffff" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Built For</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
          {["Builders", "Project Managers", "Suppliers", "Sustainability Officers", "Finance Teams"].map((role, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#e0f2fe",
                padding: "1rem 2rem",
                borderRadius: "10px",
                fontWeight: "bold"
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#dbeafe", textAlign: "center" }}>
        <h2>Ready to Build Smarter?</h2>
        <button
          onClick={() => navigate("/register")}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: "1.5rem 2rem", backgroundColor: "#1f2937", color: "#fff", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
        <div style={{ marginTop: "0.5rem" }}>
          <a href="/privacy" style={{ color: "#93c5fd", marginRight: "1rem" }}>Privacy</a>
          <a href="/terms" style={{ color: "#93c5fd" }}>Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
