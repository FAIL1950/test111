let elm = document.getElementById("photo");
elm.style.position = "absolute";
let startX, startY, initialX, initialY;
/*window.addEventListener('wheel', (event) => {
    let currentWidth = window.getComputedStyle(elm).width;
    let numericWidth = parseFloat(currentWidth);
    let newWidth;
    if (event.deltaY < 0) {
        console.log('scrolling up');
        newWidth = numericWidth + 50;
    }
    else if (event.deltaY > 0) {
        console.log('scrolling down');
        newWidth = numericWidth - 50;
    }
    elm.style.width = newWidth + 'px';
});*/

let myHammer = new Hammer(elm);
myHammer.get('pinch').set({ enable: true });
myHammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

myHammer.on('panstart', function (event) {
    startX = event.center.x;
    startY = event.center.y;
    initialX = elm.offsetLeft;
    initialY = elm.offsetTop;
});

myHammer.on('panmove', function (event) {
    let dx = event.center.x - startX;
    let dy = event.center.y - startY;

    elm.style.left = initialX + dx + 'px';
    elm.style.top = initialY + dy + 'px';
});

let scale = 1;
let startScale = 1;


myHammer.on('pinchstart', function (event) {
    startScale = scale;
});


myHammer.on('pinch', function (event) {
    scale = startScale * event.scale;
    elm.style.transform = 'scale(' + scale + ')';
});