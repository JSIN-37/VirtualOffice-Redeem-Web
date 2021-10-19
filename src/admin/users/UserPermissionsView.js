import React from 'react'
import { Center, Text, } from "@chakra-ui/react"

export default function UserPermissionsView({ permissions, open }) {
    return (
        <div>
            <Center>
                <Text fontSize="md" m={2} gutterBottom>
                    {JSON.stringify(permissions)}
                </Text>
            </Center>
            <button onClick={() => open(false)}>close</button>
        </div>
    )
}
