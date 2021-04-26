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
        new_list = new List({id:list.id,...list.attributes})
        new_list.renderList()
        list.attributes.items.forEach(item => {
            new_item = new Item(item)
            new_item.render()
        })
    })

    list_delete_buttons = document.getElementsByClassName("delete-list")
    for (var i = 0; i < list_delete_buttons.length; i ++) {list_delete_buttons[i].addEventListener("click", (e) => handleDeleteList(e))}

    item_delete_buttons = document.getElementsByClassName("delete-item")
    for (var i = 0; i < item_delete_buttons.length; i ++) {item_delete_buttons[i].addEventListener("click", (e) => handleDeleteItem(e))}

    itemForms = document.getElementsByClassName("add-item")
    for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}
}

function handleNewItemForm(e) {
    e.preventDefault()
    list_id = parseInt(e.target.elements[0].value)
    description = e.target.elements.description.value 
    postFetchItems(description, list_id)
    e.target.reset()
}

function handleDeleteItem(e){
    const id = e.target.parentElement.id 
    e.target.parentElement.remove()
    const configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    }
    fetch(`http://localhost:3000/api/v1/items/${id}`, configObj)
        // .then(r => r.json())
        // .then(json => alert(json.message)) 
        //for some reason json message is rendering multiple times
}

function handleDeleteList(e){
    const id = e.target.parentElement.parentElement.id 
    e.target.parentElement.parentElement.remove()
    const configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    }
    fetch(`http://localhost:3000/api/v1/lists/${id}`, configObj)
        .then(r => r.json())
        .then(json => alert(json.message))
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
        let itemInfo = {id: parseInt(item.data.id), ...item.data.attributes}
        let newItem = new Item(itemInfo)
        newItem.render()

        itemForms = document.getElementsByClassName("add-item")
        for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}

        item_delete_buttons = document.getElementsByClassName("delete-item")
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
        let newList = new List({id:parseInt(list.data.id),...list.data.attributes})
        newList.renderList()

    itemForms = document.getElementsByClassName("add-item")
    for (var i = 0; i < itemForms.length; i ++) {itemForms[i].addEventListener("submit", (e) => handleNewItemForm(e))}

    item_delete_buttons = document.getElementsByClassName("delete-item")
    for (var i = 0; i < item_delete_buttons.length; i ++) {item_delete_buttons[i].addEventListener("click", (e) => handleDeleteItem(e))}

    list_delete_buttons = document.getElementsByClassName("delete-list")
    for (var i = 0; i < list_delete_buttons.length; i ++) {list_delete_buttons[i].addEventListener("click", (e) => handleDeleteList(e))}
    })
}


