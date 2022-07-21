import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import "./css/table.css"

import { ExportJsonCsv } from 'react-export-json-csv';



const Table = ({ tableData, headingColumns, title, breakOn = 'medium'}) => {
  console.log(headingColumns);
  // const headers = [
  //   {
  //     key: 'id',
  //     name: 'ID',
  //   },
  //   {
  //     key: 'fname',
  //     name: 'First Name',
  //   },
  // ]
  // {
  //   rollno: "LXX20XXXX",
  //     name: "Lewis Hamilton",
  //     backlogs: "0",
  //     cgpa: "10",
  //     status: "unplaced",
  //     profile: ":id",
  // }
  
  const headingColumnsCsv = [
    {
      key: 'rollno',
      name: 'Roll No',
    },
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'backlogs',
      name: 'Backlogs',
    },
    {
      key: 'cgpa',
      name: 'CGPA',
    },
    {
      key: 'status',
      name: 'Placement Status',
    }
  ]


  let tableClass = 'table-container__table';

  if(breakOn === 'small') {
    tableClass += ' table-container__table--break-sm';
  }else if(breakOn === 'medium') {
    tableClass += ' table-container__table--break-md';
  }else if(breakOn === 'large') {
    tableClass += ' table-container__table--break-lg';
  }

  const tdata =  tableData.map((el,i) => {
    let eleme = {
      srno:i+1,
      ...el
    };
    return (eleme)
  });
  const data = tdata.map((row, index) => {
    let rowData = [];
    let i = 0;

    for(const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key]
      });
      i++;
    } 
    return(
      <tr key={index}>
      {rowData.map((data, index) => {
        if(data.key==="profile"){
          return(
            <td key={index} data-heading={data.key}>
            <Link to={`/all-students/:${data.val}`}>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="ml-2 website-arrow-icon"
              />
            </Link>
            </td>
          )
        }
        return(
        <td key={index} data-heading={data.key}>{data.val}</td>
        )
      })}
    </tr>
    )
  });

  return(
    <div className="table-container">
      <div className="table-container__title">
        <h2>{title}</h2>
        {/* <button onClick={jsonToCsv} >Download Data</button> */}
        <ExportJsonCsv headers={headingColumnsCsv} items={tableData}>Download Data</ExportJsonCsv>
        
      </div>
      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large']) 
}

export default Table;