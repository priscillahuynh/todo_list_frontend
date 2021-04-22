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
            let newList = new List(list, list.attributes)
            const list_container = document.createElement("div")
            document.body.appendChild(list_container)
            list_container.id = list.id
            list_container.innerHTML+= newList.renderListTitle()
            list.attributes.items.forEach(item => {
                let newItem = new Item(item) 
                list_container.innerHTML+= newItem.render()
                })
                
            list_container.insertAdjacentHTML("afterend", newList.renderListForm())
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
    .then(item => {
        let nestedItemInfo = {id: parseInt(`${item.data.id}`), description:`${item.data.attributes.description}`, list_id:parseInt(`${item.data.attributes.list.id}`)}
        let newItem = new Item(nestedItemInfo)
        const list_container = document.getElementById(parseInt(`${item.data.attributes.list.id}`))
        list_container.innerHTML += newItem.render()
    })
}




