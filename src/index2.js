const itemsEndPoint = "http://localhost:3000/api/v1/items"
const listsEndPoint = "http://localhost:3000/api/v1/lists"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
    // getItems()
    const newListForm = document.getElementById('create-new-list')
    newListForm.addEventListener("submit", (e) => handleNewListForm(e))
})

function getLists() {
    fetch(listsEndPoint)
    .then(r => r.json())
    .then(renderLists)
}

function renderLists(lists) {
    lists.data.forEach(list=> {
        new_list = new List({id:list.id,...list.attributes})
        new_list.renderList()
        list.attributes.items.forEach(item => {
            new_item = new Item(item)
            new_item.render()
        })
        
    })
    
}

function getItems() {
    fetch(itemsEndPoint)
    .then(r => r.json())
    .then(renderItems)
}

function renderItems(items) {
    items.data.forEach(item => {
            debugger
            list_container = document.getElementById(item.attributes.list.title)
            if (list_container === null) {
                list = new List(item.attributes.list)
                list.renderList()
                item = new Item({id:parseInt(item.id),...item.attributes,...item.attributes.list})
                item.render()
            } 
            else {
                item = new Item({id:parseInt(item.id),...item.attributes,...item.attributes.list})
                item.render()
            }
    }) 

    list_delete_buttons = document.getElementsByClassName("delete-list")
    for (var i = 0; i < list_delete_buttons.length; i ++) {list_delete_buttons[i].addEventListener("click", (e) => handleDeleteList(e))}

    let item_delete_buttons = document.getElementsByClassName("delete-item")
    for (var i = 0; i < item_delete_buttons.length; i ++) {item_delete_buttons[i].addEventListener("click", (e) => handleDeleteItem(e))}

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
        let itemInfo = {id:parseInt(item.id),...item.data.attributes,...item.data.attributes.list}
        let newItem = new Item(itemInfo)
        newItem.render()
        let item_delete_buttons = document.getElementsByClassName("delete-item")
        for (var i = 0; i < item_delete_buttons.length; i ++) {item_delete_buttons[i].addEventListener("click", (e) => handleDeleteItem(e))}
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
        let newList = new List({id:list.data.id,...list.data.attributes})
        newList.renderList()
        newList.element.innerHTML += `<form class="add-item">
            <input type="hidden", name="list_id", value="${newList.id}">
            <input type="text" name="description" placeholder="Add new item">
            <button type="submit" name="submit">Submit</button>
            </form>
            <br>`
        let itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}

        list_delete_buttons = document.getElementsByClassName("delete-list")
    for (var i = 0; i < list_delete_buttons.length; i ++) {list_delete_buttons[i].addEventListener("click", (e) => handleDeleteList(e))}
    })
}