const overlay = document.querySelector('.overlay');

document.addEventListener('mousemove', e => {
  const x = e.clientX;
  const y = e.clientY;
  overlay.style.mask = `radial-gradient(circle 50px at ${x}px ${y}px, rgba(0,0,0,0) 49px, rgba(0,0,0,1) 50px)`;
  overlay.style.webkitMask = `radial-gradient(circle 50px at ${x}px ${y}px, rgba(0,0,0,0) 49px, rgba(0,0,0,1) 50px)`;
});
