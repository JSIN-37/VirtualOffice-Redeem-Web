//inputs should have this format; 
//options -> an array of the form [ [[option1_label, option1_identifier]], [ [option2_label, option2_identifier]], []]
//label -> displayed in unordered list
//identifier -> returned as result.
//result -> a setState function to store users selection, inside the parent component

import React, { useState } from 'react'

export default function MyAutocomplete({options}) {
    //console.log('options in autocomplete compponent -> ', options)

    const [input, setInput] = useState('')
    const [filterings, setFilterings] = useState(options)

    function userInput(input){
        setInput(input)
        //const newFilterings = filterings.filter((op)=>op.label.includes(input))
        setFilterings((old)=>{
            return old.filter((op)=>op.label.includes(input))
        })
    }

    return (
        <>
        <input type='text' placeholder={'Type Div Name'} value={input} onChange={(e)=>{userInput(e.target.value)}} />
        <SuggestionsList suggestions={filterings} />
        </>
    )
}



const SuggestionsList = ({suggestions}) =>{
    console.log('sug list ',suggestions)
    return(
        <>
        {suggestions && 
        <>
            <ul>
                {suggestions.map((item)=>{
                    return <li key={item.id}>{`${item.label}`}</li>
                })}
            </ul>
        </>
        }
        </>
    )

}