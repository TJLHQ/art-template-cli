import './index.scss'
var data ={
    list:["6666","7777","8888","99999","10000"],
    header:'header98',
    footer:'footer54'
}
const render = require('./index.art');
const html = render(data);
document.getElementById('content').innerHTML = html