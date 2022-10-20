import React from 'react';

function myFunction() {
    var tt = document.getElementById("tooltipdemo")
    tt.classList.toggle("show")
}

function Tooltip() {
    return (
        <button class="arrowpopup" onClick={() => { myFunction() }}>
            Tooltip Demo Click here!
            <span class="tooltiptext" id="tooltipdemo">HTML Tooltip helps you to display extra information of element.</span>
        </button>
    )
}

export default Tooltip()

