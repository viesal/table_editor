import img from './favicon.png';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'webpack-icons-installer/bootstrap';
import {Table} from './Table/Table';

function createTableInBody() {
    new Table(document.body);
}

window.addEventListener('load', () => {
    createTableInBody();

    // TODO: move to html
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = `static/${img}`;
    favicon.type = 'image/png';
    document.head.appendChild(favicon);
});
