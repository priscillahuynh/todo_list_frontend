const itemsEndPoint = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getItems()
    const newListForm = document.getElementById('create-new-list')
    newListForm.addEventListener("submit", (e) => handleNewListForm(e))
})

function getItems() {
    fetch(itemsEndPoint)
    .then(r => r.json())
    .then(renderItems)
}

function renderItems(items) {
    items.data.forEach(item => {
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
    debugger
    list_id = parseInt(e.target.elements[0].value)
    description = e.target.elements.description.value 
    postFetchItems(description, list_id)
    e.target.reset()
}