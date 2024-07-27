import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "../utils/routes";
import { APIHandler } from "../helpers/apiHandler";
import { ICountry } from "../interface/interface";

// using tanstak query for storing caches
const useGetAllCountries = () => {
    let url = ROUTES.GET_ALL_COUNTRIES;

    const fetchData = async () => {
        const response = await APIHandler("GET", `${url}`);

        if (response?.data) {
            return response.data;
        } else {
            return [];
        }
    };

    const { data, isLoading, isError, error, refetch } = useQuery<
        ICountry[] | []
    >({
        queryKey: ["countries"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, error, refetch };
};

export default useGetAllCountries;
