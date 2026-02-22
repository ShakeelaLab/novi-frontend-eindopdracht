function isTokenValid(decodedToken) {

    if (!decodedToken || !decodedToken.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp > now;
}

export default isTokenValid;