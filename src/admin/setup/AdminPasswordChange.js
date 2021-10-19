import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Center, Box, Image, Text, Button } from "@chakra-ui/react"
import axios from 'axios'
import { useHistory } from 'react-router'
import LoadingScreen from '../../utility/LoadingScreen'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { getTokenFromStorage, removeUserFromStorage } from '../../utility/functions'
import { update_org_url, update_logo_url, admin_pass_update_url } from '../../app_data/admin_urls'

export default function AdminPasswordChange({ logo, orgDeet }) {
    const history = useHistory()

    //inputs and 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    //use passwordMatch to display an error? otherwise can remove this.
    //const [passwordMatch, setMatch] = useState(undefined)

    const [loading, setLoading] = useState(false)

    function submit() {
        if (password !== password2) {
            //setMatch(false)
            alert('passwords dont match bruh')
            return
        }

        setLoading(true)

        //post to server
        //first update details, then logo, then update password.
        const tokenx = getTokenFromStorage(USER_STORAGE_KEY)
        const config = { headers: { Authorization: `Bearer ${tokenx}` } }
        const data = { adminEmail: email, adminPassword: password }

        //update org details
        axios.put(update_org_url, orgDeet, config)
            .then((response) => {
                console.log("details updates in server -> ", response)
                if (response.status === 200) {
                }
                return axios.put(update_logo_url, logo, config)
            })
            .then((response) => {
                console.log("success updating logo. ", response)
                if (response.status === 200) {
                }
                return axios.put(admin_pass_update_url, data, config)
            })
            .then((response) => {
                console.log("updated password. ", response)
                if (response.status === 200) {
                    alert('password updated. please log in again.')
                    history.push('/')
                    removeUserFromStorage(USER_STORAGE_KEY)
                    window.location.reload()
                }
            })
            .catch((er) => {
                console.log('error updating details. ', er)
            })
    }

    return (
        <>
            {!loading && (
                <Center h="100vh">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        w="28%"
                        boxShadow="lg"
                        borderRadius="20px"
                        overflow="hidden" p={10} >
                        <Box boxSize="90px">
                            <Image
                                objectFit="cover"
                                src="https://raw.githubusercontent.com/JSIN-37/VirtualOffice-Redeem-Web/main/src/img/logo.png"
                                alt="logo"
                                mt={2}
                            />
                        </Box>
                        <Text gutterBottom variant="h4" >
                            Change Password
                        </Text>
                        <Input
                            id="email-input"
                            w="auto"
                            pr="4.5rem"
                            focusBorderColor="purple"
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <InputGroup size="md">
                            <Input
                                id="password-input"
                                w="auto"
                                focusBorderColor="purple"
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <br />
                        <InputGroup size="md">
                            <Input
                                id="password-input"
                                w="auto"
                                pr="4.5rem"
                                focusBorderColor="purple"
                                type={show ? "text" : "password"}
                                placeholder='Confirm Password'
                                value={password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button colorScheme="purple" variant="solid" m={2} onClick={submit}>Submit</Button>
                    </Box>
                </Center>
            )}

            {loading && <LoadingScreen message='Updating Details...' />}
        </>
    )
}
