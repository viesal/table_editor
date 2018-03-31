// TODO: move to utils
function addElementEventListener(element, eventName, callback) {
    element.addEventListener(eventName, callback);

    return () => {
        element.removeEventListener(eventName, callback);
    };
}

// TODO: use pascal case, use normal import
class Table__row {
    constructor(container, index, key, value) {
        this.container = container;
        this.tr = document.createElement('tr');
        this.tr.className = 'Table__row';

        this.index = document.createElement('th');
        this.index.innerText = index;
        this.index.scope = 'row';

        // TODO: rename
        this.name = document.createElement('td');
        this.name.innerText = key;
        this.name.className = 'unselectable';
        this.name.addEventListener('dblclick', () => {
            this.startEditData(this.name);
        });

        // TODO: rename
        this.value = document.createElement('td');
        this.value.innerText = value;
        this.value.className = 'unselectable';
        this.value.addEventListener('dblclick', () => {
            this.startEditData(this.value);
        });

        this.tr.appendChild(this.index);
        this.tr.appendChild(this.name);
        this.tr.appendChild(this.value);
        this.container.appendChild(this.tr);
    }

    startEditData(fieldElement) {
        const input = document.createElement('input');
        input.value = fieldElement.innerHTML;
        fieldElement.innerHTML = '';
        fieldElement.appendChild(input);
        input.focus();

        const unsubscribe = addElementEventListener(input, 'blur', () => {
            input.parentNode.innerHTML = input.value;

            unsubscribe();
        })
    }

}

export default Table__row;