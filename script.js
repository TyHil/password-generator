const centered = document.getElementById('centered');
const display = document.getElementById('display');
const length = document.getElementById('length');
const copy = document.getElementById('copy');
const generate = document.getElementById('generate');

function generatePassword() {
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&*?@~';
  
  display.value = Array.from(crypto.getRandomValues(new Uint32Array(length.value))).map((x) => wishlist[x % wishlist.length]).join('');
}
generatePassword();

length.addEventListener('change', function() {
  this.value = Math.max(8, Math.min(this.value, 32));
  generatePassword();
});

copy.addEventListener('click', function() {
  navigator.clipboard.writeText(display.value).then(function() {
    const rectangle = display.getBoundingClientRect();
    display.style.setProperty('--y', -1 * (rectangle.y + rectangle.height) + 'px');
    display.classList.add('copy');
    display.addEventListener('animationend', function() {
      display.addEventListener('animationend', function() {
        display.classList.remove('copy');
      }, {once: true});
    }, {once: true});
  });
});

generate.addEventListener('click', function() {
  setTimeout(generatePassword, 500);
  centered.classList.add('bounce');
  display.addEventListener('animationend', function() {
    centered.classList.remove('bounce');
  }, {once: true});
});
