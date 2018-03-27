class Table__row {
    constructor(container, index, key, value){
        this.container = container;
        this.tr = document.createElement('tr');
        this.tr.className = 'Table__row';
        // this.tr.setAttribute('draggable', true);

        this.index = document.createElement('th');
        this.index.innerText = index;
        this.index.scope = 'row';

        this.name = document.createElement('td');
        this.name.innerText = key;
        this.name.addEventListener('dblclick', ()=>{
            this.startEditData(this.name)
        }, {once:true});

        this.value = document.createElement('td');
        this.value.innerText = value;

        this.tr.appendChild(this.index);
        this.tr.appendChild(this.name);
        this.tr.appendChild(this.value);
        this.container.appendChild(this.tr)
    }

    startEditData(e){
        console.log(e)
        let input = document.createElement('input');
        input.value = e.innerHTML;
        e.innerHTML = ' ';
        e.appendChild(input);
        this.container.addEventListener('click', this.endEditData)

    }
    endEditData(e){
        if(!e.target.matches('input')){
            this.container.removeEventListener('click', this.endEditData)
        }
    }
}

export default Table__row;
//module.exports = Table__row;