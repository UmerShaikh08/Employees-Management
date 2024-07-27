import React from "react";
import { useField } from "formik";

import { CameraIcon } from "@heroicons/react/24/outline";
import ErrorText from "./ErrorText";
interface UploadProps {
    name: string;
    width?: string;
    height?: string;
}

const InputImage: React.FC<UploadProps> = ({ name, width, height }) => {
    const [, { value, error }, { setValue }] = useField(name);

    const handelonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(file);
        } else {
            setValue(null);
        }
    };

    return (
        <div className="my-2 mt-5 w-[100%] ">
            <div className="flex flex-col space-y-2 w-full mx-auto">
                <label className="relative retext-lg text-richblack-5 w-full mx-auto">
                    <div className="bg-richblack-700 w-full rounded-full cursor-pointer mx-auto items-center justify-center  ">
                        <div
                            className="flex w-full flex-col items-center "
                            role="presentation"
                            tabIndex={0}
                        >
                            <input
                                type="file"
                                accept=".jpeg,.jpg,.png,.webp"
                                tabIndex={-1}
                                multiple={false}
                                onChange={handelonchange}
                                className="hidden"
                            />
                            <div className="relative  ">
                                {value && typeof value === "object" ? (
                                    <img
                                        src={URL.createObjectURL(value as any)}
                                        alt=""
                                        className={`   ${
                                            width ? width : "w-28"
                                        }   ${
                                            height ? height : "h-28"
                                        } rounded-full object-cover`}
                                    />
                                ) : value && typeof value === "string" ? (
                                    <img
                                        src={`${value}?${Date.now()}`}
                                        alt=""
                                        className={`   ${
                                            width ? width : "w-28"
                                        }   ${
                                            height ? height : "h-28"
                                        } rounded-full object-cover`}
                                    />
                                ) : (
                                    <img
                                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                        alt=""
                                        className={`   ${
                                            width ? width : "w-28"
                                        }   ${
                                            height ? height : "h-28"
                                        } rounded-full object-cover`}
                                    />
                                )}

                                <CameraIcon className="w-6 absolute inset-20 text-gray-700" />
                            </div>
                        </div>
                    </div>
                </label>
                {error && (
                    <div className="ml-2 text-xs tracking-wide text-pink-200">
                        <ErrorText text={error} />
                    </div>
                )}
            </div>
            {/* )} */}
        </div>
    );
};

export default InputImage;
