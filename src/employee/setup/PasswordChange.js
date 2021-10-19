import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import { Center, Box, Image, Button } from "@chakra-ui/react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { removeUserFromStorage } from '../../utility/functions'
import LoadingScreen from '../../utility/LoadingScreen'
import { updatePassword, updateProfilePic, updateUserDetails } from './functions'

export default function PasswordChange({ userDetails, userImage }) {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    function passwordCheck() {
        if (password === '') {
            alert('password fields cannot be empty.')
            return false
        }
        if (password !== password2) {
            alert("passwords do not match!")
            return false
        }
        return true
    }

    async function completeSetup() {
        if (passwordCheck()) {
            setLoading(true)
            try {
                const details = await updateUserDetails(userDetails)
                const img = await updateProfilePic(userImage)
                const passwordRes = await updatePassword(oldPassword, password2)
                if (details && img && passwordRes) {
                    alert('setup complete. log in with new password.')
                    history.push('/')
                    removeUserFromStorage(USER_STORAGE_KEY)
                    window.location.reload()
                } else {
                    let error = ''
                    if (!details) {
                        error += 'failed to save details.\n'
                    }
                    if (!img) {
                        error += 'failed to update image.\n'
                    }
                    if (!passwordRes) {
                        error += 'failed to update password.'
                    }
                    alert(`${error}`)
                    setLoading(false)
                    return
                }
            }
            catch (e) {
                console.log("error completing setup, ", e)
                setLoading(false)
                return
            }
        }
    }

    if (loading) {
        return <LoadingScreen message='updating details...' />
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
                <Input
                    id="old-pwd"
                    pr="4.5rem"
                    focusBorderColor="purple"
                    type='password'
                    placeholder='Old Password'
                    value={oldPassword}
                    onChange={(e) => { setOldPassword(e.target.value) }}
                />
                <br />
                <InputGroup size="md">
                    <Input
                        id="new-pwd"
                        pr="4.5rem"
                        focusBorderColor="purple"
                        mb="1rem"
                        type={show ? "text" : "password"}
                        placeholder="New password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <InputRightElement children={
                        <IconButton h="1.75rem" size="sm" onClick={handleClick}>{show ? <FaEyeSlash /> : <FaEye />}</IconButton>
                    } />
                </InputGroup>
                <br />
                <InputGroup size="md">
                    <Input
                        id="confirm-pwd"
                        pr="4.5rem"
                        focusBorderColor="purple"
                        mb="1rem"
                        type={show ? "text" : "password"}
                        placeholder="Confirm New password"
                        value={password2}
                        onChange={(e) => { setPassword2(e.target.value) }}
                    />
                    <InputRightElement children={
                        <IconButton h="1.75rem" size="sm" onClick={handleClick}>{show ? <FaEyeSlash /> : <FaEye />}</IconButton>
                    } />
                </InputGroup>
                <Button colorScheme="purple" variant="solid" m={2} onClick={completeSetup}>Confirm</Button>
            </Box>
        </Center>
    )
}
