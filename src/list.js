class List {
    constructor(list) {
        this.id = list.id
        this.title = list.title

        this.element = document.createElement("div")
        this.element.id = list.title
        
        List.all.push(this)
    }

    renderList() {
        this.element.innerHTML = `<h3>${this.title} <button class="delete-list">X</button></h3> `
        document.body.appendChild(this.element)
    }
}

List.all = [];