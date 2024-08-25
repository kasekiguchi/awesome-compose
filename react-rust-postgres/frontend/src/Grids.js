import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the Data Grid

//import { ClientSideRowModelModule } from 'ag-grid-community/client-side-row-model';
// Theme
//import { ModuleRegistry } from 'ag-grid-community/core';
//import { AgGridReact } from '@ag-grid-community/react';
// React Grid Logic
//import '@ag-grid-community/styles/ag-grid.css';
// Core CSS
//import '@ag-grid-community/styles/ag-theme-quartz.css';
//import React, { StrictMode, useState } from 'react';
//import { createRoot } from 'react-dom/client';

//ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
const GridExample = (props) => {
    // Row Data: The data to be displayed.
    // const [rowData, setRowData] = useState([
    //     { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    //     { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    //     { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    //     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    //     { make: 'Fiat', model: '500', price: 15774, electric: false },
    //     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    // ]);
    // Column Definitions: Defines & controls grid columns.
    // const [colDefs, setColDefs] = useState([
    //     { field: 'make' },
    //     { field: 'model' },
    //     { field: 'price' },
    //     { field: 'electric' },
    // ]);
    const [rowData, setRowData] = useState([
        props.data
    ]);
    console.log("=======================",props.data)
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: 'tag'},
        // { field: 'row'},
        { field: 'lab'},
        { field: 'name'},
        // { field: 'yomi'},
        // { field: 'email'},
        { field: 'grade'},
        { field: 'category'},
        { field: 'key1'},
        { field: 'key2'},
        { field: 'key3'},
        { field: 'title'},
        { field: 'opt'},
        { field: 'slot'},
    ]);

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
    return (
        <div className="ag-theme-quartz" style={{ width: '100%', height: 1000 }}
        >
            <AgGridReact suppressColumnVirtualisation={true} rowData={props.data} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
    );
};

export default GridExample;

// Render GridExample
// const root = createRoot(document.getElementById('root'));
// root.render(
//     <StrictMode>
//         <GridExample />
//     </StrictMode>
// );