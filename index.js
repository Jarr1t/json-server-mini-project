document.addEventListener("DOMContentLoaded", () => {
    const cardCont = document.querySelector("#collection");
    fetchCall(cardCont);
    let form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addLang();
        e.target.reset()
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
    const likeBtn = document.createElement("button");
    likeBtn.innerText = "❤";
    const button = document.createElement("button");
    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.class = "btn";
    button.id = lang.name;
    button.class = "btn";
    button.innerText = "Remove";
    const newCard = document.createElement("div");
    newCard.id = lang.id;
    newCard.className = "card";
    newCard.innerHTML = `
        <h2>${lang.name}</h2>
        <img width="300px" alt="${lang.name}" src="${lang.image}" class="avatar" />
        <p class="likes">❤: 
            <span class="likes-count">${lang.likes}</span>
        </p>
    `;
    let buttonHolder = document.createElement("div")
    buttonHolder.style.display = "flex"
    buttonHolder.style.justifyContent = "space-between"
    newCard.append(buttonHolder)
    buttonHolder.append(likeBtn, button, updateButton);
    likeBtn.addEventListener("click", (e) => {
        addLike(e.target.parentElement.parentElement.id);
    })
    container.append(newCard);
    button.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement.id;
        deleteLang(parent);
    });
    updateButton.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement
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

function addLike(id) {
    const lang = document.getElementById(id);
    const currentLikes = Number(lang.querySelector(".likes-count").innerText);
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: currentLikes + 1
        })
    }

    lang.querySelector(".likes-count").innerText = currentLikes + 1;
    fetch(`http://localhost:3000/languages/${id}`, options);
}

function updateLanguage(e, id){
    e.preventDefault()
    let newName = e.target[0].value
    let newImage = e.target[1].value
    const options = {
        method : "PATCH",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            "name" : newName,
            "image" : newImage,
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
    const likeBtn = document.createElement("button");
    likeBtn.innerText = "❤";
    updateButton.innerText = "Update"
    updateButton.class = "btn"
    button.id = data.name;
    button.class = "btn";
    button.innerText = "Remove";
    console.log(data)
    currentId.innerHTML = `
        <h2>${data.name}</h2>
        <img width="300px" alt="${data.name}" src="${data.image}" class="avatar" />
        <p class="likes">❤: 
            <span class="likes-count">${data.likes}</span>
        </p>
    `;
    let evenNewerDiv = document.createElement("div")
    evenNewerDiv.append(likeBtn, button, updateButton)
    evenNewerDiv.style.display = "flex"
    evenNewerDiv.style.justifyContent = "space-between"
    currentId.append(evenNewerDiv);
    
    likeBtn.addEventListener("click", (e) => {
        addLike(e.target.parentElement.parentElement.id);
    })
    button.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement.id;
        deleteLang(parent);
    });
    updateButton.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement
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
            image : imageSearch,
            likes: 0
        })
    }

    fetch("http://localhost:3000/languages", options)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector("#collection");
        newCard(data, container);
    });
}

