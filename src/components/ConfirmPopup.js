import { useState } from "react"

export default function ConfirmPopup({ID, bgID, handleTask , buttonText, buttonClass, confirmText}) {

    const [delTask , setDelTask] = useState(false)

    const handleConfirmationBox = () => {
        if (!delTask) {
          document.querySelector('#' + ID).style.display = "flex"
          document.querySelector('#' + bgID).style.display = "flex"
          setDelTask(true)
        } else {
          document.querySelector('#' + ID).style.display = "none"
          document.querySelector('#' + bgID).style.display = "none"
          setDelTask(false)
      }
    }
    
    function handleTaskThenClose() {
        handleTask()
        handleConfirmationBox()
    }

    return (
        <>  
            <button className={buttonClass}
                onClick={() => {handleConfirmationBox()}} >
                    {buttonText}
            </button>
            <div className="popup-container" id={ID}>
                <div className="confirmation-text">
                {confirmText}
                </div>
                <div className="button-container">
                    <button 
                        className="cancel-button" 
                        onClick={() => handleConfirmationBox()}>
                        Cancel
                    </button>
                    <button 
                        className="confirmation-button"
                        onClick={handleTaskThenClose}>
                        Yes
                    </button>
                </div>
            </div>
            <div className="popup-bg" id={bgID}
                onClick={() => handleConfirmationBox()}>
            </div>
        </>
    )
}