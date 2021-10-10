import React, { useState } from 'react'
import LoadingScreen from '../../utility/LoadingScreen'
import PasswordChange from './PasswordChange'

export default function InitialSetup() {

    const [firstName, setFirstName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [dateOfBirth, setDob] =  useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')

    const [userData, setUserData] = useState(null)
    const [userImg, setUserImg] = useState(null)
    const [dataSaved, setDataSaved] = useState(false)


    function parseInput(fName, lName, dob, gender, address, contact){
        const user = {
            userFirstName : fName,
            userLastName : lName,
            userDob : dob,
            userGender : gender,
            userAddress : address,
            userContactNumber : contact
        }
        return user
    }

    function onImageSelect(event){
        let imageError = ''
        const image = event.target.files[0]
        const maxSize = 1000000
        if(image.size > maxSize){
            imageError += 'Please ensure file size less than 1MB.'
        }

        //if image has an error, do not save in state
        if(imageError !== ''){
            alert(`Image has the following issues; \n${imageError}`)
            return
        }
        const profilePicImage = new FormData()
        profilePicImage.append('file', image)
        setUserImg(profilePicImage)
    }

    function next(){
        let error = ''
        if(firstName===''){
            error +='First Name,'
            console.log("current error ->",error)
        }
        if(lastName===''){
            error+='Last Name,'
            console.log("current error ->",error)
        }
        if(dateOfBirth===''){
            error+='DOB,'
            console.log("current error ->",error)
        }
        if(gender===''){
            error+='Gender,'
        }
        if(address===''){
            error+='Address,'
        }
        if(contact===''){
            error+='Contact,'
        }
        if(userImg===null){
            error+='Profile picture'
        }
        if(error!==''){
            error+=' missing.'
            alert(`${error}`)
            return false
        }else{
            setUserData(parseInput(firstName,lastName,dateOfBirth,gender,address,contact))
            setDataSaved(true)
        }
    }

    if(dataSaved){
        return <PasswordChange userDetails={userData} userImage={userImg} />
    }

    return (
        <div>
            <h1>InitialSetup</h1>
            <input type='text' placeholder='First Name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>
            <input type='text' placeholder='Last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>
            <input type='text' placeholder='yyyy/mm/dd' value={dateOfBirth} onChange={(e)=>{setDob(e.target.value)}}></input>
            <input type='text' placeholder='m/f' value={gender} onChange={(e)=>{setGender(e.target.value)}}></input>
            <input type='text' placeholder='address' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
            <input type='text' placeholder='contact' value={contact} onChange={(e)=>{setContact(e.target.value)}}></input>
            <input type='file' name='file' accept="image/jpeg" onChange={onImageSelect}></input>
            <button onClick={next}>Next</button>
        </div>
    )
}
