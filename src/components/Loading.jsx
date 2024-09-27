import React from 'react'
import { Spinner } from "flowbite-react";
const Loading = () => {
    return (
        <div className=" w-full h-[100vh] flex justify-center items-center ">
            <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
    )
}

export default Loading
