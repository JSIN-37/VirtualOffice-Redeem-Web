import React from 'react'

export default function PermissionSet({group}) {
    return (
        <div>
            <h2>{JSON.stringify(group)}</h2>
        </div>
    )
}
