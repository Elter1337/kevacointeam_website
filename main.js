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
