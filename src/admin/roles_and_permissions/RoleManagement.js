/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from "react";
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

    return(()=>{
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
      <h1>Rolls</h1>
      <button
        onClick={() => {
          setCreateRole(true);
        }}
      >
        Create new role
      </button>
      {roles.length > 0 &&
        roles.map((role) => {
          return (
            <div key={role.id}>
              {`role id = ${role.id} role name= ${role.name} role desc= ${role.description}`}
              <button
                onClick={() => {
                  setInspect(role);
                }}
              >
                inspect
              </button>
              <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
              <button
                onClick={() => {
                  setEdit(role);
                }}
              >
                Edit Role
              </button>
              <br />
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
