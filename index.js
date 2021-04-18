const endPoint = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getItems()
})

function getItems() {
    fetch(endPoint)
    .then(r => r.json())
    .then(items => {
        items.data.forEach(item => {
            const itemsMarkup = `
            <div data-id=${item.id}> 
            <h3>${item.attributes.description}</h3>
            <p>${item.attributes.list.title}</p>
            <button data-id=${item.id}>Delete</button>
            </div>
            <br>` ;

            document.querySelector('#item-container').innerHTML+= itemsMarkup
        })
    })
}

