function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading the HTML:', error));
};

document.addEventListener("DOMContentLoaded", function () {
    loadHTML('/nav.html', 'nav-placeholder');
    //loadHTML('/head.html', 'head-placeholder');
    loadHTML('/footer.html', 'footer-placeholder');

});

function myAccFunc(section) {
    var x = document.getElementById(section);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
};

// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
};

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
};

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var images = document.getElementsByClassName('imgZoom');
var imageIndex;

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
};

// Attach event listener to the window to close modal on clicking outside of the image or buttons
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

// Function to open the modal
function openModal() {
    modal.style.display = "flex";
};

// Function to set the image based on the imageIndex
function setCurrentImage() {
    modalImg.src = images[imageIndex].src;
    modalImg.alt = images[imageIndex].alt;
};

// Function to change the image
function changeImage(step) {
    imageIndex += step;
    if (imageIndex >= images.length) {
        imageIndex = 0;
    } else if (imageIndex < 0) {
        imageIndex = images.length - 1;
    }
    setCurrentImage();
};

// Attach event listeners to images to open modal
for (var i = 0; i < images.length; i++) {
    images[i].onclick = function () {
        imageIndex = Array.prototype.indexOf.call(images, this);
        openModal();
        setCurrentImage();
    }
};

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

function copyToClipboard(element) {
    const textToCopy = element.textContent; // Get the text content of the xmp element
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showTooltip(element, 'Copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            showTooltip(element, 'Failed to copy!');
        });
};

function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);
    const coords = element.getBoundingClientRect();
    tooltip.style.left = `${coords.left + window.scrollX}px`;
    tooltip.style.top = `${coords.top + coords.height + window.scrollY + 5}px`;
    tooltip.style.opacity = 1;

    setTimeout(() => {
        tooltip.style.opacity = 0;
        setTimeout(() => document.body.removeChild(tooltip), 500);
    }, 3000); // Display for 3 seconds
};
