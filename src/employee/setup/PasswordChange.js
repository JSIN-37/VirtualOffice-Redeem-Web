import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { removeUserFromStorage } from '../../utility/functions'
import LoadingScreen from '../../utility/LoadingScreen'
import { updatePassword, updateProfilePic, updateUserDetails } from './functions'

export default function PasswordChange({userDetails, userImage}) {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const[oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    function passwordCheck(){
        if(password===''){
            alert('password fields cannot be empty.')
            return false
        }
        if(password!==password2){
            alert("passwords do not match!")
            return false
        }
        return true
    }

    async function completeSetup(){
        if(passwordCheck()){
            setLoading(true)
            try{
                const details = await updateUserDetails(userDetails)
                const img = await updateProfilePic(userImage)
                const passwordRes = await updatePassword(oldPassword,password2)
                if(details && img && passwordRes){
                    alert('setup complete. log in with new password.')
                    history.push('/')
                    removeUserFromStorage(USER_STORAGE_KEY)
                    window.location.reload()
                }else{
                    let error = ''
                    if(!details){
                        error+='failed to save details.\n'
                    }
                    if(!img){
                        error+='failed to update image.\n'
                    }
                    if(!passwordRes){
                        error+='failed to update password.'
                    }
                    alert(`${error}`)
                    setLoading(false)
                    return
                }
            }
            catch(e){
                console.log("error completing setup, ",e)
                setLoading(false)
                return
            }
        }
    }

    if(loading){
        return <LoadingScreen message='updating details...'/>
    }

    return (
        <div>
            <input type='text' placeholder='old password' value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}}/>
            <input type='text' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type='text' placeholder='confirm password' value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
            <button onClick={completeSetup}>Update</button>
        </div>
    )
}
