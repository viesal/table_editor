class Table__row {
    constructor(container, index, key, value){
        this.container = container;
        this.tr = document.createElement('tr');
        this.tr.className = 'Table__row';

        this.index = document.createElement('th');
        this.index.innerText = index;
        this.index.scope = 'row';

        this.name = document.createElement('td');
        this.name.innerText = key;
        this.name.className = 'unselectable';
        this.name.addEventListener('dblclick', (e)=>{
            this.startEditData(e);
        });

        this.value = document.createElement('td');
        this.value.innerText = value;
        this.value.className = 'unselectable';
        this.value.addEventListener('dblclick', (e)=>{
            this.startEditData(e);
        });

        this.tr.appendChild(this.index);
        this.tr.appendChild(this.name);
        this.tr.appendChild(this.value);
        this.container.appendChild(this.tr);

        this.endEditData = (e)=>{
            if(!e.target.matches('input')){
                let input = this.container.getElementsByTagName('input')[0];
                input.parentNode.innerHTML = input.value;
                this.container.removeEventListener('click', this.endEditData)
            }
        }
    }

    startEditData(e){
        let input = document.createElement('input');
        input.value = e.target.innerHTML;
        e.target.innerHTML = ' ';   
        e.target.appendChild(input);
        this.container.addEventListener('click', this.endEditData)
    }
    
}

export default Table__row;