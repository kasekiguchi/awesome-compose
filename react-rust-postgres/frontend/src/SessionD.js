import React from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// Create new DSession component
const DSession = (props) => {
  const titleRenderer = (gridObject) => {
    let title = gridObject.data.title;
    let tag = gridObject.data.tag;
    let lab = gridObject.data.lab;
    return (<a href={'./' + lab + '究室/' + tag + '.pdf'}>{title}</a>);
  };
  const dtime = ["15:10 - 15:40", "15:40 - 16:10", "16:10 - 16:40", "16:40 - 17:10"];
  const timeRenderer = (gridObject) => {
    let order = gridObject.data.order1;
    let time = dtime[order - 1];
    return time;
  };
  const roomRenderer = () => {
    return "21C";
  };
  const colDefs = [
    { headerName: '時間', cellRenderer: timeRenderer, width: 120 },
    { headerName: '部屋', cellRenderer: roomRenderer, width: 80 },
    { headerName: "ID", field: 'tag', width: 100 },
    { headerName: '研究室名', field: 'lab', width: 150 },
    { headerName: '氏名', field: 'name', width: 200 },
    { headerName: 'タイトル', field: 'title', width: 800, colId: "title", cellRenderer: titleRenderer },
  ];

  const defaultColDef = {
    resizable: false,  // カラム幅可変に
    sortable: false,  // ソート可能に
    filter: false,  // 絞り込み可能に
    cellStyle: {
      textAlign: "left",
    },
  };

  return (<>
    <div className="ag-theme-quartz" style={{ width: '90%', height: 1000 }}
    >
      <AgGridReact suppressColumnVirtualisation={true} rowData={props.data} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  </>
  );
};

export default DSession;
