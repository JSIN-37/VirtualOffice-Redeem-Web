/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Input, Text, Button } from "@chakra-ui/react"
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { getUserFromStorage } from '../../utility/functions'
import LoadingScreen from '../../utility/LoadingScreen'
import { updateProfileInfo } from '../profile/functions'
import { updateProfilePic } from '../setup/functions'

export default function EditProfile() {
    const history = useHistory()
    const user = getUserFromStorage(USER_STORAGE_KEY).user
    console.log(user)

    //render stuff
    const [loading, setLoading] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)
    const [changePic, setChangePic] = useState(false)
    const [message, setMessage] = useState('Updating....')

    //hold data
    const [userFirstName, setName] = useState(user && user.firstName)
    const [userLastName, setLname] = useState(user && user.lastName)
    const [userDob, setDob] = useState(user && user.dob)
    const [userGender, setGender] = useState(user && user.gender)
    const [userAddress, setAddr] = useState(user && user.address)
    const [userContactNumber, setContact] = useState(user && user.contactNumber)
    const [userImg, setUserImg] = useState(null)

    function handleChangeEmail() {
        const choice = window.confirm('This action will sign you out. Continue?')
        if (choice) {
            setChangeEmail(true)
        } else {
            return
        }
    }

    async function updateDetails() {
        setLoading(true)
        let updatedInfo = false
        let updatedPic = false
        const userInfo = {
            userFirstName, userLastName, userDob, userGender, userAddress, userContactNumber
        }
        try {
            const info = await updateProfileInfo(userInfo)
            if (info) {
                setMessage((msg) => msg + '\nupdated info.')
                updatedInfo = true
            }
        }
        catch (e) {
            console.log("error updating info", e)
            setMessage((msg) => msg + '\nError Updating info.')
        }
        try {
            const pic = await updateProfilePic(userImg)
            if (pic) {
                setMessage((msg) => msg + 'Updated Picture')
                updatedPic = true
            }
        }
        catch (e) {
            console.log("error updating pic", e)
            setMessage((msg) => msg + '\nError updating picture.')
        }
        alert('Changes Saved. You will be redirected to the login page.')
        localStorage.removeItem(USER_STORAGE_KEY)
        history.push('/employee/profile')
        window.location.reload()
    }

    if (loading) {
        return <LoadingScreen message={message} />
    }


    if (changePic) {
        return <ChangeProfilePic setPicture={setUserImg} open={setChangePic} />
    }

    if (changeEmail) {
        return <ChangeEmail />
    }

    return (
        <div>
            <Text variant="h4"> Edit profile </Text>
            <Input
                id="first-name"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="First Name"
                value={userFirstName}
                onChange={(e) => { setName(e.target.value) }}
            />
            <Input
                id="last-name"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="Last Name"
                value={userLastName} onChange={(e) => { setLname(e.target.value) }}
            />
            <Input
                id="dob"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="Date of Birth"
                value={userDob} onChange={(e) => { setDob(e.target.value) }}
            />
            <Input
                id="gender"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="Gender"
                value={userGender} onChange={(e) => { setGender(e.target.value) }}
            />
            <Input
                id="address"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="Address"
                value={userAddress} onChange={(e) => { setAddr(e.target.value) }}
            />
            <Input
                id="contact-num"
                isFullWidth
                pr="4.5rem"
                type="text"
                placeholder="Contact Number"
                value={userContactNumber} onChange={(e) => { setContact(e.target.value) }}
            />

            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setChangePic(true) }}>Change Profile Picture</Button>
            <Button colorScheme="purple" variant="solid" m={2} onClick={handleChangeEmail}>Change Email</Button>
            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setChangePic(true) }}>Change Profile Picture</Button>
        </div>
    )
}

export const ChangeProfilePic = ({ setPicture, open }) => {

    function onImageSelect(event) {
        let imageError = ''
        const image = event.target.files[0]
        const maxSize = 1000000
        if (image.size > maxSize) {
            imageError += 'Please ensure file size less than 1MB.'
        }

        //if image has an error, do not save in state
        if (imageError !== '') {
            alert(`Image has the following issues; \n${imageError}`)
            return
        }
        const profilePicImage = new FormData()
        profilePicImage.append('file', image)
        setPicture(profilePicImage)
        open(false)
    }

    return (
        <Input
            pr="4.5rem"
            type='file'
            name='file'
            accept="image/jpeg"
            onChange={onImageSelect}
        />
    )
}

export const ChangeEmail = () => {
    return (
        <Text variant="h4">Change email</Text>
    )
}
