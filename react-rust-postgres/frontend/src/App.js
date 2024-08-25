import React, { StrictMode, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GridExample from "./Grids";

function App() {
  const [message, setMessage] = useState();
  const [members, setMember] = useState();
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
        {/* <StrictMode> */}
          <GridExample data={members}/>
        {/* </StrictMode> */}
    </div>
  );
}

export default App;
