/* Constants */

const centered = document.getElementById('centered');
const display = document.getElementById('display');
const wishlist = document.getElementById('wishlist');
const length = document.getElementById('length');
const copy = document.getElementById('copy');
const generate = document.getElementById('generate');



/* Animation management */

let animating = 0;

function onAnimationEnd(element, times, callback) {
  element.addEventListener("animationend", function() {
    if (times <= 1) {
      callback();
    } else {
      onAnimationEnd(element, times - 1, callback);
    }
  }, { once: true });
}



/* Generate password */

function generatePassword() {
  const password = Array.from(crypto.getRandomValues(new Uint32Array(length.value))).map((x) => wishlist.value[x % wishlist.value.length]).join('');
  setTimeout(function() {
    display.value = password;
  }, 600);
  centered.classList.add('bounce');
  onAnimationEnd(display, 1, function() {
    centered.classList.remove('bounce');
  });
}
generatePassword();



/* Options */

length.addEventListener('change', function() {
  this.value = Math.max(8, Math.min(this.value, 32));
  generatePassword();
});

wishlist.addEventListener('change', generatePassword);

copy.addEventListener('click', function() {
  navigator.clipboard.writeText(display.value).then(function() {
    if (!animating) {
      animating = 1;
      const rectangle = display.getBoundingClientRect();
      display.style.setProperty('--y', document.body.offsetHeight - rectangle.y + 'px');
      centered.classList.add('copy');
      onAnimationEnd(display, 2, function() {
        centered.classList.remove('copy');
        animating = 0;
      });
    }
  });
});

generate.addEventListener('click', generatePassword);
