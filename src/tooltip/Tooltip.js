import React from 'react';
import './tooltip.css'

function Tooltip() {

    function showCopied() {
        let selectButton = document.querySelector(".copycontractaddress");
        selectButton.classList.add("active");
        setTimeout(function () {
            selectButton.classList.remove("active");
        }, 1500)
    }

    return (
        <div className="copycontractaddress">
            <button value="copy" onClick={() => { showCopied() }} id="copy-text-btn"><i class="fa-regular fa-circle-info"></i></button>
        </div>
    )
}

export default Tooltip()

