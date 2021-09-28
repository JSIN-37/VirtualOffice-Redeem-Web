import React, {  useState } from 'react'
import AdminPasswordChange from './AdminPasswordChange'

export default function InitialSetup() {

    //inputs and logo
    const [orgName, setOrgName] = useState('')
    const [orgCountry, setOrgCountry] = useState('')
    const [orgContact, setOrgContact] = useState('')
    const [orgAddress, setOrgAddress] = useState('')
    const [logo, setLogo] = useState(null)

    //what to send to server. set on clicking next button.
    const [logoData, setLogoData ] = useState(null)
    const [orgData, setOrgData] = useState(null)
    
    // render change admin password if this is true
    const [dataSaved, setDataSaved] = useState(false)

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
        if(orgCountry===''){
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
        

        //organization data to send to server.
        const organizationData = {
            organizationName : orgName,
            organizationCountry: orgCountry,
            organizationContactNumber : orgContact,
            organizationAddress:orgAddress
        }

        //logo data to send to server.
        const imageData = new FormData()
        imageData.append('file', logo )

        //store logo data and org data objects in state.
        setLogoData(imageData)
        setOrgData(organizationData)
        setDataSaved(true) 
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

            {dataSaved === true && <AdminPasswordChange logo={logoData} orgDeet={orgData}/>}
        </>
    )
}


