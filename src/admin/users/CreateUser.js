import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react"
import LoadingScreen from "../../utility/LoadingScreen";
import { getDivisions } from "../divisions/functions";
import Autocomplete from "./../../utility/components/autocomplete/Autocomplete"
import InputField from "../other/InputField";
import { getRoles } from "../roles_and_permissions/functions";
import { createEmployee } from "./functions";

export default function CreateUser() {
    //inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState(null);

    //options for the dropdown menu
    const [divisionOptions, setDivisionOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);

    //loading screens
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchOptions();
        async function fetchOptions() {
            const divisions = await getDivisions();
            const roles = await getRoles();
            let error = "Failed to get ";
            !divisions ? (error += "divisions ") : (error += "");
            !roles ? (error += "and roles") : (error += "");
            if (!divisions || !roles) {
                alert(`${error}`);
                setLoading(false);
                return;
            }
            setDivisionOptions(divisions);
            setRoleOptions(roles);
            setLoading(false);
        }
        return () => {
            setRoleOptions([]);
            setDivisionOptions([]);
        };
    }, []);

    //save values from dropdown menu
    function selectDivision(div) {
        setSelectedDivision(div);
    }
    function selectRole(role) {
        setSelectedRole(role);
    }

    //validate input email 
    function validateEmail(mail) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        } else {
            setEmail('')
            return false;
        }
    }

    //bundle inputs and call createEmployee function
    async function createUser() {
        let error = "";


        if (!validateEmail(email)) {
            error += "email invalid.\n"
        }

        if (name === "") {
            error += "Please enter a name\n";
        }

        if (selectedRole === null) {
            error += "No role selected.\n";
        }
        if (selectedDivision === null) {
            error += "No division selected.\n";
        }

        if (error !== "") {
            alert(`${error}`);
            return;
        }

        const user = {
            userFirstName: name,
            userEmail: email,
            userDivisionId: selectedDivision.id,
            userRoleId: selectedRole.id,
        };

        setCreating(true);
        try {
            const response = await createEmployee(user);
            if (response) {
                alert("created user.");
                setCreating(false);
                return;
            } else {
                alert("failed.");
                setCreating(false);
                return;
            }
        } catch (e) {
            alert("error. check log.");
            console.log("create user catch ", e);
            setCreating(false);
            return;
        }
    }

    if (loading) {
        return <LoadingScreen message="getting organization details..." />;
    }

    if (creating) {
        return <LoadingScreen message="creating new user..." />;
    }

    const divs = divisionOptions.map((div)=>{return {id:div.id, label:div.name}})
    const roles = roleOptions.map((role)=>{return {id:role.id, label:role.name}})

    return (
        <div>
            <h1>Create User</h1>
            <InputField
                type="text"
                input={name}
                setInput={setName}
                placeholder="Name"
            />
            <InputField
                type="text"
                input={email}
                setInput={setEmail}
                placeholder="Email"
            />
            <Autocomplete
                options={divs}
                result={selectDivision}
            />
            <Autocomplete
                options={roles}
                result={selectRole}
            />
            <button onClick={createUser}>Create</button>
        </div>
    );
}
