import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useField } from "formik";
import ErrorText from "./ErrorText";

interface PropTextField extends HTMLInputElement {
    boxWidth: string;
    label: string;
    handleFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: any;
}

const InputField: React.FC<Partial<PropTextField>> = (props) => {
    const handleToggle = () => {
        setTogglePassword(!togglePassword);
    };
    const {
        placeholder,
        name,
        type,
        disabled,
        label,
        readOnly,
        icon: IconComponent,
    } = props;
    const [togglePassword, setTogglePassword] = useState<boolean>(false);

    const [, meta, helpers] = useField(name as string);

    return (
        <>
            <div className="relative sm:space-y-1">
                <label
                    htmlFor="name"
                    className="absolute capitalize -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                    {label}
                </label>

                <input
                    placeholder={placeholder}
                    name={name}
                    readOnly={readOnly}
                    type={togglePassword ? "text" : type}
                    value={meta.value}
                    onChange={(e) => helpers.setValue(e.target.value)}
                    multiple
                    className="block w-full rounded-md  py-1.5 px-2 sm:h-[47px] text-xs text-gray-900 shadow-sm  placeholder:text-gray-400  outline-none border bg-white sm:text-xs sm:leading-6"
                    disabled={disabled ?? false}
                    onWheel={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            e.target.blur();
                        }
                    }}
                />

                {type === "password" ? (
                    togglePassword ? (
                        <Eye
                            onClick={handleToggle}
                            className="h-4 cursor-pointer absolute top-10 sm:top-10 right-3"
                        />
                    ) : (
                        <EyeOff
                            onClick={handleToggle}
                            className="h-4 cursor-pointer absolute top-10 sm:top-10 right-3"
                        />
                    )
                ) : null}
                {IconComponent && (
                    <IconComponent
                        className={`absolute top-10 left-3 sm:top-9 sm:left-3 text-light-gray w-4 h-4 sm:w-6 sm:h-6 ${
                            disabled && "opacity-60"
                        } dark:text-dark-text-gray`}
                    />
                )}
                {(meta.error || meta.touched) && (
                    <div className="ml-2 absolute capitalize text-xs tracking-wide text-pink-200">
                        <ErrorText text={meta.error as string} />
                    </div>
                )}
            </div>
        </>
    );
};

export default InputField;
