import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import AdminArea from '../user_areas/AdminArea'
import EmployeeArea from '../user_areas/EmployeeArea'
import Config from '../admin/setup/Config'

const BACKEND_URL = "http://localhost:8080/api"

//used in -> login/Login.js and user_areas/both files.
//replace with mechanism to check if signed in.
export const AppData = React.createContext()

export default function Home() {
    //has the admin  configured the system?
    const [configured, setConfigured] = useState()

    //replace with -> read app data from local storage/cookies? (logged in or not)
    const [signedIn, setSignedIn] = useState(undefined)
    const [token, setToken] = useState('')
    const appDataValues = { signedIn, setSignedIn, BACKEND_URL, token, setToken }
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/public/server-status`)
        .then((response)=>{
            console.log("HOME response", response)
            setConfigured(response.data.initialized)
        })
        .catch((error)=>{
            console.log("Error connecting to backend -> ", error)
            setConfigured(false)
        })
    }, [])

    return (
        <>
        <AppData.Provider value={appDataValues}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {configured && <ConfiguredHome />}
                        {!configured && <UnconfiguredHome status={configured}/>}
                    </Route>
                    <Route exact path='/admin'>
                        <AdminArea />
                    </Route>
                    <Route exact path='/employee'>
                        <EmployeeArea />
                    </Route>
                    <Route exact path='/admin/setup'>
                        <Config/>
                    </Route>
                </Switch>
            </Router>
        </AppData.Provider>    
        </>
    )
}

const ConfiguredHome = () => {

    const history = useHistory()

    function handleAdminLogin(){
        history.push('/admin')
    }

    function handleEmployeeLogin(){
        history.push('/employee')

    }

    return(
        <>
            <div>Backend response {'-> '}admin has set up system</div>
            <button onClick={handleAdminLogin}>Admin Login - setup done</button>
            <button onClick={handleEmployeeLogin}>Employee login</button>
        </>
    )
}

const UnconfiguredHome = ({status}) =>{

    const history = useHistory()

    function handleEmployeeLogin(){
        alert("System not setup or server not responsive. Contact system administrator!")
    }

    function handleAdminLogin(){
        history.push('/admin/setup')
    }

    return (
        <>
            {status === undefined && 
                <div>Connecting to server..</div>
            }

            {status === false && 
                <div>
                <div>Admin has not configured system OR failed to connect to server</div>
                <button onClick={handleAdminLogin}>Admin login - set up not done</button>
                <button onClick={handleEmployeeLogin}>Employee Login - not set up / error</button>
                </div>  
            }
        </>
    )
}
