console.log('Welcome to notes app. THis is buildnotes.js')
showNotes()

// if user add a note, add it to the local storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener("click", function (e) {
    addTxt = document.getElementById('addTxt')
    notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ""
    // console.log(notesObj)
    showNotes()
})

function showNotes() {
    notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach(function (element, index) {
        html +=
            `
            <div class="my-2 mx-2 card noteCard styling"  style = "width: 18rem;" >
            <div class="card-body">
                <h4 class="card-title">Note ${index + 1}</h4>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary deletion">Delete Note</button>
            </div>
            </div>
            `
    })
    notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `
        <h5>Nothing to show here! Use the "Add Notes" Section above to add notes</h5>
        `
    }
}


function deleteNode(index) {
    // console.log("I am deleting", index)
    notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
}



search = document.getElementById('searchTxt')
search.addEventListener('input', function () {
    inputVal = search.value.toLowerCase()
    // console.log('input event fired', inputVal)
    noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display="block"
        }
        else{
            element.style.display="none"
        }
    })
})