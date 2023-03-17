import Toastify from "toastify-js";

export default function displayToast(label, post) {
  Toastify({
    text: label,
    duration: 2000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: post, // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#16161D",
      color: "#FFF",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   maxWidth: "200px"
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
