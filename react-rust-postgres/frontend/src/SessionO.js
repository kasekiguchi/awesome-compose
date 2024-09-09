import React from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function addMinutesToTime(timeString, minutesToAdd) {
  // 1. 時刻文字列を分解して、HourとMinuteを取得
  const [hours, minutes] = timeString.split(":").map(Number);

  // 2. Dateオブジェクトを作成
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // 秒やミリ秒は0にリセット

  // 3. 分を加算
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // 4. 新しい時刻のHourとMinuteを取得し、フォーマット
  const newHours = String(date.getHours()).padStart(2, "0");
  const newMinutes = String(date.getMinutes()).padStart(2, "0");

  // 5. HH:mm形式の文字列として返す
  return `${newHours}:${newMinutes}`;
}


const ContaineredSession = (props) => {
  const setime = ["10:30 - 11:30", "11:40 - 12:40", "14:00 - 15:00"];
  const stime = ["10:30", "11:40", "14:00"];
  let num = props.num;
  const titleRenderer = (gridObject) => {
    let title = gridObject.data.title;
    let tag = gridObject.data.tag;
    let lab = gridObject.data.lab;
    return (<a href={'./' + lab + '究室/' + tag + '.pdf'}>{title}</a>);
  };
  const timeRenderer = (gridObject) => {
    let slot = gridObject.data.slot1;
    let order = gridObject.data.order1;
    let time = stime[Math.floor((slot - 1) / 2)];
    return addMinutesToTime(time, 15 * (order - 1));
  };
  const colDefs = [
    { headerName: '時間', cellRenderer: timeRenderer, width: 120 },
    // {
    //   headerName: '部屋', cellRenderer: roomRenderer, width: 80
    // },
    //{ headerName: '順番', field: 'order1', width: 80 },
    { headerName: "ID", field: 'tag', width: 100 },
    { headerName: '研究室名', field: 'lab', width: 150 },
    { headerName: '氏名', field: 'name', width: 200 },
    { headerName: 'タイトル', field: 'title', width: 800, colId: "title", cellRenderer: titleRenderer },
    //        { field: 'title'},
    //        { field: 'slot'},
  ];

  const defaultColDef = {
    resizable: false,  // カラム幅可変に
    sortable: false,  // ソート可能に
    filter: false,  // 絞り込み可能に
    cellStyle: {
      textAlign: "left",
    },
  };
  return (<div class="session">
    <h2> <div class="title-container"><div class="item"> 口頭発表</div>  <div class="item">Time: {setime[num]}</div></div></h2>
    <div class="container">
      <div class="item">
        <h3>Room: 21C </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => parseInt(data.slot1) === 2 * num + 1).sort((a, b) => a.order1 - b.order1)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
      <div class="item">
        <h3>Room: 22C </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => parseInt(data.slot1) === 2 * num + 2).sort((a, b) => a.order1 - b.order1)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
    </div>
  </div>
  )
}

// Create new OSession component
const OSession = (props) => {
  console.log(props.data);
  return (<>
    <ContaineredSession num={0} data={props.data} />
    <ContaineredSession num={1} data={props.data} />
    <ContaineredSession num={2} data={props.data} />
  </>
  );
};
//          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter(data => Math.floor((data.slot1 - 1) / 2) === 2).sort((a, b) => a.order1 - b.order1).sort((a, b) => a.slot1 - b.slot1)} columnDefs={colDefs} defaultColDef={defaultColDef} />
//          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter(data => Math.floor((data.slot1 - 1) / 2) === 2).sort((a, b) => a.order1 - b.order1).sort((a, b) => a.slot1 - b.slot1)} columnDefs={colDefs} defaultColDef={defaultColDef} />

export default OSession;
