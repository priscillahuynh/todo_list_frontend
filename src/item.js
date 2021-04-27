class Item {
    constructor(item) {
        this.id = item.id 
        this.description = item.description
        this.list_id = item.list_id

        this.element = document.createElement("li")
        this.element.id = item.id
        Item.all.push(this)
    }
    
    render() {
        const list = document.getElementById(this.list_id)
        this.element.innerHTML = `
            ${this.description}
            <button class="delete-item">X</button>
            `
        list.appendChild(this.element)
        list.insertAdjacentHTML("beforeend", this.renderNewItemForm())
    }

    renderNewItemForm() {
        return `
            <form class="add-item">
            <input type="hidden", name="list_id", value="${this.list_id}">
            <input type="text" name="description" placeholder="Add new item">
            <button type="submit" name="submit">Submit</button>
            </form>
            <br>`
    }   

}

Item.all = []
