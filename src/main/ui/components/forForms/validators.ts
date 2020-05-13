export const requiredField = (value: string) => {
    if (value)
        return undefined;
    else return "Field is required";
}

export const maxLength = (maxLength: number) => (value: string) => {
    if (value.length >= maxLength)
        return  undefined;
    else return `Password must be more than ${maxLength-1} characters`;
}

export const emailValidation = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}

export const passwordValidation = (minLength: number) => (value: string) => {
    return value.length > minLength ? undefined : `Password must be more than ${minLength} characters`;
}