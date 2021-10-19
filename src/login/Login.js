import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Center, Box, Image, Text, Button } from "@chakra-ui/react"
import axios from 'axios'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { getTokenFromStorage, setUserToStorage } from '../utility/functions'
import { admin_login_url } from '../app_data/admin_urls'
import { employee_login_url } from '../app_data/employee_urls'
import LoadingScreen from '../utility/LoadingScreen'

export default function Login(props) {
    const history = useHistory()

    if (getTokenFromStorage(USER_STORAGE_KEY) !== '') {
        if (props.admin) {
            history.push('/admin')
        }
        if (props.employee) {
            history.push('/employee')
        }
    }

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    function logIn(url, credentials) {
        return new Promise(function (resolve, reject) {
            axios.post(url, credentials)
                .then((response) => {
                    if (response.status === 200) {
                        //resolve(response.data.token)
                        resolve(response.data)
                    }
                })
                .catch((er) => {
                    console.log("error loggin in ", er)
                    reject(false)
                })
        })
    }

    async function handleLogIn(url, credentials, destination) {
        setLoading(true)
        try {
            const res = await logIn(url, credentials)
            const user = res
            if (props.admin) {
                setUserToStorage(USER_STORAGE_KEY, user)
                window.location.assign(destination)
            }
            if (props.employee) {
                if (res.user.needsSetup === 1) {
                    setUserToStorage(USER_STORAGE_KEY, user)
                    window.location.assign('/employee/initial-login')
                } else {
                    setUserToStorage(USER_STORAGE_KEY, user)
                    window.location.assign(destination)
                }
            }
        }
        catch {
            console.log("error logging IN ")
        }
        setLoading(false)
    }

    function handleLogInButton() {
        if (props.admin) {
            const credentials = {
                password: password,
                rememberMe: true
            }
            handleLogIn(admin_login_url, credentials, `http://localhost:3000/admin`)
            return
        }
        if (props.employee) {
            const credentials = {
                email: email,
                password: password,
                rememberMe: true
            }
            handleLogIn(employee_login_url, credentials, `http://localhost:3000/employee`)

        }

    }

    if (loading) {
        return <LoadingScreen message={'checking details...'} />
    }

    return (
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
                <Text fontSize="lg"> Sign in </Text>
                {props.employee &&
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
                }
                <br />
                <InputGroup size="md">
                    <Input
                        id="password-input"
                        w="auto"
                        pr="4.5rem"
                        focusBorderColor="purple"
                        mb="1rem"
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
                <Button colorScheme="purple" variant="solid" m={2} onClick={handleLogInButton}>Login</Button>
            </Box>
        </Center>
    )
}
