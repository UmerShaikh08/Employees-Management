import { useEffect, useState } from "react";
import { EmployeesTable, IEmploye } from "../components/Table/Table";
import useGetAllEmployeesData from "../hooks/useGetAllEmployeesData";
import Loader from "../common/Loader";

const EmployeeManagement = () => {
    const [searchText, setSearchText] = useState<string>("");

    // fetching all employees data from api
    const { data: AllEmployees, isLoading, refetch } = useGetAllEmployeesData();

    const [data, setData] = useState<IEmploye[]>(AllEmployees ?? []);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(9);
    const [totalCount, setTotalCount] = useState<number>(1);

    // search by id filter logic
    useEffect(() => {
        if (searchText) {
            const filteredData = AllEmployees?.filter((employee) =>
                employee.id
                    .toLowerCase()
                    .includes(searchText.toLowerCase().trim())
            );
            setData(
                filteredData?.slice((page - 1) * limit, page * limit) ?? []
            );

            setTotalCount(filteredData?.length ?? 0);
        } else {
            if (AllEmployees) {
                setData(AllEmployees?.slice((page - 1) * limit, page * limit));
                setTotalCount(AllEmployees?.length ?? 0);
            }
        }
    }, [searchText, AllEmployees, limit, page]);

    return (
        <div className=" ">
            {isLoading ? (
                <Loader />
            ) : (
                <EmployeesTable
                    data={data as IEmploye[]}
                    isLoading={isLoading}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    totalPages={1 as number}
                    totalCount={totalCount as number}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default EmployeeManagement;
