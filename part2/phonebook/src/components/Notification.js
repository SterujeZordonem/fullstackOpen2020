import React from 'react'

const Notification = ({message, style}) => {
  if(message === null){
    return null;
  } else{
    return(
      <div className={style}>
        <h2>{message}</h2>
      </div>
    )
  }
}

export default Notification