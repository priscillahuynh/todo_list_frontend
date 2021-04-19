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
            list_container.id = list.id
            list_container.innerHTML+= `<h3>${list.attributes.title}</h3>`
            list.attributes.items.forEach(item => {
                const itemsMarkup = `
                <li class="item">
                    ${item.description}
                </li>`
                list_container.innerHTML+= itemsMarkup 
            })

            const form_container = document.createElement("div")
            form_container.innerHTML = `
            <br>
            <form id="add-item">
            <input type="hidden", name="list_id", value="${list.id}">
            <input type="text" name="description" placeholder="Add new item">
            <input type="submit" name="submit">
            </form>`

            list_container.appendChild(form_container)
        })
    })
}

