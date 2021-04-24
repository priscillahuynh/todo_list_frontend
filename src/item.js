class Item {
    constructor(item) {
        this.id = item.id 
        this.description = item.description
        this.list_id = item.list_id 

        this.element = document.createElement("li")
        this.element.id = item.id
        this.element.addEventListener("click", (e) => handleDeleteItem(e))

        Item.all.push(this)

    }
    render() {
        const list = document.getElementById(`${this.list_id}`)
        this.element.innerHTML = `
            ${this.description}
            <button>Delete</button>
            `
        list.appendChild(this.element)
    }

}

Item.all = []
