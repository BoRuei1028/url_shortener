document.addEventListener("DOMContentLoaded", function () {
  // DOM Ready!
  const button = document.querySelector('#btn-copy')
  button.addEventListener('click', copyLink)
});

function copyLink() {
  let copyText = document.getElementById("url")

  const selection = window.getSelection();

  const range = document.createRange();

  range.selectNodeContents(copyText);

  selection.removeAllRanges();

  selection.addRange(range);

  document.execCommand('copy');
}