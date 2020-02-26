// Disable PINCH and DBLTAP zoom

document.addEventListener('touchmove', function (event) {
    if (event.scale !== undefined && event.scale !== 1) { 
      event.preventDefault();
    }
  }, { passive: false });

  var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });
