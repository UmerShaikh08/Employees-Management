import React, { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../shadcn/components/ui/pagination";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "../shadcn/components/ui/dropdown-menu";
// import { Button } from "../shadcn/components/ui/button";
// import { ChevronDown } from "lucide-react";

interface IPROPS {
    page: number;
    limit: number;
    setPage: (props: any) => void;
    setLimit: (props: any) => void;
    totalCount: number;
}
const TablePagination: React.FC<IPROPS> = ({
    page,
    setPage,
    limit,
    setLimit,
    totalCount,
}) => {
    //   I have implemented logic to change limit but getting some issue in components so i commented it
    const pageLimits = [3, 5, 10, 20, 40, 80];
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        setTotalPages(Math.ceil(totalCount / limit));
    }, [totalCount]);
    console.log("pages ", Math.ceil(totalCount / limit));
    return (
        <div className="flex w-full flex-row justify-center sm:justify-between items-center">
            {totalPages > 0 ? (
                <div className="hidden sm:block sm:flex-1 font-normal text-xs sm:text-sm text-[#737791] dark:text-dark-text-gray">
                    Showing data {page * limit - limit + 1} to{" "}
                    {page * limit > totalCount ? totalCount : page * limit} of{" "}
                    {totalCount} entries
                </div>
            ) : (
                <div></div>
            )}
            <div className="flex flex-row gap-4">
                {/* limit  */}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger className="  hidden sm:block   ">
                        <Button
                            variant="ghost"
                            className="  border text-xs dark:text-gray-main bg-gray-50 dark:bg-black rounded-xl dark:border-2 dark:border-dark-light px-4 py-0 font-normal"
                        >
                            {limit} Record per page
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="space-y-2  dark:border-0  bg-white dark:bg-dark-extra-light max-h-52 overflow-auto"
                    >
                        {pageLimits?.map((ele, idx) => (
                            <DropdownMenuItem
                                className={`capitalize ${
                                    limit === ele
                                        ? "bg-blue-picton dark:bg-black "
                                        : ""
                                }  cursor-pointer transition-all font-normal  duration-200 hover:bg-blue-picton  dark:hover:bg-black  `}
                                onClick={() => {
                                    setLimit(ele);
                                    setPage(1);
                                }}
                            >
                                <div className="text-xs py-0.5 px-2 ">
                                    {" "}
                                    {ele} Record per page
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu> */}

                {/* page box */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    page >= 2 &&
                                    setPage((prev: number) => prev - 1)
                                }
                                className={` cursor-pointer ${
                                    page <= 1 && "text-gray-400"
                                }`}
                            />
                        </PaginationItem>
                        {page - 1 >= 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    className="cursor-pointer  "
                                    onClick={() => setPage(page - 1)}
                                >
                                    {page - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem className="rounded-xl ">
                            <PaginationLink
                                isActive
                                className="rounded-xl dark:bg-dark-bg-purple dark:border-0 h-7 w-7"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                        {page + 1 < totalPages && (
                            <PaginationItem>
                                <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() => setPage(page + 1)}
                                >
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    totalPages > page &&
                                    setPage((prev: number) => prev + 1)
                                }
                                className={` cursor-pointer ${
                                    page >= totalPages
                                        ? "text-gray-400"
                                        : "text-black dark:text-dark-text-white"
                                }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default TablePagination;
