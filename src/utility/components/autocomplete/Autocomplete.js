//this component needs two props, options and result
//options is the list of stuff to show, result is somewhere to store the option thats selected
// option must be in the form -> options = [ {label :"What to show", id: unique_id}]
//result must be a setState function.

import React, { useState, useEffect } from 'react'
import styles from './autocomplete.module.css'

export default function Autocomplete({ options, result }) {

    //TODO - remove in build
    if (!options || !result) {
        alert('missing props in autocomplete')
    }

    console.log('options in autocomplete compponent -> ', options)
    const [current, setCurrent] = useState(null)
    const [showList, setShowList] = useState(false)
    const [input, setInput] = useState('')
    const [filterings, setFilterings] = useState(options)

    useEffect(() => {
        if (current !== null) {
            setInput(current.label)
            result(current)
        }
        return () => {
            setCurrent(null)
        }
    }, [current, result])

    function userInput(input) {
        const newVal = input.target.value
        setInput(newVal)
        if (input.nativeEvent.inputType === 'deleteContentBackward') {
            resetFilterings(input.target.value)
        } else {
            setFilterings((old) => {
                return old.filter((op) => op.label.toLowerCase().includes(newVal.toLowerCase()))
            })
        }
    }

    function resetFilterings(text) {
        const newFilterings = options.filter((op) => op.label.toLowerCase().includes(text.toLowerCase()))
        setFilterings(newFilterings)
    }

    function leavingAutocomplete() {
        setShowList(false)
        setFilterings(options)
    }

    function exitAutocomplete() {
        setInput('')
        result(null)
        setShowList(false)
    }
    return (
        <>
            <input type='text' placeholder={'Type Div Name'} value={input} onChange={(e) => { userInput(e) }} onFocus={() => { setShowList(true) }} />
            <button onClick={exitAutocomplete} >clear</button>
            {showList && <SuggestionsList suggestions={filterings} setCurrent={setCurrent} close={leavingAutocomplete} />}
        </>
    )
}



const SuggestionsList = ({ suggestions, setCurrent, close }) => {

    function sendResult(option) {
        setCurrent(option)
        close()
    }
    return (
        <>
            {suggestions &&
                <>
                    <div>
                        {suggestions.map((item) => {
                            return <div className={styles.suggestion} key={item.id} onClick={() => { sendResult(item) }}>{`${item.label}`}</div>
                        })}
                    </div>
                </>
            }
        </>
    )

}
