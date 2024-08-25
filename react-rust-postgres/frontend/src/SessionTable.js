import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const SessionTable = (props) => {
    const [colDefs, setColDefs] = useState([
        { field: 'time'},
        { field: 'room'},
        { field: 'title'},
        { field: 'presenter'},
    ]);

    const defaultColDef = {
        resizable: true,  // カラム幅可変に
        sortable: true,  // ソート可能に
        filter: true,  // 絞り込み可能に
//        flex: 1,
    };

    const rearrange = (data,category) => {
        ret = data.filter((item)=>item.category==category);
        return ret;
    }

    return (
        <div className="ag-theme-quartz" style={{ width: '100%', height: 1000 }}
        >
            <AgGridReact suppressColumnVirtualisation={true} rowData={rearrange(props.data)} columnDefs={colDefs} defaultColDef={defaultColDef} />
        </div>
    );
};

export default SessionTable;
