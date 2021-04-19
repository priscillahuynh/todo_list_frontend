const endPoint = "http://localhost:3000/api/v1/lists"

document.addEventListener('DOMContentLoaded', () => {
    getLists()
})

function getLists() {
    fetch(endPoint)
    .then(r => r.json())
    .then(lists => {
        lists.data.forEach(list => {
            const listMarkup = `
            <div data-id=${list.id}> 
            <h3>${list.attributes.title}</h3>
            </div> ` ;
            document.querySelector('#list-container').innerHTML+= listMarkup

            list.attributes.items.forEach(item => {
                const itemsMarkup = `
                <p>${item.description}</p>
                `
                document.querySelector('#list-container').innerHTML+= itemsMarkup
            })
        })
    })
}

