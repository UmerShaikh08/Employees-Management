import axios, { AxiosResponse } from "axios";

export interface IAPIPromise {
    status: boolean;
    data?: any;
    message?: string;
    error?: string;
    type?: string;
    statusCode?: number;
}

export interface IResponse {
    response: IAPIPromise;
}

export interface CustomAxiosResponse extends AxiosResponse {
    response?: IAPIPromise; // Adjust the type according to the actual type of `response` if needed
}
export const ActionHandler = async (
    action: string,
    url: string,
    data: any,
    headers = {}
): Promise<CustomAxiosResponse> => {
    switch (action) {
        case "GET":
            return await axios.get(url, {
                headers,
            });

        case "POST":
            return await axios.post(url, data, {
                headers,
            });

        case "PUT":
            return await axios.put(url, data, {
                headers,
            });

        // added data filed to delete course by id data : {id : _id}
        case "DELETE":
            return await axios.delete(url, { data, headers });

        default:
            throw new Error(`Invalid action: ${action}`);
    }
};

export const APIHandler = async (
    action: string,
    url: string,
    data = {},
    headers = {}
): Promise<IAPIPromise> => {
    try {
        const response = await ActionHandler(action, url, data, headers);

        if (response.status >= 200 && response.status <= 299) {
            return {
                status: true,
                data: response.data,
                message: response.data.message,
                statusCode: response.status,
            };
        }

        return {
            status: false,
            error: "API Failed",
            message: "API Failed",
            statusCode: response.status,
        };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e);
            if (e.message === "Network Error") {
                return {
                    status: false,
                    error: "Network Error",
                    message: "Network Error",
                };
            }
            return {
                status: false,
                type: e.response?.data?.type,
                message: e.response?.data.message,
                error: e.response?.data.error,
            };
        }
        return {
            status: false,
            error: "API Failed",
            message: "API Failed",
        };
    }
};
