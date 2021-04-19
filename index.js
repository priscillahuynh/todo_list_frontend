const endPoint = "http://localhost:3000/api/v1/lists"


document.addEventListener('DOMContentLoaded', () => {
    getLists()
    
})

function getLists() {
    fetch(endPoint)
    .then(r => r.json())
    .then(lists => {
        lists.data.forEach(list => {
            const list_container = document.createElement("div")
            document.body.appendChild(list_container)
            list_container.id = list.attributes.title
            list_container.innerHTML+= `<h3>${list.attributes.title}</h3>`
            list.attributes.items.forEach(item => {
                const itemsMarkup = `
                <i class="far fa-circle"></i>
                ${item.description}
                <i class="fas fa-trash-alt"></i>
                <br>` 
                
                list_container.innerHTML+= itemsMarkup 
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
            
            list_container.appendChild(form_container)
        })
        itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {
        itemForms[i].addEventListener("submit", (e) => handleSubmit(e))
    }
    })
}


function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
}


