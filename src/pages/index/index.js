import './index.scss'
var data ={
    name:'李四',
    age:20,
    list:["11111","222222","33333","4444","55555"],
    header:'header222',
    footer:'footer333'
}
const render = require('./index.art');
const html = render(data);
document.getElementById('content').innerHTML = html