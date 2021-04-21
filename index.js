const listsEndPoint = "http://localhost:3000/api/v1/lists"
const itemsEndPoint = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
    
})

function getLists() {
    fetch(listsEndPoint)
    .then(r => r.json())
    .then(lists => {
        lists.data.forEach(list => {
            const list_container = document.createElement("div")
            document.body.appendChild(list_container)
            list_container.id = list.attributes.title
            list_container.innerHTML+= `<h3>${list.attributes.title}</h3>`
            list.attributes.items.forEach(item => {
                const itemMarkup = `
                <i class="far fa-circle"></i>
                ${item.description}
                <i class="fas fa-trash-alt"></i>
                <br>` 
                list_container.innerHTML+= itemMarkup
            })
            
            const form_container = document.createElement("div")
            form_container.class = "form"
            form_container.innerHTML = `
            <br>
            <form class="add-item">
            <input type="hidden", name="list_id", value="${list.id}">
            <input type="text" name="description" placeholder="Add new item">
            <button type="submit" name="submit">Submit</button>
            </form>`
            
            list_container.insertAdjacentElement("afterend", form_container)
        })
        itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {
        itemForms[i].addEventListener("submit", (e) => handleSubmit(e))
    }
    })
}


function handleSubmit(e) {
    e.preventDefault()
    list_id = parseInt(e.target.elements[0].value)
    description = e.target.elements.description.value 
    postFetch(description, list_id)
    e.target.reset()
}

function postFetch() {
    console.log(description,list_id)
    fetch(itemsEndPoint,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            description: description,
            list_id: list_id
        })
    })
    .then(response => response.json())
    .then(itemInfo => {
        const item = itemInfo.data.attributes;
        const list_container = document.getElementById(`${item.list.title}`)
        const itemMarkup = `
                <i class="far fa-circle"></i>
                ${item.description}
                <i class="fas fa-trash-alt"></i>
                <br>` 
                list_container.innerHTML+= itemMarkup
        
    })
}




