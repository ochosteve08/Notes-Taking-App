
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let add = document.getElementById("addNote");
let msg = document.getElementById('msg');
let newNotes = document.getElementById("notes");
let searchInput = document.getElementById('search');
 
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    formValidation();
});


/*form validation*/
let formValidation =()=>{

  console.log(textInput.value)
    if(textInput.value === ""){
      
        msg.innerHTML="Task cannot be blank";

    }
    else{

        msg.innerHTML="";
        // showNotes();

        acceptData();

        add.setAttribute("data-bs-dismiss","modal"); /*modal closing after clicking add button*/
        add.click();
       (()=>{add.setAttribute("data-bs-dismiss","");})();

    }
}

let data = [];
let acceptData =()=>{

  data.push({
    note: textInput.value,
    date: dateInput.value,
    description: textArea.value
  });

localStorage.setItem("notes", JSON.stringify(data));

createTask();
};


let  createTask=()=>{
 
  
  newNotes.innerHTML="";

  data.map((items,index)=>{

  let {note,date,description} = items;


    return (newNotes.innerHTML += 
        `<div class="noteCard card mx-2 my-2" >
            <div id=${index} class=" card-body ">
                <div class="d-flex flex-column mb-3">
                    <span class="fw-bold mb-1">${note}</span>
                    <span class="small text-secondary mb-1">${date}</span>
                    <p class="mb-1">${description}</p>
                </div>
                <span class="d-flex  flex-row gap-3  options">
                  <button  type="button" data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="btn btn-info btn-block px-3 py-2 mr-2">Edit</button>
                  <button type="button"  onclick="deleteNote(this)" class="btn btn-danger btn-block px-2 py-2">Delete
                  </button>
                </span>
            
            </div>
        </div>`
      )
  });

  resetForm();

};

let deleteNote=(event)=>{
    event.parentElement.parentElement.remove();
    console.log(event.parentElement.parentElement)
    data.splice(event.parentElement.parentElement.id,1);
    localStorage.setItem("notes",JSON.stringify(data));
}

let editTask=(event)=>{
    let selectedParent =event.parentElement.parentElement;
    textArea.value=selectedParent.children[0].children[2].innerHTML;
    dateInput.value=selectedParent.children[0].children[1].innerHTML;
    textInput.value=selectedParent.children[0].children[0].innerHTML;
    deleteNote(event);
  };


  let resetForm=()=>{
    textInput.value="";
    dateInput.value="";
    textArea.value="";

}

(()=>{
    data= JSON.parse(localStorage.getItem("notes"))||[];
    createTask();
})();


searchInput.addEventListener('input', function(e)
{

   
    let inputVal = searchInput.value.toLowerCase();
     console.log(inputVal);
    
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName("span")[0].innerText;
        console.log(cardTxt);
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


