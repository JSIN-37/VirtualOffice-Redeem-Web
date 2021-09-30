import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "../admin/Dashboard";
import ViewDivisions from "../admin/divisions/ViewDivisions";
import LoadingScreen from "../admin/other/LoadingScreen";
import ViewUsers from "../admin/users/ViewUsers";
import { admin_validate_url } from "../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../app_data/constants";
import { isAuthenticated } from "../utility/functions";

export default function AdminArea() {
  //render loading screen
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null)

  
  useEffect(() => {
    checkToken()
    async function checkToken(){
      try{
        setLoading(true)
        const auth = await isAuthenticated(admin_validate_url, USER_STORAGE_KEY)
        if(auth){
          setRedirect(false)
          setLoading(false)
        }else{
          setRedirect(true)
        }
      }
      catch{
        console.log("error checking token")
        localStorage.removeItem(USER_STORAGE_KEY)
        setRedirect(true)
      }
    }
  }, []);

  if(redirect){
    return <Redirect push to="/admin/login" />
  }

  return (
    <>
      {!loading && (
        <>
          <Route exact path="/admin">
            <Dashboard />
          </Route>
          <Route exact path="/admin/all-divisions">
            <ViewDivisions />
          </Route>
          <Route exact path="/admin/all-users">
            <ViewUsers />
          </Route>
        </>
      )}
      {loading && <LoadingScreen />}
    </>
  );
}
