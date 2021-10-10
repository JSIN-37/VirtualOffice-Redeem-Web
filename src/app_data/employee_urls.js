import {BACKEND_URL} from './constants'

//////////////////log in////////////////////////////////////////// 
export const employee_login_url = `${BACKEND_URL}/user/login`

//get profile
export const employee_get_profile = `${BACKEND_URL}/user/profile`

//////////////////validating token/////////////////////
export const employee_validate_url = `${BACKEND_URL}/user/validate-token` 

//change password
export const employee_change_password = `${BACKEND_URL}/user/password`
//update info
export const employee_update_details = `${BACKEND_URL}/user/profile-info`

//update profile picture
export const employee_update_profilepic = `${BACKEND_URL}/user/profile-pic`