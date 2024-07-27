import * as Yup from "yup";
import { IInputValidationData } from "../interface/interface";

//  setting up  validation based on type
export const inputFieldValidation = (field: IInputValidationData) => {
    const validations = {} as any;
    const { isRequired, type, name, label } = field;

    switch (type) {
        case "text":
            validations[name] = isRequired
                ? Yup.string().required(`${label} is required`)
                : Yup.string();
            break;
        case "number":
            validations[name] = isRequired
                ? Yup.number().required(`${label} is required`)
                : Yup.number();
            break;
        case "email":
            validations[name] = isRequired
                ? Yup.string().email().required(`${label} is required`)
                : Yup.string();
            break;
        case "password":
            validations[name] = isRequired
                ? Yup.string().required(`${label} is required`)
                : Yup.string();
            break;
        case "select":
            validations[name] = isRequired
                ? Yup.string().required(`${label} is required`)
                : Yup.string();
            break;
        case "textarea":
            validations[name] = isRequired
                ? Yup.string().required(`${label} is required`)
                : Yup.string();
            break;
        case "phoneNumber":
            validations[name] = isRequired
                ? Yup.string().required(`${label} is required`).min(10).max(10)
                : Yup.string();
            break;

        // Add more cases for other field types
        default:
            break;
    }

    return validations;
};
