import { Text } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../utility/LoadingScreen'
import { getDivisions } from '../divisions/functions'
import { getRoles } from '../roles_and_permissions/functions'
import { updateEmployee } from './functions'
import UserPermissionsView from './UserPermissionsView'
import Autocomplete from '../../utility/components/autocomplete/Autocomplete'
export default function UserCard({ user, division, role }) {
    const [moreDetails, setMoreDetails] = useState(false)
    const [changeRole, setChangeRole] = useState(false)
    const [changeDivision, setChangeDivision] = useState(false)
    const [modified, setModified] = useState(false)
    const [updating, setUpdating] = useState(false)

    function updateUser(attribute, value) {
        switch (attribute) {
            case 'division':
                user.DivisionId = value
                break
            case 'role':
                user.RoleId = value
                break;
            default:
                break;
        }

    }

    async function saveUpdates() {
        setUpdating(true)
        const data = {
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userDivisionId: user.DivisionId,
            userRoleId: user.RoleId,
        }
        try {
            const res = await updateEmployee(data, user.id)
            if (res) {
                alert('success')
                setModified(false)
                window.location.reload()
                return
            } else {
                alert('failed')
                setUpdating(false)
                return
            }
        }
        catch (e) {
            console.log('error updating, ', e)
            setUpdating(false)
            return
        }
    }


    function view() {
        console.log(user)
    }

    if (updating) {
        return <LoadingScreen message='updating user details...' />
    }

    return (
        <div>
            <Text>{`Name   : ${user.firstName} ${user.lastName}`}</Text>
            <Text>{`Email: ${user.email}`}</Text>
            <Text>{`Division : ${division[0].name}`}</Text>
            <Text>{`Role : ${role[0].name}`}</Text>
            <button onClick={() => setChangeRole(true)}>Change Role</button>
            <button onClick={() => setChangeDivision(true)}>Change Division</button>
            {moreDetails && <UserPermissionsView permissions={user.permissions} open={setMoreDetails} />}
            {!moreDetails && <button onClick={(e) => { setMoreDetails(true) }}>More Details</button>}
            {modified && <button onClick={saveUpdates}>Update User</button>}
            {changeRole && <ChangeRole currentRole={role[0].name} open={setChangeRole} update={updateUser} modified={setModified} />}
            {changeDivision && <ChangeDivision currentDivision={division[0].name} open={setChangeDivision} update={updateUser} modified={setModified} />}
            <button onClick={view}>View</button>
            <br />
        </div>
    )
}


export const ChangeRole = ({ currentRole, open, update, modified }) => {

    const [roleOptions, setRoleOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [newRole, setNewRole] = useState(null)
    //for autocomplete
    const options = roleOptions.map((option) => { return { id: option.id, label: option.name } })
    useEffect(() => {
        fetchRoles()
        async function fetchRoles() {
            try {
                const roles = await getRoles()
                if (roles) {
                    setRoleOptions(roles)
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    return
                }
            }
            catch (e) {
                console.log("error fetching divsm ", e)
                setLoading(false)
                return
            }
        }
        return (() => {
            setRoleOptions([])
        })
    }, [])

    function handleSave() {
        update('role', newRole.id)
        open(false)
        modified(true)
    }

    if (loading) {
        return <LoadingScreen message='Loading Options' />
    }

    return (
        <>
            <h3>Current Role : {currentRole}</h3>
            <Autocomplete options={options} result={setNewRole} />
            {newRole && <button onClick={handleSave}>Save</button>}
        </>
    )
}


export const ChangeDivision = ({ currentDivision, open, update, modified }) => {
    const [divisionOptions, setDivisionOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [newDivision, setNewDivision] = useState(null)
    const options = divisionOptions.map((div) => { return { id: div.id, label: div.name } })
    useEffect(() => {
        fetchDivisions()
        async function fetchDivisions() {
            try {
                const divisions = await getDivisions()
                if (divisions) {
                    setDivisionOptions(divisions)
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    return
                }
            }
            catch (e) {
                console.log("error fetching divsm ", e)
                setLoading(false)
                return
            }
        }
        return (() => {
            setDivisionOptions([])
        })
    }, [])

    function handleSave() {
        update('division', newDivision.id)
        open(false)
        modified(true)
    }


    if (loading) {
        return <LoadingScreen message='Loading Options' />
    }

    return (
        <>
            <h3>Current Division : {currentDivision}</h3>
            <Autocomplete options={options} result={setNewDivision} />
            {newDivision && <button onClick={handleSave}>Save</button>}
        </>
    )
}
