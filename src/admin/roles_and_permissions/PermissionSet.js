import React, { useState } from 'react'
import { FormControl, FormLabel, Checkbox, Button } from "@chakra-ui/react"
import { parsePermissions } from './functions'

export default function PermissionSet({ permissionGroup, setPermissionGroup, name, open }) {

    const [permissions, setPermissions] = useState(permissionGroup)

    function handleChange(event) {
        const newPermissions = [...permissions]
        const permissionObject = permissions.filter((per) => per[0] === event.target.id)
        const indexOfPermission = permissions.indexOf(permissionObject[0])
        permissionObject[0][1].value ? permissionObject[0][1].value = false : permissionObject[0][1].value = true
        newPermissions.splice(indexOfPermission, 1, permissionObject[0])
        setPermissions(newPermissions)
    }

    //have to change this setGroupPermission(permissions) and handle new one from parent component
    function handleSaveTaskPerms() {
        const sendBack = parsePermissions(permissions)
        setPermissionGroup(sendBack)
        open(false)
    }


    return (
        <div>
            <>
                {permissions.map((perms) => {
                    return (
                        <FormControl id="email">
                            <FormLabel key={perms[0]} value={perms[1].value}
                                control={<Checkbox checked={perms[1].value} id={perms[0]} onChange={handleChange} />}
                                label={perms[1].description} />
                            {
                            /* <FormGroup>
                                <FormLabel key={perms[0]} value={perms[1].value}
                                    control={<Checkbox checked={perms[1].value} id={perms[0]} onChange={handleChange} />}
                                    label={perms[1].description} 
                                />
                            </FormGroup*/}
                        </FormControl>
                    )
                })}
                <Button colorScheme="purple" variant="solid" m={2} onClick={handleSaveTaskPerms} >Save {`${name}`} Permissions </Button>
                <Button colorScheme="purple" variant="solid" m={2} onClick={() => { open(false) }}> Close {`${name}`} Permissions</Button>
            </>
        </div>
    )
}
