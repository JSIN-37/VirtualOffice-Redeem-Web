/*eslint-disable no-unused-vars*/
import React, { useState } from 'react'
import { Text, Button } from "@chakra-ui/react"

export default function InspectRole({ permissions, name, id, open }) {
    const [docPerms, setDocPerms] = useState(permissions.documentPermissions)
    const [personalTaskPerms, setPersonalTaskPerms] = useState(permissions.personalTaskPermissions)
    const [ownDivTasks, setOwnDivTasks] = useState(permissions.ownDivisionTaskPermissions)
    const [allDivTasks, setAllDivTasks] = useState(permissions.allDivisionsTaskPermissions)
    const [teamPerms, setTeamPerms] = useState(permissions.teamPermissions)
    return (
        <>
            <Text fontSize="md">{`Role Name : ${name}  Role ID : ${id}`}</Text>
            {docPerms && <div>{`doc permissions : ${JSON.stringify(docPerms)}`}</div>}
            {personalTaskPerms && <div>{`personal task : ${JSON.stringify(personalTaskPerms)}`}</div>}
            {ownDivTasks && <div>{`own div : ${JSON.stringify(ownDivTasks)}`}</div>}
            {allDivTasks && <div>{`all div : ${JSON.stringify(allDivTasks)}`}</div>}
            {teamPerms && <div>{`teams : ${JSON.stringify(teamPerms)}`}</div>}
            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { open(false) }}>Close</Button>
        </>
    )
}
