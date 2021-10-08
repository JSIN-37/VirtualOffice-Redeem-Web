import { Autocomplete,  TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../other/InputField";
import { addDivision, deleteDivision, getDivisions, updateDivision } from "./functions";

export default function ViewDivisions() {
  const [divisions, setDivisions] = useState([]);
  //haha
  const [oneDivision, setOneDivision] = useState(false);

  //division data
  const [divisionName, setDivisionName] = useState("");
  const [divisionDescription, setDivDesc] = useState("");
  const [divisionID, setDivisionID] = useState("");

  //show / hide components
  const [renderAddDivision, setRenderAddDivision] = useState(false);
  const [renderEditDivision, setRenderEditDivision] = useState(false);

  useEffect(() => {
    fetchDivisions()
    async function fetchDivisions(){
      const divisions = await getDivisions()
      if(!divisions){
        return
      }else{
        setDivisions(divisions)
      }
    }
    return () => {
      setDivisions([]);
    };
  }, []);

  async function handleDivisionAdd() {
    console.log("addin ");
    const data = {
      divisionName: divisionName,
      divisionDescription: divisionDescription,
    };

    const success = await addDivision(data);
    if (success) {
      alert("division added.");
      window.location.reload();
    }
  }

  function handleDivisionEdit(division) {
    setDivisionName(division.name);
    setDivDesc(division.description);
    setDivisionID(division.id);
    console.log("edit func ", division);
    setRenderEditDivision(true);
  }

  async function updateDivisionData(id) {
    const data = {
      divisionName: divisionName,
      divisionDescription: divisionDescription,
    };

    const success = await updateDivision(id, data);
    if (success) {
      alert("updated successfully");
      window.location.reload();
    } else {
      alert("failed.");
    }
  }

  async function handleDivisionDelete(key) {
    try {
      const success = await deleteDivision(`${key}`);
      if (success === true) {
        alert("division deleted.");
        window.location.reload();
      }
    } catch {
      console.log("error deleting division.");
      alert("Cannot delete division if employees are assigned.");
    }
  }

  function logValue(event,value){
    setOneDivision(value)
  }

  return (
    <>
      <div>
        <h1>View divisions</h1>

        <Autocomplete
          options={divisions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Division Name" />
          )}
          onChange={logValue}
        />
        <br />
        <br />
        <br />
      </div>
      {divisions.length > 0 && !oneDivision &&
        divisions.map((division) => {
          return (
            <div key={division.id}>
              {`id = ${division.id} name= ${division.name} desc=${division.description}`}
              <button
                onClick={() => {
                  handleDivisionEdit(division);
                }}
              >
                edit this division
              </button>
              <button
                onClick={() => {
                  handleDivisionDelete(division.id);
                }}
              >
                delete this division
              </button>
            </div>
          );
        })}

        {oneDivision &&  (
          <>
            <div>
              {`id = ${oneDivision.id} name=${oneDivision.name} desc=${oneDivision.description}`}
              <button
                onClick={() => {
                  handleDivisionEdit(oneDivision);
                }}
              >
                edit this division
              </button>
              <button
                onClick={() => {
                  handleDivisionDelete(oneDivision.id);
                }}
              >
                delete this division
              </button>
              <br/>
              <br/>
            </div>
          </>
        )}


      <div>
        <button
          onClick={() => {
            setRenderAddDivision(true);
          }}
        >
          Add division
        </button>
        <button>Delete A division</button>
      </div>

      {renderAddDivision && (
        <>
          <InputField
            type={`text`}
            placeholder={`name`}
            input={divisionName}
            setInput={setDivisionName}
          />
          <InputField
            type={`text`}
            placeholder={`description`}
            input={divisionDescription}
            setInput={setDivDesc}
          />
          <button onClick={handleDivisionAdd}>Add Division</button>
        </>
      )}

      {renderEditDivision && (
        <>
          {console.log("in edit, div ", divisionName, divisionDescription)}
          <InputField
            type={`text`}
            input={divisionName}
            setInput={setDivisionName}
          />
          <InputField
            type={`text`}
            input={divisionDescription}
            setInput={setDivDesc}
          />
          <button
            onClick={() => {
              updateDivisionData(divisionID);
            }}
          >
            confirm
          </button>
        </>
      )}
    </>
  );
}
