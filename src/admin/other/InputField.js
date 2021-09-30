import React, { useState, useEffect } from "react";

export default function InputField({ type, placeholder,input }) {

    const [data, setData] = useState('')

    function userInput(e){
        setData(e.target.value)
    }

    useEffect(() => {
        input.current = data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={data}
        onChange={(e) => {userInput(e)}}
      ></input>
    </div>
  );
}
