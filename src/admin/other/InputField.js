import React, { useState, useEffect } from "react";

export default function InputField({ type, placeholder,input, setInput }) {

    //const [data, setData] = useState(value || '')
    //console.log("input field val -> ",value)
    function userInput(e){
        setInput(e.target.value)
    }

    // useEffect(() => {
    //     input.current = data
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data])

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={input}
        onChange={(e) => {userInput(e)}}
      ></input>
    </div>
  );
}
