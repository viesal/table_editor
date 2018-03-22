class Table__row {
    constructor(container, key, value){
        this.container = container;
        this.tr = document.createElement('tr');

        this.name = document.createElement('td');
        this.name.innerText = key;

        this.value = document.createElement('td');
        this.value.innerText = value;

        this.tr.appendChild(this.name);
        this.tr.appendChild(this.value);
        this.container.appendChild(this.tr)
    }
}

export default Table__row;
//module.exports = Table__row;