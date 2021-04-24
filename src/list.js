class List {
    constructor(list, listAttributes) {
        this.id = list.id
        this.title = listAttributes.title

        this.element = document.createElement("div")
        this.element.id = list.id
        List.all.push(this)
    }

    renderList() {
        this.element.innerHTML = `<h3>${this.title} </h3>`
        document.body.appendChild(this.element)
    }

    addNewItemFormtoList() {
        this.element.insertAdjacentHTML("afterend", this.renderNewItemForm())
    }

    renderNewItemForm() {
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