class List {
    constructor(list) {
        this.id = list.id
        this.title = list.title

        this.element = document.createElement("div")
        this.element.id = list.id
        
        List.all.push(this)
    }

    renderList() {
        this.element.innerHTML = `<h3>${this.title} <button class="delete-list">X</button></h3> `
        document.body.appendChild(this.element)
        this.element.insertAdjacentHTML("beforeend", this.addItemForm())
    }

    addItemForm(){
        return `
            <form class="add-item">
            <input type="hidden", name="list_id", value="${this.id}">
            <input type="text" name="description" placeholder="Add new item">
            <button type="submit" name="submit">Submit</button>
            </form>
            <br>`
    }
}

List.all = [];