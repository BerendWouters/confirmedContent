document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  window.onresize = setContainerSize;
  setContainerSize();
});
function setContainerSize() {
	let cont = document.querySelector("#js_container")
	// console.info(cont.offsetWidth);
	console.info(cont.scrollWidth > cont.clientWidth);
	cont.removeAttribute("style");
	let counter = 0;
	while (cont.scrollWidth > cont.clientWidth && counter < 500) {
		height = cont.clientHeight;
		cont.style.height = (height + 200) + "px";
		counter++;
	}
}