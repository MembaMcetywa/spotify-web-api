import React from "react";

const DashboardPlayer = () => {
  return (
    <body style={{margin: "0 1.5rem"}}>
      <section>
        <header className="header" style={{display: "flex", justifyContent: "space-between", width: "100%", backgroundColor: "yellow" }}>
          <div className="hero" style={{backgroundColor: "blue", width: "250px"}}></div>
          <div className="banner" style={{backgroundColor: "red", width: "500px"}}></div>
        </header>
      </section>
    </body>
  );
};

export default DashboardPlayer;
