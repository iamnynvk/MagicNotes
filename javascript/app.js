console.log("Welcome to Magic Note App");
let notesObj;

showNotes();
// If user add to note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (element) {
  let addTitle = document.getElementById('addTitle');
  let addText = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title : addTitle.value,
    text : addText.value,
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addText.value = "";
  //console.log(notesObj);
  showNotes();
});

// Function to show notes form localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard" style="width: 18rem; margin: 10px; border: 1px solid darkgrey; border-radius:10px">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-success btn-dark" style="color: white;"">Delete</button>
        </div>
      </div>`;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `Nothing to show! Use "Add a Note" Section above to add notes.`;
  }
}

// Delele Note of function
function deleteNote(index) {
  //console.log("im delteing",index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search Note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  //console.log("Search box fire :",inputVal);
  let noteCard = document.getElementsByClassName("noteCard");

  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
