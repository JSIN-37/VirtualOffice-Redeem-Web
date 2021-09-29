import React from 'react'
import { Route, Router, Switch, useHistory, useRouteMatch } from 'react-router'
import Dashboard from '../admin/Dashboard'
import ViewDivisions from '../admin/divisions/ViewDivisions'


export default function AdminArea({auth}) {

    if(auth){
        return (
            <>
            <Switch>
                <Route exact path='/admin'>
                    <Dashboard />
                </Route>
                <Route  path='/admin/view-divisions'>
                    <ViewDivisions />
                </Route>
            </Switch>
            </>
        )
    }
}
