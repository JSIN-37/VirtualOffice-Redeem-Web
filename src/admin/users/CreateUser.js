import React, { useState } from 'react'
import InputField from '../other/InputField'

export default function CreateUser() {

    const [name, setName] = useState('')
    return (
        <div>
            <h1>Create User</h1>
            <InputField type='text' input={name} setInput={setName} placeholder='Name' />
        </div>
    )
}
