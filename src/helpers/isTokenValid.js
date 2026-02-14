function isTokenValid(decodedToken) {

    if (!decodedToken || !decodedToken.exp) return false;
    // Math.floor so the value does not include any decimals
    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp > now;
}

export default isTokenValid;