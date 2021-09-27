import React, { useState } from 'react'

export default function InitialSetup() {

    const [orgName, setOrgName] = useState('')
    const [orgCountry, setOrgCountry] = useState('')
    const [orgContact, setOrgContact] = useState('')
    const [orgAddress, setOrgAddress] = useState('')
    const [logo, setLogo] = useState(null)
    
    let imageError = ''

    function onFileSelect(event){
        const image = event.target.files[0]
        console.log(image.type)
        const maxSize = 1000000

        // if(image.type !== 'image/jpeg'){
        //     imageError = 'Please select JPEG filetype. '
        // }

        if(image.size > maxSize){
            imageError += 'Please ensure file size less than 1MB.'
        }

        //if image has an error, do not save in state
        if(imageError !== ''){
            alert(`Image has the following issues; \n${imageError}`)
            return
        }
        setLogo(image)
        console.log("Image saved in state", logo)
    }


    function clicker(){
        console.log(orgName, orgContact, orgCountry, orgAddress)
    }



    function handleSubmit(){
        if(logo === null){
            alert('no image is selected')
            return
        }

        //organization data -> post to server
        const organizationData = new FormData()
        organizationData.append('organizationName', orgName)
        organizationData.append('organizationCountry', orgCountry)
        organizationData.append('organizationContact',orgContact)
        organizationData.append('organizationAddress', orgAddress)

        //logo -> post to server
        const imageData = new FormData()
        imageData.append('logo', logo )

        for (var value of organizationData.values()){
            console.log(value)
        }

        console.log(imageData.get('logo'))
    }


    return (
        <div>
            <input type='text' id='organizationName' placeholder='Name' value={orgName} onChange={(e)=>setOrgName(e.target.value)}></input>
            <input type='text' id='organizationCountry' placeholder='Country' value={orgCountry} onChange={(e)=>setOrgCountry(e.target.value)}></input>
            <input type='text' id='organizationContactNumber' placeholder='Contact' value={orgContact} onChange={(e)=>setOrgContact(e.target.value)}></input>
            <input type='text' id='organizationAddress' placeholder='Address' value={orgAddress} onChange={(e)=>setOrgAddress(e.target.value)}></input>
            <input type='file' name='file' accept="image/jpeg" onChange={onFileSelect}></input>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={clicker}>clicker</button>
        </div>
    )
}
