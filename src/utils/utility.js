
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createElement(elementString, ...classes) {
    const element = document.createElement(elementString);
    element.classList.add(...classes);
    return element;
}

