import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import InputGenerator from "./InputGenerator";
import * as YUP from "yup";
import { IInputFieldsData } from "../interface/interface";
import { inputFieldValidation } from "../utils/FormValidation";
import Button from "./Button";

interface IPROPS {
    data: IInputFieldsData[];
    submitData: (param: any) => void;
    handleCancel: () => void;

    loading: boolean;
}

// Generating Dynamic form using json
const FormGenerator: React.FC<IPROPS> = (props) => {
    const { data, submitData, loading, handleCancel } = props;

    const [inputValues, setInputValues] = useState<{}>({});
    const [validations, setValidations] = useState<{}>({});

    // setting up initial values    usable for update employee case
    useEffect(() => {
        let initialState = {} as any;
        let initialValidation = {} as any;
        for (let i = 0; i < data.length; i++) {
            initialState[data[i].name] = data[i].value ?? "";

            // adding validation to a input boxes
            let fieldValidation = inputFieldValidation({
                isRequired: data[i].required,
                name: data[i].name,
                label: data[i].label,
                type: data[i].input_type,
            });

            initialValidation = {
                ...initialValidation,
                ...fieldValidation,
            };
        }
        setInputValues(initialState);

        setValidations(initialValidation);
    }, []);

    const Validation = YUP.object().shape({
        ...validations,
    });

    const handleComponent = (ele: IInputFieldsData, value: string) => {
        // generating a input box based on conditions
        // for example password field only show when the user typed username otherwise hide it
        if (ele.parent) {
            if (ele.parentValue) {
                if (ele.parentValue === value)
                    return <InputGenerator inputData={ele} />;
                return <></>;
            } else if (value) {
                return <InputGenerator inputData={ele} />;
            }
        } else {
            return <InputGenerator inputData={ele} />;
        }
    };

    return (
        <div className=" sm:mx-auto sm:w-full sm:max-w-xl">
            <Formik
                enableReinitialize
                initialValues={{ ...inputValues }}
                validationSchema={Validation}
                onSubmit={async (values) => {
                    submitData(values);
                }}
            >
                {({ handleSubmit }) => (
                    <div className=" grid grid-cols-2 gap-8 ">
                        {/* Generating form based on JSON */}
                        {data?.map((ele, idx) => (
                            <>
                                <div
                                    key={idx}
                                    className={`${
                                        ele?.gridValue
                                            ? ele?.gridValue
                                            : "col-span-2 "
                                    }`}
                                >
                                    {handleComponent(ele, "")}
                                </div>
                            </>
                        ))}

                        <div className="flex flex-row gap-2">
                            <Button
                                text="Cancel"
                                bgColor="bg-white"
                                textColor="text-black"
                                className="border-1"
                                disabled={loading}
                                handleFunction={() => handleCancel()}
                            />
                            <Button
                                text="Submit"
                                disabled={loading}
                                loading={loading}
                                handleFunction={() => handleSubmit()}
                            />
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default FormGenerator;
