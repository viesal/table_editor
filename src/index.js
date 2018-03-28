import Table from './Table/Table.js';
import img from './favicon.png';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'webpack-icons-installer/bootstrap';


window.onload = ()=>{
    let table = new Table(document.body);
    let favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'static/'+img;
    favicon.type = 'image/png';
    document.head.appendChild(favicon);

};

