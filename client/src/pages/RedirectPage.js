import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => --count);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <p style={{ textAlign: "center", color: "#fff" }}>
        You are not logged in, redirecting you in {count} seconds
      </p>
    </div>
  );
};

export default RedirectPage;
