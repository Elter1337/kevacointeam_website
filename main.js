function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading the HTML:', error));
};

document.addEventListener("DOMContentLoaded", function () {
    loadHTML('/nav.html', 'nav-placeholder', function () {
        // Initialize dropdown after nav is loaded
        setupDropdown();
    });
    loadHTML('/footer.html', 'footer-placeholder');
    set_lang();
});

function setupDropdown() {
    var selected = document.querySelector('select-selected');
    var itemsContainer = selected.nextElementSibling;

    if (selected) {
        selected.addEventListener('click', function () {
            itemsContainer.classList.toggle('select-hide');
        });
    }
    itemsContainer.querySelectorAll('select-items div').forEach(function (item) {
        item.addEventListener('click', function () {
            selected.innerHTML = this.innerHTML; // Update the displayed value
            selected.setAttribute('data-value', this.getAttribute('data-value')); // Update the stored value
            itemsContainer.classList.add('select-hide'); // Hide items after selection
        });
    });
};

function accordian_func(section) {
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

function lang_close() {
    var x = document.getElementById("lang_acc");
    x.className = x.className.replace(" w3-show", "");
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

function loadTranslations(language) {
    fetch(`/translations/${language}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll("[data-translate]").forEach(el => {
                const key = el.getAttribute("data-translate");
                el.textContent = translations[key];
            });
            // Update the language button to show the current language
            updateLanguageButton(language);
            // Save the selected language in localStorage
            localStorage.setItem('selectedLanguage', language);
        })
        .catch(error => console.error('Error loading translation file:', error));
};

function set_lang() {
    // Check if a language has been previously selected and saved
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        loadTranslations(savedLanguage);
    } else {
        loadTranslations('en');
    }
};

function createLanguageMap() {
    const languageDivs = document.querySelectorAll('#lang_acc > div');
    const langMap = {};

    languageDivs.forEach(div => {
        // Extract the onclick attribute value
        const onClickValue = div.getAttribute('onclick');
        // Use a regular expression to match the language code within the 'loadTranslations()' call
        const match = /loadTranslations\('(\w+)'\)/.exec(onClickValue);
        // If a match is found and the div contains text, add it to the langMap
        if (match && match[1] && div.textContent.trim()) {
            langMap[match[1]] = div.textContent.trim();
        }
    });

    return langMap;
};

function updateLanguageButton(language) {
    const langMap = createLanguageMap();
    const languageButton = document.querySelector('#langBtn span');
    if (languageButton) {
        languageButton.textContent = langMap[language] || 'Select Language';
    }
};
