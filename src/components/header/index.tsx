import React, { FC } from "react";

const HeaderComponent: FC = () => {
  return (
    <header style={{ border: '3px solid green'}}>
      <section>
        <div className="row">
        <header className="app-header col-12">
          <div className="home-loop" style={{ width: "250px"}}><span className="highlight">Loop</span>.</div>
          <div className="logout" style={{backgroundColor: "red", width: "500px"}}>Logout</div>
        </header>
        </div>
      </section>
    </header>
  );
};

export default HeaderComponent;
