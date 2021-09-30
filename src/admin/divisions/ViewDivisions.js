import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { get_divisions_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getTokenFromStorage } from "../../utility/functions";
import InputField from "../other/InputField";
import { addDivision, deleteDivision } from "./functions";

export default function ViewDivisions() {
  const [divisions, setDivisions] = useState([]);

  //use ref for add division
  const divisionName = useRef("");
  const divisionDescription = useRef("");

  //show / hide components
  const [renderAddDivision, setRenderAddDivision] = useState(false);

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
      divisionName: divisionName.current,
      divisionDescription: divisionDescription.current,
    };

    const success = await addDivision(data);
    if (success) {
      alert("division added.");
      window.location.reload();
    }
  }

  async function handleDivisionDelete(key){
      let success = ''
      try{
        success = await deleteDivision(`${key}`)
        if(success === true){
            alert('division deleted.')
            window.location.reload()
        }
    }
    catch{
        console.log("error deleting division.")
        alert('Cannot delete division if employees are assigned.')
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
              <button onClick={()=>{handleDivisionDelete(division.id)}}>delete this division</button>
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
        <button>edit division</button>
      </div>

      {renderAddDivision && (
        <>
          <InputField type={`text`} placeholder={`name`} input={divisionName} />
          <InputField
            type={`text`}
            placeholder={`description`}
            input={divisionDescription}
          />
          <button onClick={handleDivisionAdd}>Add Division</button>
        </>
      )}
    </>
  );
}
