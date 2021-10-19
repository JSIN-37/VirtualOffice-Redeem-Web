import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react"
import InputField from "../other/InputField";
import { addDivision, deleteDivision, getDivisions, updateDivision } from "./functions";
import Autocomplete from "../../utility/components/autocomplete/Autocomplete";
import LoadingScreen from "../../utility/LoadingScreen";
export default function ViewDivisions() {
    const [divisions, setDivisions] = useState([]);
    //haha
    const [oneDivision, setOneDivision] = useState(false);

    //division data
    const [divisionName, setDivisionName] = useState("");
    const [divisionDescription, setDivDesc] = useState("");
    const [divisionID, setDivisionID] = useState("");

    //show / hide components
    const [loading, setLoading] = useState(true)
    const [renderAddDivision, setRenderAddDivision] = useState(false);
    const [renderEditDivision, setRenderEditDivision] = useState(false);

    useEffect(() => {
        fetchDivisions()
        async function fetchDivisions() {
            const divisions = await getDivisions()
            if (!divisions) {
                alert("failed to load divisions!")
                setLoading(false)
                return
            } else {
                setDivisions(divisions)
                setLoading(false)
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

    function handleResult(divisionOption) {
        if (divisionOption === null) {
            setOneDivision(false)
        } else {
            const division = divisions.filter((div) => div.id === divisionOption.id)
            setOneDivision(division[0])
        }
    }


    const x = divisions.map((div) => { return { id: div.id, label: div.name } })

    if (loading) {
        return <LoadingScreen message={'Getting divisions...'} />
    }
    return (
        <>
            <div>
                <h1>View divisions</h1>
                <Autocomplete options={x} result={handleResult} />
                <br />
                <br />
            </div>
            {divisions.length > 0 && !oneDivision &&
                divisions.map((division) => {
                    return (
                        <div key={division.id}>
                            {`id = ${division.id} name= ${division.name} desc=${division.description}`}
                            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { handleDivisionEdit(division); }} > Edit This Division</Button>
                            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { handleDivisionDelete(division.id); }} > Delete This Division</Button>
                        </div>
                    );
                })}

            {oneDivision && (
                <>
                    <div>
                        {`id = ${oneDivision.id} name=${oneDivision.name} desc=${oneDivision.description}`}
                        <Button colorScheme="purple" variant="solid" m={2} onClick={() => { handleDivisionEdit(oneDivision); }} > Edit This Division</Button>
                        <Button colorScheme="purple" variant="solid" m={2} onClick={() => { handleDivisionDelete(oneDivision.id); }} > Delete This Division</Button>
                        <br />
                        <br />
                    </div>
                </>
            )}


            <div>
                <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setRenderAddDivision(true); }} > Add Division</Button>
                <Button colorScheme="purple" variant="solid" m={2} > Delete A division</Button>
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
                    <Button colorScheme="purple" variant="solid" m={2} onClick={handleDivisionAdd}>Add Division</Button>
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
                    <Button colorScheme="purple" variant="solid" m={2} onClick={() => { updateDivisionData(divisionID); }}  > Confirm</Button>
                </>
            )}
        </>
    );
}
