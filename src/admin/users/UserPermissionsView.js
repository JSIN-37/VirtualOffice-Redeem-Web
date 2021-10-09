import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function UserPermissionsView({permissions, open}) {
    return (
        <div>
            <Grid container>
                <Typography>{JSON.stringify(permissions)}</Typography>
            </Grid>
            <button onClick={()=>open(false)}>close</button>
        </div>
    )
}
