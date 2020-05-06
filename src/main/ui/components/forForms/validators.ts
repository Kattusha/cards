export const requiredField = (value: string) => {
    if (value)
        return undefined;
    else return "Field is required";
}

export const maxLength = (maxLength: number) => (value: string) => {
    if (value.length >= maxLength)
        return  undefined;
    else return `Invalid password`;
}

export const emailValidation = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}