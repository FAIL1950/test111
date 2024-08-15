const elements = document.querySelectorAll('.photo');
console.log(elements);
let startX, startY, initialX, initialY;
elements.forEach((item) => {
    item.style.position = "absolute";
    const myHammer = new Hammer(item);
    item.addEventListener('wheel', (event) => {
        event.preventDefault();
        let currentWidth = window.getComputedStyle(item).width;
        let numericWidth = parseFloat(currentWidth);
        let newWidth;

        if (event.deltaY < 0) {
            newWidth = numericWidth + 10;
        }
        else if (event.deltaY > 0) {
            newWidth = numericWidth - 10;
        }
        item.style.width = newWidth + 'px';

    });

    myHammer.on('panstart', function (event) {
        startX = event.center.x;
        startY = event.center.y;
        initialX = item.offsetLeft;
        initialY = item.offsetTop;
    });

    myHammer.on('panmove', function (event) {
        let dx = event.center.x - startX;
        let dy = event.center.y - startY;

        item.style.left = initialX + dx + 'px';
        item.style.top = initialY + dy + 'px';
    });

    let scale = 1;
    let startScale = 1;
    myHammer.get('pinch').set({ enable: true });

    myHammer.on('pinchstart', function (event) {
        startScale = scale;
    });
    
    
    myHammer.on('pinch', function (event) {
        scale = startScale * event.scale;
        item.style.transform = 'scale(' + scale + ')';
    });
});














