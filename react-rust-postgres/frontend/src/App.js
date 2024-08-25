import React, { StrictMode, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GridExample from "./Grids";

function App() {
  const [message, setMessage] = useState();
  const [members, setMember] = useState([{category:null}]);
  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMember(res)
        setMessage(`Hello with ${res.length} members`);
      })
      .catch(console.error);
    // fetch("/api/users")
    //   .then((res) => res.json())
    //   .then((res) => {console.log("hogehoge");
    //     setMessage(`Hello with ${res.length} users`)})
    //   .catch(console.error);
  }, [setMessage]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>{message || "Loading..."}</p>
      </header> */}
      <h1>ATACS2024</h1>
        {/* <StrictMode> */}
          <GridExample data={members.filter((item)=>item.category==="ドクターセッション")}/>
        {/* </StrictMode> */}
    </div>
  );
}

export default App;
