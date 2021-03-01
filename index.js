document.addEventListener("DOMContentLoaded", () => {
    const cardCont = document.querySelector("#collection");
    fetchCall(cardCont);
    let form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addLang();
    })
})

function fetchCall (cardCont){
    fetch("http://localhost:3000/languages")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(lang => newCard(lang, cardCont));
    });
}

function newCard(lang, container) {
    const button = document.createElement("button");
    const updateButton = document.createElement("button")
    updateButton.innerText = "Update"
    updateButton.class = "btn"
    button.id = lang.name;
    button.class = "btn";
    button.innerText = "Remove";
    const newCard = document.createElement("div");
    newCard.id = lang.id;
    newCard.className = "card";
    newCard.innerHTML = `
        <h2>${lang.name}</h2>
        <img alt="${lang.name}" src="${lang.image}" class="avatar" />
    `;

    newCard.append(button);
    container.append(newCard);
    button.addEventListener("click", (e) => {
        const parent = e.target.parentElement.id;
        deleteLang(parent);
    });
    newCard.append(updateButton)
    updateButton.addEventListener("click", (e) => {
        const parent = e.target.parentElement
        let updateForm = document.createElement("form")
        updateForm.className = "add-form"
        updateForm.innerHTML = `
        <h3>Change Language</h3>

        <input
          id ="name"
          required = "true"
          type="text"
          name="name"
          value=""
          placeholder="Enter new Language"
          class="input-text"
        />
        <br />
        <input
          id = "image"
          type="text"
          name="image"
          value=""
          placeholder="Enter new image"
          class="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="update"
          class="submit"
        />
    `
    parent.innerHTML = ""
    parent.append(updateForm)
    updateForm.addEventListener("submit", (e) => {
        let parentId = e.target.parentElement.id;
        updateLanguage(e, parentId)})
    })
}

function updateLanguage(e, id){
    e.preventDefault()
    let newName = e.target[0].value
    let newImage = e.target[1].value
    options = {
        method : "PATCH",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            "name" : newName,
            "image" : newImage
        })
    }
    fetch(`http://localhost:3000/languages/${id}`, options)
        .then(response => response.json())
        .then( data => {
            updateCard(data, id)})
}

function updateCard(data, id){
    let currentId = document.getElementById(id)
    const button = document.createElement("button");
    const updateButton = document.createElement("button")
    updateButton.innerText = "Update"
    updateButton.class = "btn"
    button.id = data.name;
    button.class = "btn";
    button.innerText = "Remove";
    console.log(data)
    currentId.innerHTML = `
        <h2>${data.name}</h2>
        <img alt="${data.name}" src="${data.image}" class="avatar" />
    `;
    currentId.append(button, updateButton)
}

function deleteLang(id) {
    const options = {
        method: "DELETE",
        headers : {
            "Content-Type": "application/json"
        }
    }
    const card = document.getElementById(id);
    card.remove();
    fetch(`http://localhost:3000/languages/${id}`, options);
}

function addLang(){
    let nameSearch = document.getElementById("name").value
    let imageSearch = document.getElementById("image").value
    let options = {
        method:"POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            name : nameSearch,
            image : imageSearch
        })
    }

    fetch("http://localhost:3000/languages", options)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector("#collection");
        newCard(data, container);
    });
}

