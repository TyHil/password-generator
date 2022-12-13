const display = document.getElementById("display");
const length = document.getElementById("length");
const reset = document.getElementById("reset");
const generate = document.getElementById("generate");

function generatePassword() {
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
  
  display.value = Array.from(crypto.getRandomValues(new Uint32Array(length.value))).map((x) => wishlist[x % wishlist.length]).join('');
}
generatePassword();

length.addEventListener("change", function() {
  this.value = Math.max(8, Math.min(this.value, 32));
  generatePassword();
});

reset.addEventListener("click", function() {
  length.value = 16;
  generatePassword();
});

generate.addEventListener("click", generatePassword);
