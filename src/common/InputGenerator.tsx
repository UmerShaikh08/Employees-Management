import React from "react";
import { IInputFieldsData } from "../interface/interface";
import SelectMenu from "./SelectMenu";
import InputField from "./InputField";
import InputImage from "./InputImage";

interface IPROPS {
    inputData: IInputFieldsData;
}
const InputGenerator: React.FC<IPROPS> = (props) => {
    const { inputData } = props;

    // rendering field based on input type
    switch (inputData.input_type) {
        case "text":
            return (
                <InputField
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    type={inputData.input_type}
                />
            );
        case "email":
            return (
                <InputField
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    type={inputData.input_type}
                />
            );
        case "password":
            return (
                <InputField
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    type={inputData.input_type}
                />
            );
        case "select":
            return (
                <SelectMenu
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    options={inputData.options}
                    defaultValue={inputData?.value}
                />
            );
        case "number":
            return (
                <InputField
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    type={inputData.input_type}
                />
            );
        case "phoneNumber":
            return (
                <InputField
                    name={inputData.name}
                    value={inputData?.value}
                    placeholder={inputData.placeholder}
                    label={inputData.label}
                    type={inputData.input_type}
                />
            );
        case "image":
            return <InputImage name={inputData.name} />;
    }
};

export default InputGenerator;
