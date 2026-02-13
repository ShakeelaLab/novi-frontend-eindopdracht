export function extractWorkId(book) {
    if (!book) return null;

    if (typeof book.key === "string" && book.key.startsWith("/works/")) {
        return book.key.replace("/works/", "").split("?")[0].trim();
    }

    if (Array.isArray(book.work_key) && book.work_key.length > 0) {
        return book.work_key[0].replace("/works/", "").split("?")[0].trim();
    }

    if (Array.isArray(book.seed)) {
        const workSeed = book.seed.find(s => typeof s === "string" && s.startsWith("/works/"));
        if (workSeed) {
            return workSeed.replace("/works/", "").split("?")[0].trim();
        }
    }

    if (typeof book.key === "string") {
        return book.key.split("?")[0].trim();
    }

    return null;
}
