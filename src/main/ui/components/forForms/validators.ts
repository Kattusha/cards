export const requiredField = (value: string) => {
    if (value)
        return undefined;
    else return "Field is required";
}
// export const compareField = (value: any, dispatch: any, props: any) => {
//     if (value !== props.initialValues.userName)
//         return undefined;
//     else return "Field not changed";
// }

const maxLength = (maxLength: number) => (value: string) => {
    if (value.length >= maxLength)
        return undefined;
    else return `Password must be more than ${maxLength - 1} characters`;
}
export const maxLength8 = maxLength(8);

export const emailValidation = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}