import React from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const ContaineredSession = (props) => {
  const stime = ["10:30 - 11:30", "11:40 - 12:40", "14:00 - 15:00"];
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
    let time = "null";
    time = stime[Math.floor((slot - 1) / 2)];
    return (<>{time}</>);
  };
  const colDefs = [
    //    { headerName: '時間', cellRenderer: timeRenderer, width: 120 },
    // {
    //   headerName: '部屋', cellRenderer: roomRenderer, width: 80
    // },
    { headerName: '順番', field: 'order', width: 80 },
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
    <h2> ワークショップ:  Time: {stime[num]}</h2>
    <div class="container">
      <div class="item">
        <h3>Room: 21A </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => data.slot == 4 * num + 1).sort((a, b) => a.order - b.order)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
      <div class="item">
        <h3>Room: 21B </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => data.slot == 4 * num + 2).sort((a, b) => a.order - b.order)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <h3>Room: 22A </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => data.slot == 4 * num + 3).sort((a, b) => a.order - b.order)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
      <div class="item">
        <h3>Room: 22B </h3>
        <div className="ag-theme-quartz" style={{ height: 300 }}>
          <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((data) => data.slot == 4 * num + 4).sort((a, b) => a.order - b.order)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
      </div>
    </div>
  </div>
  )
}

const WSession = (props) => {
  const data = props.data;
  let ndata = data.map(i => { return { 'title': i.title, 'tag': i.tag, 'lab': i.lab, 'name': i.name, 'slot': i.slot1, 'order': i.order1 }; });
  ndata = ndata.concat(data.map(i => { return { 'title': i.title, 'tag': i.tag, 'lab': i.lab, 'name': i.name, 'slot': i.slot2, 'order': i.order2 }; }));
  let Sessions = [0, 1, 2].map(i => ndata.filter(item => Math.floor((item.slot - 1) / 4) == i));
  console.log(Sessions);
  return (<>
    <ContaineredSession num={0} data={Sessions[0]} />
    <ContaineredSession num={1} data={Sessions[1]} />
    <ContaineredSession num={2} data={Sessions[2]} />
  </>
  );
};

export default WSession;
