import "./App.css";

import Papa from "papaparse";
import React, { useState, useEffect } from "react";
function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [hideAge, setHideAge] = useState(false);
  const [hideNationality, setHideNationality] = useState(false);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      // header: true,
      // skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        console.log(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        console.log("row array", rowsArray);

        // Filtered Values
        setValues(valuesArray);

        console.log("value array", values);
      },
    });
  };

  const newArr = [];
  return (
    // <>
    //   <h1>Select file </h1>

    //   {/* <input type={"file"} onChange={(e) => setMyfile(e.target.files[0])} /> */}
    //   {/* <input type={"file"} onChange={(e) => setMyfile(e.target.files[0])} /> */}
    //   <input type={"file"} onChange={changeHandler} />

    //   <button
    //     onClick={() => {
    //       // console.log(myfile);
    //       // parseCSVData();
    //       // // parsingString();
    //       // Papa.parse(CSVData, {
    //       //   ...commonConfig,
    //       //   complete: (result) => {
    //       //     setParsedString(result.data);
    //       //   },
    //       // });
    //       // console.log("parsingString", parsedString);
    //     }}
    //   >
    //     clic
    //   </button>
    // </>

    <>
      <div>
        {/* File Uploader */}

        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        {/* Table */}

        <div className="fp">
          <div className="hideAndShow">
            <p1>Show and Hide columns</p1>

            <br></br>

            <label for="age">Age</label>

            <input
              type="checkbox"
              name="age"
              checked={hideAge}
              onChange={() => setHideAge(!hideAge)}
            />
            <br></br>

            <label for="Nationality">Nationality</label>

            <input
              type="checkbox"
              name="Nationality"
              checked={hideNationality}
              onChange={() => setHideNationality(!hideNationality)}
            />
          </div>
          {/* <div className="range">
            <p1>range filter</p1>

            <br></br>

            <label for="age">Age</label>

            <input
              type="range"
              name="age"
          
            />
            <br></br>
          </div> */}
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                if (index == 0) {
                  return null;
                }
                //

                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
