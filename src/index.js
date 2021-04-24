const listsEndPoint = "http://localhost:3000/api/v1/lists"
const itemsEndPoint = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
    const newListForm = document.getElementById('create-new-list')
    newListForm.addEventListener("submit", (e) => handleNewListForm(e))
})

function getLists() {
    fetch(listsEndPoint)
    .then(r => r.json())
    .then(renderLists)
}

function renderLists(lists) {
    lists.data.forEach(list => {
        let newList = new List(list, list.attributes)
        newList.renderList()
        list.attributes.items.forEach(item => {
            let newItem = new Item(item) 
            newItem.render()
        })
        newList.addNewItemFormtoList()
    })
    let itemForms = document.getElementsByClassName("add-item")
    for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}
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
        let itemInfo = {id: item.data.id, ...item.data.attributes}
        let newItem = new Item(itemInfo)
        newItem.render()
    })
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
        newList.renderList()
        newList.addNewItemFormtoList()

        let itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}
    })
}


