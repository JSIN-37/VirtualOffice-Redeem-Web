import React from 'react'
import { Center, Text, Button } from "@chakra-ui/react"

export default function UserPermissionsView({ permissions, open }) {
    return (
        <div>
            <Center>
                <Text fontSize="md" m={2} gutterBottom>
                    {JSON.stringify(permissions)}
                </Text>
            </Center>
            <Button colorScheme="purple" variant="solid" m={2} onClick={() => open(false)}>Close</Button>
        </div>
    )
}
