import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const gen_session = (papers)=>{
    return {type:type,chair:chair,title:title,pids:pids,stime:stime,room:room,sid:sid};
}



const SessionTable = (props) => {
    const [colDefs, setColDefs] = useState([
        { field: '時刻'},
        { field: '部屋'},
        { field: 'タイトル'},
        { field: '発表者'},
    ]);

    const defaultColDef = {
        resizable: true,  // カラム幅可変に
        sortable: true,  // ソート可能に
        filter: true,  // 絞り込み可能に
//        flex: 1,
    };
    dnum = props.data.filter((i)=>i.category==="ドクターセッション").length();
    onum = props.data.filter((i)=>i.category==="口頭発表").length();
    wnum = props.data.filter((i)=>i.category==="ワークショップ").length();
    const places = {opening:["Room 21C"],closing:["Room 21C"],
        oral:["Room 21C","Room 22C"],
        workshop:["Room 21A-1","Room 21A-2","Room 21B-1","Room 21B-2","Room 22A-1","Room 22A-2","Room 22B-1","Room 22B-2"],
        doctor:["21C"]};
    const startTime = "2024-09-10T10:00:00"; // 決まった時刻を指定
    const dstartTime = "2024-09-10T10:05:00"; // 決まった時刻を指定
    const ostartTime = "2024-09-10T13:00:00"; // 決まった時刻を指定
    const times = {opening:["10:00"],closing:["17:30"],
        doctor:getTimeIntervals(dnum),
        oral:getTimeIntervals(onum),
        workshop:getTimeIntervals(wnum),
    }
    
//     const gen_session = (category,num,data)=>{
//         place = places[category];
//         slot = category + num;
//         return <>
//         <tbody><tr><td colspan="2">&nbsp;</td></tr>
//         <tr class="sHdr">
//            <td><a name="thuat1"><b>slot</b></a></td>
//            <td class="r">{place}</td>
//         </tr>
     
//         <tr class="sHdr">
//            <td nowrap=""><a href="NMPC24_ProgramAtAGlanceWeb.html#thuat1" title="Click to go to the Program at a Glance"><b>Networks</b></a></td>
//            <td class="r">{category}</td>
//         </tr>
     
//         <tr><td>Chair: <a href="NMPC24_AuthorIndexWeb.html#23449" title="Click to go to the Author Index">Olaru, Sorin</a></td><td class="r">CentraleSupelec</td></tr>
//         <h2>{category+num}</h2>
//         <AgGridReact suppressColumnVirtualisation={true} rowData={rearrange(props.data)} columnDefs={colDefs} defaultColDef={defaultColDef} />
//         </tbody>
//         </>;
//     }
//     const gen_presentation = (time,ID,title,author) =>{
//         return <>
// <tr style="line-height: 0.2em"><td colspan="2">&nbsp;</td></tr>
// <tr class="pHdr"><td valign="bottom"><a name="thuat1_01">10:50-11:10, Paper ThuAT1.1</a></td><td class="r">&nbsp;</td></tr>
// <tr><td colspan="2"><span class="pTtl">&nbsp;<a href="" onclick="viewAbstract('99'); return false" title="Click to show or hide the keywords and abstract (text summary)">Characterization of Unconstrained Solution in Parallel Model Predictive Control for Low-Resource IoT Devices</a></span></td></tr>
// <tr><td style="height: 2px" colspan="2"><hr class="thin"></td></tr>
// <tr><td colspan="2"><a href="NMPC24_AuthorIndexWeb.html#165271" title="Click to go to the Author Index">Yamamoto, Shunta</a> (Osaka Metropolitan University), <a href="NMPC24_AuthorIndexWeb.html#31053" title="Click to go to the Author Index">Hara, Naoyuki</a> (Osaka Metropolitan University), <a href="NMPC24_AuthorIndexWeb.html#82325" title="Click to go to the Author Index">Konishi, Keiji</a> (Osaka Metropolitan University), <a href="NMPC24_AuthorIndexWeb.html#82324" title="Click to go to the Author Index">Sugitani, Yoshiki</a> (Osaka Metropolitan University)</td></tr>
//         </>;
//     }



    const rearrange = (data,category) => {
        //category : ドクターセッション、口頭発表、ワークショップ
        cat_papers = data.filter((item)=>item.category===category); //  
        sids = Array.from(new Set(cat_papers.map((i)=>i.slot))).sort; // 
        titles = tmp.map((i)=>category + i);
        stimes = 
        sessions = sids.map(({id,i})=>gen_sessions("",titles[i],cat_papers.map((p)=>p.slot==id)));
        console.log(sessions);  //[ 1, 2, 3, 4 ]
        return <>{sessions.map((i)=> {
            room=rooms[category];
            gen_session(i,room,to_session_topic(ret.filter((i)=>i.slot==i)))
        })}</>;
    }

    return (
        <div className="ag-theme-quartz" style={{ width: '100%', height: 1000 }}
        >
            {rearrange(props.data,props.category)}
        </div>
    );
};

export default SessionTable;


function getTimeIntervals(numIntervals, startTime) {
    const intervals = [];
    let currentTime = new Date(startTime);

    for (let i = 0; i < numIntervals; i++) {
        intervals.push(currentTime.toTimeString().slice(0, 5)); // "HH:MM"形式で時刻を取得
        currentTime.setMinutes(currentTime.getMinutes() + 15); // 15分を加算
    }

    return intervals;
}

// 使用例: 2024年8月26日13時00分から始めて、10個の15分おきの時刻データを取得
// const startTime = "2024-08-26T13:00:00"; // 決まった時刻を指定
// const timeIntervals = getTimeIntervals(10, startTime);
// console.log(timeIntervals);