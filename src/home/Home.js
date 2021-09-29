import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom'
import AdminArea from '../user_areas/AdminArea'
import EmployeeArea from '../user_areas/EmployeeArea'
import Config from '../admin/setup/Config'
import Login from '../login/Login'
import { Grid, Typography, Button } from '@mui/material';
import { BACKEND_URL } from '../app_data/constants'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { isAuthenticated } from '../utility/functions'
import { admin_validate_url } from '../app_data/admin_urls'
import { server_status_url } from '../app_data/public_urls'
import { org_info_url } from '../app_data/public_urls'


//import logo from "../img/logo.png"

//const employeeURL =`${BACKEND_URL}/employee/login`
//replace with mechanism to check if signed in.
export const AppData = React.createContext()

export default function Home() {
    //has the admin  configured the system?
    const [configured, setConfigured] = useState()

    //replace with -> read app data from local storage/cookies? (logged in or not)
    // const [signedIn, setSignedIn] = useState(undefined)
    // const [token, setToken] = useState('')
    const appDataValues = { BACKEND_URL }

    //get organization details if system is configured.
    const [organization, setOrganization] = useState(null)

    useEffect(() => {
        axios.get(server_status_url)
            .then((response) => {
                if (response.data.serverInitialized) {
                    return axios.get(org_info_url)
                } else {
                    setConfigured(false)
                }
            })
            .then((response) => {
                setOrganization(response.data)
                setConfigured(true)
            })
            .catch((error) => {
                console.log("Error at home page -> ", error)
            })
    }, [])



    return (
        <>
            <AppData.Provider value={appDataValues}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            {configured && <ConfiguredHome organization={organization} />}
                            {!configured && <UnconfiguredHome status={configured} />}
                        </Route>
                        <Route exact path='/admin'>
                            {isAuthenticated(admin_validate_url,USER_STORAGE_KEY)? <AdminArea auth={true}/>: <Redirect push to='/admin/login'/> }
                        </Route>
                        <Route exact path='/employee'>
                            <EmployeeArea />
                        </Route>
                        <Route exact path='/admin/setup'>
                            <Config />
                        </Route>
                        <Route exact path='/admin/login'>
                            <Login admin />
                        </Route>
                        <Route exact path='/employee/login'>
                            <Login employee />
                        </Route>
                    </Switch>
                </Router>
            </AppData.Provider>
        </>
    )
}

const ConfiguredHome = ({ organization }) => {

    const history = useHistory()

    function handleAdminLogin() {
        history.push('/admin')
    }

    function handleEmployeeLogin() {
        history.push('/employee')

    }

    return (
        <>
            <div>Backend response {'-> '}admin has set up system</div>
            <h2>{organization && organization.organizationName}</h2>
            <h2>{organization && organization.organizationAddress}</h2>
            <h2>{organization && organization.organizationCountry}</h2>
            <h2>{organization && organization.organizationContactNumber}</h2>
            <button onClick={handleAdminLogin}>Admin Login - setup done</button>
            <button onClick={handleEmployeeLogin}>Employee login</button>
        </>
    )
}

const UnconfiguredHome = ({ status }) => {

    const history = useHistory()

    function handleEmployeeLogin() {
        alert("System not setup. Contact system administrator!")
    }

    function handleAdminLogin() {
        history.push('/admin/setup')
    }

    return (
        <>
            {status === undefined &&
                <div>Connecting to server..</div>
            }

            {status === false &&
                <div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        height: "90vh",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Grid
                            container
                            spacing={0}
                            align="center"
                            justify="center"
                            direction="column">
                            <Grid item>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Admin has not configured system OR failed to connect to server
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    VirtualOffice
                                </Typography>
                                <div>Admin has not configured system OR failed to connect to server</div>
                                <Button variant="contained" onClick={handleAdminLogin}>Admin login - set up not done</Button>
                                <Button variant="contained" onClick={handleEmployeeLogin}>Employee Login - not set up / error</Button>
                            </Grid>
                        </Grid>
                    </div>


                </div>
            }
        </>
    )
}
