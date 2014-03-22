var container = document.getElementsByTagName('div')[0];
container.contentEditable = 'true';


colorMenu();
container.addEventListener('mouseup', function(e) {
    var select = document.getSelection();
    var range = select.getRangeAt(0);

    var copySelection = function(color) {
        select.removeAllRanges();
        select.addRange(range);
        document.execCommand('forecolor', false, color);
    }


    var colorMenu = document.getElementById('colorMenu');
    var colorInput = document.getElementById('colorInput');
    var colorButton = document.getElementById('colorButton');
    colorMenu.style.display = 'block';

    colorInput.addEventListener('keyup', function(e) {
        var value = this.value.trim();
        if (/#[0-9a-f]{3}|#[0-9a-f]{6}/i.test(value) && (value.length == 4 || value.length == 7)) {
            colorButton.style.backgroundColor = value.toLowerCase();
        } else if (/^(\d|1\d\d|2[0-5][0-5])\s(\d|1\d\d|2[0-5][0-5])\s(\d|1\d\d|2[0-5][0-5])$/.test(value) && RegExp.$1.length < 4 && RegExp.$2.length < 4 && RegExp.$3.length < 4) {
            var color = RegExp.$1 + ',' + RegExp.$2 + ',' + RegExp.$3;
            colorButton.style.backgroundColor = 'rgb(' + color + ')';
        } else {
            colorButton.style.backgroundColor = 'transparent';
        }
    })

    colorButton.addEventListener('click', function(e) {
        var defaultColor = document.defaultView.getComputedStyle(colorButton, null);
        var color = defaultColor.backgroundColor;
        copySelection(color);
    })

})


function colorMenu() {
    var div = document.createElement('div');
    var input = document.createElement('input');
    var button = document.createElement('button');
    div.appendChild(input);
    div.appendChild(button);
    document.body.appendChild(div);

    div.style.display = 'none';
    div.id = 'colorMenu';
    input.id = 'colorInput';
    button.id = 'colorButton';
}
