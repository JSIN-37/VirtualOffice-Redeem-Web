import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppData } from '../../home/Home'
import { useHistory } from 'react-router'

export default function InitialSetup() {

    const {BACKEND_URL, token} = useContext(AppData)
    const history = useHistory()

    const [orgName, setOrgName] = useState('')
    const [orgCountry, setOrgCountry] = useState('')
    const [orgContact, setOrgContact] = useState('')
    const [orgAddress, setOrgAddress] = useState('')
    const [logo, setLogo] = useState(null)
    
    //render loading screen if this is true.
    const [dataSaved, setDataSaved] = useState(false)
    const [logoSaved, setLogoSaved] = useState(false)
    const [orgInfoSaved, setOrgInfoSaved] = useState(false)

    //after server responds okay to updating details, go to admin area.
    useEffect(()=>{
        if(logoSaved && orgInfoSaved){
            history.push('/admin')
        }
    },[logoSaved, orgInfoSaved])

    function onFileSelect(event){
        let imageError = ''
        const image = event.target.files[0]
        console.log(image.type)
        const maxSize = 1000000

        if(image.size > maxSize){
            imageError += 'Please ensure file size less than 1MB.'
        }

        //if image has an error, do not save in state
        if(imageError !== ''){
            alert(`Image has the following issues; \n${imageError}`)
            return
        }
        setLogo(image)
    }

    function handleSubmit(){
        if(logo === null){
            alert('no image is selected')
            return
        }

        let infoError =''

        if(orgName ===''){
            infoError += 'Organization Name is empty. Please Enter Name.\n'
        }
        if(orgCountry==''){
            infoError+='No country provided. Please provide country name.\n'
        }
        if(orgContact===''){
            infoError+='No contact number provided. Please provide one.\n'
        }
        if(orgAddress===''){
            infoError+='No address has been provided. Please provide organization address\n'
        }

        if(infoError!==''){
            alert(`${infoError}`)
            return
        }
        

        //organization data -> post to server
        const organizationData = {
            organizationName : orgName,
            organizationCountry: orgCountry,
            organizationContactNumber : orgContact,
            organizationAddress:orgAddress
        }

        //logo -> post to server
        const imageData = new FormData()
        imageData.append('file', logo )

        const config = { headers: { Authorization: `Bearer ${token}` } }

        axios.put(`${BACKEND_URL}/admin/organization-logo`,imageData , config)
        .then((res)=>{
            console.log('response from server -> set logo', res)
            if(res.status===200){
                setLogoSaved(true)
            }
        })
        .catch((err)=>{console.log(err)})

        axios.put(`${BACKEND_URL}/admin/organization-info`, organizationData, config)
        .then((res)=>{
            console.log("response from server -> set org info", res)
            if(res.status===200){
                setOrgInfoSaved(true)
            }
        })
        .catch((err)=>{console.log("Error updating organization details ", err)})

        setDataSaved(undefined)
    }


    return (
        <>
            {dataSaved===false && (
                <div>
                <input type='text' id='organizationName' placeholder='Name' value={orgName} onChange={(e)=>setOrgName(e.target.value)}></input>
                <input type='text' id='organizationCountry' placeholder='Country' value={orgCountry} onChange={(e)=>setOrgCountry(e.target.value)}></input>
                <input type='text' id='organizationContactNumber' placeholder='Contact' value={orgContact} onChange={(e)=>setOrgContact(e.target.value)}></input>
                <input type='text' id='organizationAddress' placeholder='Address' value={orgAddress} onChange={(e)=>setOrgAddress(e.target.value)}></input>
                <input type='file' name='file' accept="image/jpeg" onChange={onFileSelect}></input>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            )}

            {dataSaved === undefined && <LoadingScreen />}
        </>
    )
}


const LoadingScreen = () => {
    return(
        <div>
            <h1>loading screen.......</h1>
        </div>
    )
}
