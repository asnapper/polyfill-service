context = this;

function evalHandler(url) {
    return function () {
        var result = function(str) {
            return eval(str);
        }.call(context, this.responseText) ? true : false;
        var name = url.replace('/detect.js', '').replace('../polyfills/', '');
        renderResult(name, result);
        if (!result) {
            reportResult(name, result);
        }
    }
}

function renderResult(name, result) {
    var parentSuccessful = document.getElementById('successful');
    var parentFailed = document.getElementById('failed');

    var container = document.createElement('DIV');
    container.setAttribute('class', 'row');

    var resultContainer = document.createElement('SPAN');
    resultContainer.setAttribute('class', 'result result-' + result);

    var pathContainer = document.createElement('SPAN');
    pathContainer.setAttribute('class', 'path');

    resultContainer.appendChild(document.createTextNode(result));
    pathContainer.appendChild(document.createTextNode(name));

    container.appendChild(pathContainer);
    container.appendChild(resultContainer);

    if (result) {
        parentSuccessful.appendChild(container);
    } else {
        parentFailed.appendChild(container);
    }
}

function getConfig() {
    return document.getElementById('oipfcfg').configuration;
}

function reportResult(name, result) {
    var localSystem = getConfig();
    var oReq = new XMLHttpRequest();
    oReq.open('POST', '/report');
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.send(JSON.stringify({device: localSystem, name, result}));
    delete oReq;
}

function main() {
    for (var i = 0; i < index.length; i++) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", evalHandler(index[i]));
        oReq.open("GET", index[i]);
        oReq.send();
        delete oReq;
    }
}

main();