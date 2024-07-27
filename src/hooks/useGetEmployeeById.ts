import { useQuery } from "@tanstack/react-query";

import { IEmploye } from "../components/Table/Table";
import { ROUTES } from "../utils/routes";
import { APIHandler } from "../helpers/apiHandler";

interface IPROPS {
    id: string;
}
const useGetEmployeeById = ({ id }: IPROPS) => {
    let url = ROUTES.GET_ALL_EMPLOYEES;

    const fetchData = async () => {
        const response = await APIHandler("GET", `${url}/${id}`);

        if (response?.data) {
            return response.data;
        } else {
            return {};
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery<IEmploye>({
        queryKey: ["employee", id],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, error, refetch };
};

export default useGetEmployeeById;
