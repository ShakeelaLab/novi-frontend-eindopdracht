export function getYear(book) {
    return (book.first_publish_year || book.first_publish_date || null);
}

export function sortByOldest(books) {
    return [...books].sort((a, b) => {
        const yearA = getYear(a) || 9999;
        const yearB = getYear(b) || 9999;
        return yearA - yearB;
    });
}

export function sortByNewest(books) {
    return [...books].sort((a, b) => {
        const yearA = getYear(a) || 0;
        const yearB = getYear(b) || 0;
        return yearB - yearA;
    });
}