import {BACKEND_URL} from './constants'

//////////////////log in////////////////////////////////////////// 
export const admin_login_url = `${BACKEND_URL}/admin/login`


////////////////////////validating tokens ///////////////////////
export const admin_validate_url = `${BACKEND_URL}/admin/validate-token` 



///////////////////////update password//////////////////////////
export const  admin_pass_update_url = `${BACKEND_URL}/admin/credentials`


///////////////////organization stuff//////////////////////////

//update organization details
export const update_org_url = `${BACKEND_URL}/admin/organization-info`

//update organization logo
export const update_logo_url = `${BACKEND_URL}/admin/organization-logo`


//get all divisions
export const get_divisions_url = `${BACKEND_URL}/admin/divisions`

//add division
export const add_division_url = `${BACKEND_URL}/admin/division`

//delete division
export const delete_division_url = `${BACKEND_URL}/admin/division`