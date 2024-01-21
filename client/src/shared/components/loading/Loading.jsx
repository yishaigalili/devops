import React from 'react'
import style from "./Loading.css"
import loading from "./loadingGif.gif"

const Loading = () => {
    return (
        <>
            <div className="wrapperLoading">
                <img className="loader" src={loading} />
            </div>
        </>
    )
}

export default Loading