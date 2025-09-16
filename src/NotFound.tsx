import React from 'react';

const NotFound: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    backgroundImage: "url(https://i.imgur.com/DgyfVBa.jpeg)",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "6rem",
    fontWeight: "bold",
    margin: "0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    marginBottom: "1rem"
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
    maxWidth: "800px",
    lineHeight: "1.6"
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    border: "2px solid #fff",
    padding: "12px 24px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)"
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <p style={messageStyle}>
        Oops! The note you're looking for ... turns out we don't have it.
        <br />
        Try creating a new note or simply go back home.
      </p>
      <button 
        style={buttonStyle}
        onClick={handleGoHome}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Take Me Home
      </button>
    </div>
  );
};

export default NotFound;
