export interface IOption {
    id?: number;
    name: string;
    value: any;
    flag?: string;
}

export interface IInputFieldsData {
    type: string;
    name: string;
    label: string;
    input_type: string;
    placeholder: string;
    required: boolean;
    error: string;
    value?: string;
    options?: IOption[];
    gridValue?: string;
    parent?: string;
    parentValue?: string;
    submitButtonStyle?: string;
}

export interface IInputValidationData {
    type: string;
    name: string;
    isRequired: boolean;
    label: string;
}

export interface ICountry {
    country: string;
    flag: string;
    id: number;
    createdAt: string;
}
