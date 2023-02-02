showNotes();

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let addNote = document.getElementById("addNote");
let msg = document.getElementById('msg');
  let addTxt = document.getElementById("textArea");

addNote.addEventListener("click", function (e) {

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

notesObj.push({
   text: textInput.value,
   date: dateInput.value,
   description: addTxt.value,
});
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach(noteBodyHTML);

  function noteBodyHTML(item, index) {
    html += `<div class="noteCard card mx-2 my-2" style="width: 20rem;">
                <div id=${index} class="card-body">
                    <h5 class="card-title">Note #${index + 1}</h5>
                    <p class="card-text">${item}</p> 
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger px-4 py-2">Delete Note</button>
                </div>
            </div>`;
  }

  let notesText = document.getElementById("notes");

  if (notes != null) {
    notesText.innerHTML = html;
  } 

  else {
    notesText.innerHTML = `<p style="color: grey"><em>Nothing to show here. Click on Write A Note.</em></p>`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(e)
{
    let inputVal = e.target.value.toLowerCase();
     console.log(inputVal);
    
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    
    })
});
