const listsEndPoint = "http://localhost:3000/api/v1/lists"
const itemsEndPoint = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
    document.body.insertAdjacentHTML("afterbegin", createNewList())
    const newListForm = document.getElementById('create-new-list')
    newListForm.addEventListener("submit", (e) => handleNewListForm(e))
})

function getLists() {
    fetch(listsEndPoint)
    .then(r => r.json())
    .then(lists => {    
        lists.data.forEach(list => {
            let newList = new List(list, list.attributes)
            const list_container = document.createElement("div")
            document.body.appendChild(list_container)
            list_container.id = list.id
            list_container.innerHTML+= newList.renderListTitle()
            list.attributes.items.forEach(item => {
                let newItem = new Item(item) 
                list_container.innerHTML+= newItem.render()
                })
            list_container.insertAdjacentHTML("afterend", newList.renderNewItemForm())
        })
        let itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}
    })
}


function handleNewItemForm(e) {
    e.preventDefault()
    list_id = parseInt(e.target.elements[0].value)
    description = e.target.elements.description.value 
    postFetchItems(description, list_id)
    e.target.reset()
}

function postFetchItems() {
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
    .then(item => {
        let nestedItemInfo = {id: parseInt(`${item.data.id}`), description:`${item.data.attributes.description}`, list_id:parseInt(`${item.data.attributes.list.id}`)}
        let newItem = new Item(nestedItemInfo)
        const list_container = document.getElementById(parseInt(`${item.data.attributes.list.id}`))
        list_container.innerHTML += newItem.render()
    })
}

function createNewList() {
        return `
        <form id="create-new-list">
        <input type="text" name="title" placeholder="Title">
        <button type="submit" name="submit">Create A New List</button>
        </form>
        <br>`
}

function handleNewListForm(e) {
    e.preventDefault()
    list_name = e.target.elements[0].value
    postFetchLists(list_name)
    e.target.reset()
}

function postFetchLists() {
    console.log(list_name)
    fetch(listsEndPoint,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: list_name
        })
    })
    .then(response => response.json())
    .then(list => {
        let newList = new List(list.data, list.data.attributes)
        const list_container = document.createElement("div")
        document.body.appendChild(list_container)
            list_container.id = newList.id
            list_container.innerHTML+= newList.renderListTitle()

        list_container.insertAdjacentHTML("afterend", newList.renderNewItemForm())

        let itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}
    })
}


