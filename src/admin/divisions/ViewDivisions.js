import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { get_divisions_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getTokenFromStorage } from "../../utility/functions";
import InputField from "../other/InputField";
import { addDivision, deleteDivision, updateDivision } from "./functions";

export default function ViewDivisions() {
  const [divisions, setDivisions] = useState([]);

  //division data
  const [divisionName, setDivisionName] = useState("");
  const [divisionDescription, setDivDesc] = useState("");
  const [divisionID, setDivisionID] = useState("");

  //show / hide components
  const [renderAddDivision, setRenderAddDivision] = useState(false);
  const [renderEditDivision, setRenderEditDivision] = useState(false);

  useEffect(() => {
    const token = getTokenFromStorage(USER_STORAGE_KEY);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get(get_divisions_url, config)
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((er) => {
        console.log("error fetching all divisions ", er);
      });
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

  async function updateDivisionData(id){
    const data = {
        divisionName : divisionName,
        divisionDescription : divisionDescription
    }

    const success = await updateDivision(id, data)
    if(success){
        alert('updated successfully')
        window.location.reload()
    }else{
        alert('failed.')
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

  return (
    <>
      <div>
        <h1>View divisions</h1>
      </div>
      {divisions.length > 0 &&
        divisions.map((division) => {
          return (
            <div key={division.id}>
              {`id = ${division.id} name= ${division.name}`}
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
          <button onClick={()=>{updateDivisionData(divisionID)}}>confirm</button>
        </>
      )}
    </>
  );
}
