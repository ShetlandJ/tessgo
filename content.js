const loadHiddenWords = async () => {
    const response = await fetch(chrome.runtime.getURL('hidden-words.json'));
    const data = await response.json();
    return data.hiddenWords;
};

function findParentByIdPattern(childElement) {
    let parent = childElement.parentElement;
    while (parent) {
        if (parent.id && /^tile-\d+$/.test(parent.id)) { // Regex to match id pattern 'tile-XXXXXXX'
            return parent;
        }
        parent = parent.parentElement; // Move up the DOM tree
    }
    return null; // If no matching parent is found
}

const shouldBeHidden = (element, hiddenWordsList) => {
    const containsDrinkAware = element.innerText.toLowerCase().includes('drinkaware');

    if (containsDrinkAware) {
        return true;
    }

    const text = element.innerText.toLowerCase();
    return hiddenWordsList.some(word => text.includes(word));
};

const getRandomImage = () => {
    // Generate a random number between 1 and 10
    const randomIndex = Math.floor(Math.random() * 4) + 1;

    // Get the image URL using chrome.runtime.getURL() to load from the extension
    const imagePath = chrome.runtime.getURL(`images/${randomIndex}.jpg`);

    return imagePath;
}


const hideElements = async () => {
    const hiddenWordsList = await loadHiddenWords();
    const itemElements = document.getElementsByClassName('product-details--wrapper');

    Array.from(itemElements).forEach((item, index) => {
        if (shouldBeHidden(item, hiddenWordsList)) {
            const parent = findParentByIdPattern(item);

            if (parent) {
                const randomImage = getRandomImage();
                parent.innerHTML = `<img src="${randomImage}" alt="Random image of a kitten" />`;
            }
        }
    });
};

hideElements();
