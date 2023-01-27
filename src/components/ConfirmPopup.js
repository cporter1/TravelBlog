import { useState } from "react"

export default function ConfirmPopup({ID, bgID, handleTask , buttonText, 
    buttonClass, confirmText, saving, noTitle}) {

    const [delTask , setDelTask] = useState(false)

    // sets invisible html to visible
    // using ID for uniquenes for multiple on the same page
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
    // handler function for form 'yes'
    function handleTaskThenClose() {
        handleTask()
        handleConfirmationBox()
    }

    function greenButton() {
        if(saving) {
            return ({backgroundColor: 'green'})
        }
        else {
            return null
        }
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
                    {noTitle?
                        null
                        :
                        <>
                            <button 
                                className="cancel-button" 
                                onClick={() => handleConfirmationBox()}>
                                Cancel
                            </button>
                            <button 
                                className="confirmation-button"
                                style={greenButton()}
                                onClick={handleTaskThenClose}>
                                Yes
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className="popup-bg" id={bgID}
                onClick={() => handleConfirmationBox()}>
            </div>
        </>
    )
}