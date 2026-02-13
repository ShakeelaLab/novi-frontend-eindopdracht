export function isValidPassword(password) {
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasMinLength && hasUppercase && hasNumber;
}

export function isValidEmail(email) {
    const hasAt = email.includes("@");
    const noComma = !email.includes(",");
    const noDotAtEnd = !email.endsWith(".");
    const atPosition = email.indexOf("@");
    const lastDot = email.lastIndexOf(".");
    const dotAfterAt = lastDot > atPosition;
    return hasAt && noComma && noDotAtEnd && dotAfterAt;
}