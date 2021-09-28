import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Config from '../admin/setup/Config'
import { AppData } from '../home/Home'


export default function AdminArea() {

    const {signedIn} = useContext(AppData) //replace with sign in function
    const history = useHistory()

    return (
        <>
        {signedIn && <>
            <h1>Admin Area</h1>
            <Router>
                <Switch>
                    <Route exact path="/admin/setup">
                        <Config />
                    </Route>
                </Switch>
            </Router>
        </>}
        {!signedIn && history.push('/admin/login')}
        </>
    )
}
