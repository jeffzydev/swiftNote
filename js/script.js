/*
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        window.location.href = "notes.html";
    } else {
        alert("Nome de usuário ou senha incorretos.");
    }
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "index.html";
}*/

// Função para salvar uma nova nota
function saveNote() {
    var noteContent = document.querySelector('textarea[name="content"]').value;
    if (noteContent) {
        var notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(noteContent);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
        document.querySelector('textarea[name="content"]').value = "";
    } else {
        alert("Por favor, insira o conteúdo da nota.");
    }
}

// Função para carregar as notas salvas
function loadNotes() {
    var noteList = document.querySelector("#note-list");
    noteList.innerHTML = "";
    var notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(function(note, index) {
        var noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");

        var noteContent = document.createElement("div");
        noteContent.classList.add("note-content");
        noteContent.textContent = note;

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "text-light", "delete-button");
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.onclick = function() {
            moveNoteToTrash(note, index);
        };

        noteContainer.appendChild(noteContent);
        noteContainer.appendChild(deleteButton);
        noteList.appendChild(noteContainer);
    });
}

function moveNoteToTrash(note, index) {
    var notes = JSON.parse(localStorage.getItem("notes")) || [];
    var trash = JSON.parse(localStorage.getItem("trash")) || [];

    // Remover a nota da lista de notas
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    if (!trash.includes(note)) {
        trash.push(note);
        localStorage.setItem("trash", JSON.stringify(trash));
    }

    loadNotes();
}

// Função para esvaziar a lixeira
function emptyTrash() {
    localStorage.removeItem("trash");
    loadTrash();
}

// Carregar notas ao abrir a página
loadNotes();