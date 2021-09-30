import React from "react";
import { Route} from "react-router";
import Dashboard from "../admin/Dashboard";
import ViewDivisions from "../admin/divisions/ViewDivisions";
import ViewUsers from "../admin/users/ViewUsers";

export default function AdminArea({ auth }) {
  if (auth) {
    return (
      <>
        <Route exact path="/admin">
          <Dashboard />
        </Route>
        <Route exact path="/admin/all-divisions">
          <ViewDivisions />
        </Route>
        <Route exact path='/admin/all-users'>
          <ViewUsers />
        </Route>
      </>
    );
  }
}
