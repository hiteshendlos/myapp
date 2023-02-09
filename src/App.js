import "./App.css";

import Papa from "papaparse";
import React, { useState, useEffect } from "react";
function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [hideAge, setHideAge] = useState(false);
  const [hideNationality, setHideNationality] = useState(false);
  const [squad, setSquad] = useState(false);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(null);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
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

  function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(args) {
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
      data: args.data,
    });
    if (csv == null) return;

    filename = args.filename || "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = "data:text/csv;charset=utf-8," + csv;
    }
    data = encodeURI(csv);

    link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    link.click();
  }
  // const newArr = [];

  const OnEveryChange = () => {
    console.log({ maxDuration });
    console.log({ minDuration });
    let global = [];
    parsedData.map((originalObject, i) => {
      // let excludedKeys = ["Age", "Nation"];
      let excludedKeys = [];

      !hideAge && excludedKeys.push("Age");
      !hideNationality && excludedKeys.push("Nation");
      !squad && excludedKeys.push("Squad");

      let newObject = {};

      for (let key in originalObject) {
        if (!excludedKeys.includes(key)) {
          newObject[key] = originalObject[key];
        }
      }

      if (
        Number(minDuration) < newObject.Min

        // &&
        // (maxDuration > 0 || maxDuration != null
        //   ? newObject.Min < Number(maxDuration)
        //   : true)
      ) {
        // console.log(newObject.Min);
        global.push(newObject);
      }

      // console.log(Number(minDuration));
      // console.log(Number(maxDuration));

      // if (newObject.Min > Number(minDuration) && newObject.Min < 1000) {
      //   console.log(newObject.Min);
      //   global.push(newObject);
      // }
    });

    const rowsArray = [];
    const valuesArray = [];

    // Iterating data to get column name and their values
    global.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    // Filtered Column Names
    setTableRows(rowsArray[0]);

    // console.log("row array", rowsArray);

    // Filtered Values
    setValues(valuesArray);

    // console.log("value array", values);
  };

  return (
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
              onChange={() => {
                setHideAge(!hideAge);
                OnEveryChange();
              }}
            />
            <br></br>

            <label for="Nationality">Nationality</label>

            <input
              type="checkbox"
              name="Nationality"
              checked={hideNationality}
              onChange={() => {
                setHideNationality(!hideNationality);
                OnEveryChange();
              }}
            />
            <br></br>
            <label for="Nationality">Squad</label>

            <input
              type="checkbox"
              name="Nationality"
              checked={squad}
              onChange={() => {
                setSquad(!squad);
                OnEveryChange();
              }}
            />
          </div>

          <div className="hideAndShow">
            <p>players who have played</p>

            <div>
              Min Duration
              <input
                type={"number"}
                value={minDuration}
                onChange={(e) => {
                  setMinDuration(e.target.value);

                  console.log(e.target.value < 10);

                  console.log(minDuration);

                  // OnEveryChange();
                }}
              />
            </div>
            <div>
              Maximum Duration{" "}
              <input
                type={"number"}
                value={maxDuration}
                onChange={(e) => {
                  setMaxDuration(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                console.log("min", Number(minDuration));
                console.log(
                  "max",
                  Number(maxDuration) < 1000 ? "true" : "myfalse"
                );
              }}
            >
              Download csv
            </button>
          </div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                {tableRows &&
                  tableRows.map((rows, index) => {
                    return <th key={index}>{rows}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              {values &&
                values.map((value, index) => {
                  // if (index == 0) {
                  //   return null;
                  // }
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
