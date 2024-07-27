import { IInputFieldsData, IOption } from "../../interface/interface";
import FormGenerator from "../../common/FormGenerator";
import useUpdateEmployee from "../../hooks/useUpdateEmploye";
import useGetEmployeeById from "../../hooks/useGetEmployeeById";
import Loader from "../../common/Loader";
import useGetAllCountries from "../../hooks/useGetAllCountries";
import { useEffect, useState } from "react";

interface IPROPS {
    setCancel: (props: any) => void;
    id?: string;
}

// if id getting in props means this component in rendering for editing otherwise for creation
const AddEmploye: React.FC<IPROPS> = ({ setCancel, id }) => {
    const { data, isLoading } = useGetEmployeeById({ id: id ?? "-1" });
    const { data: Countries } = useGetAllCountries();

    // create update api  call from here
    const { createEmployee, editEmployee, creatLoading, editLoading } =
        useUpdateEmployee(setCancel);

    // country dropdown options
    const [options, setOptions] = useState<IOption[]>([]);

    // setting up country dropdown options to match Selectmenu components props
    // select menu taking options in the form of IOptions[] interface
    useEffect(() => {
        let initialState: IOption[] = [];
        Countries?.forEach((country) => {
            initialState.push({
                value: country.country,
                name: country.country,
                id: country.id,
                flag: country.flag,
            });
        });
        // sorting in ascending order
        initialState.sort((a, b) => a.value.localeCompare(b.value));
        setOptions(initialState);
    }, [Countries]);

    // json for form input fields
    // backend  was not accepting data in the form of FormData datatype
    const JSON_FORM: IInputFieldsData[] = [
        // {
        //     name: "avatar",
        //     input_type: "image",
        //     type: "input_box",
        //     error: "Pleas Select Image",
        //     label: "Profile Image",
        //     placeholder: "",
        //     required: true,
        //     value: data?.avatar ?? "",
        // },
        {
            name: "name",
            input_type: "text",
            type: "input_box",
            error: "Please enter a name",
            label: "Name",
            placeholder: "Enter a name",
            required: true,
            value: data?.name ?? "",
        },

        {
            name: "emailId",
            input_type: "email",
            type: "input_box",
            error: "Please enter a emailId",
            label: "emailId",
            placeholder: "Enter a emailId",
            required: true,
            value: data?.emailId ?? "",
        },
        {
            name: "mobile",
            input_type: "phoneNumber",
            type: "input_box",
            error: "Please enter a mobile",
            label: "mobile number",
            placeholder: "Enter a mobile",
            required: true,
            value: data?.mobile ?? "",
        },
        {
            name: "country",
            input_type: "select",
            type: "input_box",
            error: "Please enter a country",
            label: "Country",
            placeholder: "Enter a country",
            required: true,
            value: data?.country ?? "",
            options: options,
        },
        {
            name: "state",
            input_type: "text",
            type: "input_box",
            error: "Please enter a state",
            label: "state",
            placeholder: "Enter a state",
            required: true,
            value: data?.state ?? "",
        },
        {
            name: "district",
            input_type: "text",
            type: "input_box",
            error: "Please enter a district",
            label: "district",
            placeholder: "Enter a district",
            required: true,
            value: data?.district ?? "",
        },
    ];
    const handleSubmit = (values: any) => {
        // converting file to formdata for avatar image but backend not accepting formData  so i have commented code
        const formData = new FormData();
        for (const key in values) {
            if (key === "avatar") {
                if (typeof values[key] !== "string") {
                    formData.append(key, values[key]);
                }
            } else {
                formData.append(key, values[key]);
            }
        }
        if (id) {
            formData.append("id", id);
            editEmployee({ data: values, id: id });
        } else {
            createEmployee(values);
        }
    };
    return (
        <div className=" sm:min-w-[600px]">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-5 space-y-6">
                    <h1 className="text-lg  sm:mx-auto sm:w-full sm:max-w-xl font-medium">
                        {id ? "Edit Employee" : "Add Employee"}
                    </h1>
                    <FormGenerator
                        data={JSON_FORM}
                        loading={id ? editLoading : creatLoading}
                        submitData={handleSubmit}
                        handleCancel={() => setCancel(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default AddEmploye;
