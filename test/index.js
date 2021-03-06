var splitter = require('../');
var crel = require('crel');

window.addEventListener('load', function(){

    var rows = document.createDocumentFragment();
    var headerRow = crel('tr',
        crel('th', 'cell 1 - header ', i),
        crel('th', 'cell 2 - header'),
        crel('th', 'cell 3 - header'),
        crel('th', 'cell 4 - header')
    );
    rows.appendChild(headerRow);

    for(var i = 0; i < 200; i ++){
        var row = crel('tr',
            crel('td', 'cell 1 - row ', i),
            crel('td', 'cell 2'),
            crel('td', 'cell 3'),
            crel('td', 'cell 4')
        );
        rows.appendChild(row);
    }

    document.querySelector('.data').appendChild(rows);

    function print(){
        var pageElement = document.querySelector('.page');
        pageElement.style.width = '778px';

        var pages = splitter(pageElement, 1082, 200, {
            shouldPageBrake: element => (element.getAttribute('pageBreak') || '').split(' ')
        });
        var exitPrintViewButton = crel('button', { class: 'exitPrintView' }, 'Close print view');
        var printWrapper = crel('div', { class: 'printWrapper' }, exitPrintViewButton, pages);
        crel(document.body, printWrapper);
        pageElement.style.width = null;

        function exitPrintView(){
            printWrapper.remove();
        }

        exitPrintViewButton.addEventListener('click', exitPrintView);
    }

    document.querySelector('button.print').addEventListener('click', print);
});