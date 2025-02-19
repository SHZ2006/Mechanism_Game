document.addEventListener("mousemove", updateSpotlight);
document.addEventListener("touchmove", updateSpotlight); 

function updateSpotlight(event) {
    let x, y;

    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }

    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
}
