import React, { useEffect, useCallback, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Button from './Button';
// import "ag-grid-community/csv-export";
// import "ag-grid-enterprise/excel-export";
// import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid

// Create new GridExample component
const GridExample = (props) => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(props.data);
    const [colDefs, setColDefs] = useState([
        { field: 'tag'},
        { field: 'lab'},
        { field: 'key1'},
        { field: 'key2'},
        { field: 'key3'},
//        { field: 'title'},
//        { field: 'slot'},
    ]);

    const [session,setSession] = useState("ドクターセッション");
    const defaultColDef = {
        resizable: true,  // カラム幅可変に
        sortable: true,  // ソート可能に
        filter: true,  // 絞り込み可能に
//        flex: 1,
    };
    // onFirstDataRendered: event => {
    //     event.columnApi.autoSizeAllColumns(false);  // カラムヘッダーも含めてオートサイズを実行
    // }
    // Container: Defines the grid's theme & dimensions.
    console.log("-----------",rowData);
    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsExcel();
      }, []);
    
    return (<>
      <div>
          <button
            onClick={onBtExport}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to Excel
          </button>
        </div> 
        <Button onClick={()=>{setSession("ドクターセッション")}} size={session==="ドクターセッション" ? "large" : "medium"}  visual="primary">ドクターセッション</Button>
        <Button onClick={()=>{setSession("口頭発表")}} size={session==="口頭発表" ? "large" : "medium"}  visual="primary">口頭発表</Button>
        <Button onClick={()=>{setSession("ワークショップ")}} size={session==="ワークショップ" ? "large" : "medium"}  visual="primary">ワークショップ</Button>
        <div className="ag-theme-quartz" style={{ width: '100%', height: 1000 }}
        >
            <AgGridReact suppressColumnVirtualisation={true} rowData={props.data.filter((i)=>i.category===session)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
        </>
    );
};

export default GridExample;
