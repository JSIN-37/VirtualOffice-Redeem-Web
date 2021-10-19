/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from "react";
import { Text, Button } from "@chakra-ui/react"
import LoadingScreen from "../../utility/LoadingScreen";
import CreateRole from "./CreateRole";
import InspectRole from "./InspectRole";
import { deleteRole, getRoles } from "./functions";

export default function RoleManagement() {
    //rendering components
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [roles, setRoles] = useState([]);
    const [inspect, setInspect] = useState(null);
    const [edit, setEdit] = useState(null);
    const [createRole, setCreateRole] = useState(false);

    useEffect(() => {
        fetchRoles();
        async function fetchRoles() {
            setLoading(true)
            const roles = await getRoles();
            if (!roles) {
                setLoading(false)
            } else {
                setRoles(roles);
                setLoading(false)
            }
        }

        return (() => {
            setRoles([])
        })
    }, []);

    async function handleDeleteRole(id) {
        setDeleting(true);
        try {
            const success = await deleteRole(`${id}`);
            if (success === true) {
                alert("deleted role.");
                window.location.reload();
            }
        } catch {
            alert("couldnt delete division.");
            setDeleting(false);
        }
    }

    if (deleting) {
        return <LoadingScreen message={`deleting role...`} />;
    }

    if (loading) {
        return <LoadingScreen message={"fetching roles"} />;
    }
    return (
        <>
            <Text fontSize="lg">Roles</Text>
            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setCreateRole(true); }} >Create New Role</Button>

            {roles.length > 0 &&
                roles.map((role) => {
                    return (
                        <div key={role.id}>
                            {`role id = ${role.id} role name= ${role.name} role desc= ${role.description}`}
                            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setInspect(role); }}>Inspect</Button>
                            <Button colorScheme="purple" variant="solid" m={2} onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setEdit(role); }} > Edit Role</Button>
                            <br />
                            <br />
                        </div>
                    );
                })}
            {inspect && (
                <InspectRole
                    permissions={inspect.permissions}
                    name={inspect.name}
                    id={inspect.id}
                    open={setInspect}
                />
            )}
            {createRole && (
                <CreateRole open={setCreateRole} version={`Create New Role`} />
            )}
            {edit && (
                <CreateRole open={setEdit} edit={edit} version={`Edit existing Role`} />
            )}
        </>
    );
}
