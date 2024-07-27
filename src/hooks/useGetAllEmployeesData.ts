import { useQuery } from "@tanstack/react-query";

import { IEmploye } from "../components/Table/Table";
import { ROUTES } from "../utils/routes";
import { APIHandler } from "../helpers/apiHandler";

const useGetAllEmployeesData = () => {
    console.log;

    let url = ROUTES.GET_ALL_EMPLOYEES;

    const fetchData = async () => {
        const response = await APIHandler("GET", `${url}`);

        if (response?.data) {
            return response.data;
        } else {
            return [];
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery<IEmploye[]>({
        queryKey: ["employeesData"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, error, refetch };
};

export default useGetAllEmployeesData;
