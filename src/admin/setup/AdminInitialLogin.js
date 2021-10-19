import React, { useState } from 'react'
import axios from 'axios'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Center, Box, Image, Text, Button } from "@chakra-ui/react"
import { setTokenToStorage } from '../../utility/functions';
import { USER_STORAGE_KEY } from '../../app_data/constants';
import { admin_login_url } from '../../app_data/admin_urls';

export default function AdminInitialLogin({ setSignedIn }) {
    const [password, setPassword] = useState('')

    function signIn() {
        axios.post(admin_login_url, { password: password, rememberMe: true })
            .then((res) => {
                if (res.data.token !== '') {
                    const user = { token: res.data.token }
                    setTokenToStorage(USER_STORAGE_KEY, user)
                    setSignedIn(true)
                }
            })
            .catch((err) => {
                console.log("Error loggin in ", err.data)
                alert('error logging in')

            })
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

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
                <Text fontSize="lg"> Welcome Admin </Text>
                <Text fontSize="md"> Enter your password to sign in </Text>
                <InputGroup size="md">
                    <Input
                        id="password-input"
                        w="auto"
                        pr="4.5rem"
                        focusBorderColor="purple"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button colorScheme="purple" variant="solid" m={2} onClick={signIn}>Login</Button>
            </Box>
        </Center>
    )
}
