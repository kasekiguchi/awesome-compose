// ag-grid-react ag-grid-community classnames

import "./App.css";
import React, { useEffect, useState } from "react";
import DSession from "./SessionD";
import OSession from "./SessionO";
import WSession from "./SessionW";
import Button from './Button';
import Timage from "./title-page.png";

const Session = (props) => {
  let members = props.data;
  let session = props.session;
  if (session === "ドクターセッション") {
    return <DSession data={members.filter((i) => i.category === "ドクターセッション").sort((a, b) => a.order1 - b.order1)} />;
  } else if (session === "ワークショップ") {
    return <WSession data={members.filter((i) => i.category === "ワークショップ")} />;
  } else {
    return <OSession data={members.filter((i) => i.category === "口頭発表")} />;
  }
}

function App() {
  const [members, setMember] = useState([{ category: null }]);
  const [session, setSession] = useState("ドクターセッション");
  const [landing, setLanding] = useState(true);
  // const [session, setSession] = useState("口頭発表");
  //const [session, setSession] = useState("ワークショップ");

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMember(res)
      })
      .catch(console.error);
  }, []);

  const Main = (props) => {
    if (props.mode === true) {
      return (<>
        <Button onClick={() => { setLanding(false) }}>
          <h1>(CLICK ON THE IMAGE TO LAUNCH)</h1>
          <img src={Timage} alt="click here" width="50%" />
        </Button>
        <table class="table-container">
          <tr>
            <td><a class="btn btn-flat btn-l" href="ATACS2024Manual.pdf"><span>実施要領</span></a></td>
            <td><a class="btn btn-flat btn-r" href="ATACS2024OS_Manual.pdf"><span>オーラルセッション司会マニュアル</span></a></td>
          </tr>
          <tr>
            <td><a class="btn btn-flat btn-l" href="ProgramAtAGlance.pdf"><span>時間割</span></a></td>
            <td><a class="btn btn-flat btn-r" href="ATACS2024MC_Manual.pdf"><span>ワークショップMCマニュアル</span></a></td>
          </tr>
          <tr>
            <td><a class="btn btn-flat btn-l" href="raw_doctor.html"><span>プログラム</span></a></td>
            <td><a class="btn btn-flat btn-r" href="https://docs.google.com/forms/d/e/1FAIpQLSdTzczRdmgyIEhabX2qqJZCelbNmmAzLsLPSHIGG5e5HGeYFw/viewform"><span>終了後アンケート</span></a></td>
          </tr>
        </table >
      </>
      );
    } else {
      return (
        <>
          <h1>ATACS2024</h1>
          <Button onClick={() => { setSession("ドクターセッション") }} size={session === "ドクターセッション" ? "large" : "medium"} visual="primary">ドクターセッション</Button>
          <Button onClick={() => { setSession("口頭発表") }} size={session === "口頭発表" ? "large" : "medium"} visual="primary">口頭発表</Button>
          <Button onClick={() => { setSession("ワークショップ") }} size={session === "ワークショップ" ? "large" : "medium"} visual="primary">ワークショップ</Button>
          <center>
            <Session session={session} data={members} />
          </center>
        </>
      );
    }
  }

  return (
    <div className="App">
      <Main mode={landing} />
    </div>
  );
}

export default App;
