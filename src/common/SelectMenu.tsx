import { Fragment, useEffect, useState } from "react";
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useField } from "formik";
import ErrorText from "./ErrorText";
import { IOption } from "../interface/interface";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

interface ISelectMenu {
    label: string;
    options?: IOption[];
    name: string;
    value?: string;
    defaultValue?: string;
    placeholder: string;
    icon?: any;
    emptyError?: string;
    disabled?: boolean;
}

const SelectMenu = (props: ISelectMenu) => {
    const {
        label,
        name,
        options,
        defaultValue,
        placeholder,
        emptyError,
        disabled,
        icon: IconComponent,
    } = props;
    const [, meta, helpers] = useField(name);

    const [selected, setSelected] = useState<string>(
        meta.value ?? defaultValue
    );

    useEffect(() => {
        helpers.setValue(selected);
    }, [selected]);

    return (
        <div className="space-y-2">
            <Listbox
                onChange={setSelected}
                defaultValue={selected}
                disabled={disabled}
                value={selected}
            >
                {({ open }) => (
                    <div>
                        <div className="relative mt-2">
                            <ListboxButton className="relative sm:h-[47px] w-full cursor-pointer bg-white border rounded-md py-2 sm:py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm text-xs sm:text-sm sm:leading-6 bg-sky dark:bg-dark-light dark:text-dark-text-gray flex gap-3">
                                <Label className="absolute capitalize -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                                    {label}
                                </Label>

                                {IconComponent && (
                                    <IconComponent
                                        className={`text-light-gray ${
                                            disabled && "opacity-60"
                                        }`}
                                    />
                                )}
                                <span
                                    className={`block truncate text-light-gray ${
                                        disabled && "opacity-60"
                                    }`}
                                >
                                    {selected || placeholder}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDown
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </ListboxButton>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ListboxOptions className="absolute z-10 mt-3 max-h-44 w-full overflow-auto rounded-md bg-white dark:text-dark-text-gray dark:bg-dark-light py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs sm:text-sm">
                                    {options && options?.length > 0 ? (
                                        options?.map((person) => (
                                            <ListboxOption
                                                key={person.id}
                                                className={({
                                                    selected,
                                                    focus,
                                                }) =>
                                                    classNames(
                                                        selected &&
                                                            "bg-sky dark:text-white dark:bg-dark-bg",
                                                        focus &&
                                                            "bg-sky dark:text-white dark:bg-dark-bg",
                                                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                                                    )
                                                }
                                                value={person.name}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <div>
                                                            {/* {person.flag && (
                                                                <img
                                                                    src={
                                                                        person.flag
                                                                    }
                                                                />
                                                            )} */}
                                                            <span
                                                                className={classNames(
                                                                    selected
                                                                        ? "font-semibold dark:bg-dark-bg"
                                                                        : "font-normal",
                                                                    "block truncate"
                                                                )}
                                                            >
                                                                {person.name}
                                                            </span>
                                                        </div>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                                                                )}
                                                            >
                                                                <Check
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </ListboxOption>
                                        ))
                                    ) : (
                                        <p className="p-3">
                                            {emptyError ??
                                                "Sorry, No options right now"}
                                        </p>
                                    )}
                                </ListboxOptions>
                            </Transition>
                        </div>
                    </div>
                )}
            </Listbox>
            {meta?.error && meta.touched && (
                <div className="text-xs ml-2 capitalize tracking-wide text-pink-200">
                    <ErrorText text={meta?.error} />
                </div>
            )}
        </div>
    );
};

export default SelectMenu;
