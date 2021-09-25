import React, {useState, useEffect} from 'react'
import axios from 'axios'

const BACKEND_URL = "localhost"

export default function Home() {
    //has the admin  configure the system?
    const [configured, setConfigured] = useState()

    useEffect(()=>{
        axios.get(BACKEND_URL)
        .then((response)=>{
            setConfigured(response.data)
        })
        .catch((error)=>{
            console.log("Error connecting to backend -> ", error)
            setConfigured(false)
        })
    }, [])

    return (
        <>
            {configured && <ConfiguredHome />}
            {!configured && <UnconfiguredHome />}
        </>
    )
}

const ConfiguredHome = () => {
    return(
        <>
            <div>Backend response {'-> '}admin has set up system</div>
            <button>Admin Login - setup done</button>
            <button>Employee login</button>
        </>
    )
}

const UnconfiguredHome = () =>{

    function handleEmployeeLogin(){
        alert("System not setup or server not responsive. Contact system administrator!")
    }

    return (
        <>
            <div>Backend response {'->'} Error OR admin has not set up system</div>
            <button>Admin login - set up not done</button>
            <button onClick={handleEmployeeLogin}>Employee Login - not set up / error</button>
        </>
    )
}
