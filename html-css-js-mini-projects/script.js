const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something.")
    } else {
        let li = document.createElement("li")
        // Whatever text is added to inputBox.value will be added to the current li
        li.innerHTML = inputBox.value
        // Add it to listContainer so it can be displayed
        listContainer.appendChild(li)
        // Create an element with a tag name of span.
        let span = document.createElement("span");
        // Crossed out icon code below
        span.innerHTML = "\u00d7";
        // Display the span
        li.appendChild(span)
    }
    // Restest the input box to not have text after the to-do text is added
    inputBox.value = '';
    saveData()
}

// Add an event listener for every time that we click inside of the list container
listContainer.addEventListener("click", function(e){
    // Check if the user clicked on the li (the list item) or the span (the X)
    if (e.target.tagName === "LI"){
        // Will toggle checked, to change the CSS
        e.target.classList.toggle("checked")
        saveData()
    }
    else if (e.target.tagName === "SPAN"){
        // parentElement = the li element
        e.target.parentElement.remove()
        saveData()
    }
}, false)

function saveData(){
    // Whatever is stored in the listContainer will be stored in the browser memory with the name data
    localStorage.setItem("data", listContainer.innerHTML)
}

// Display saved data when website is repopened
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}

showTask();