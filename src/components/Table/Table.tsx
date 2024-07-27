"use client";

import * as React from "react";
import Button from "../../common/Button";
import AddEmploye from "../AddEmployees/AddEmploye";
import DeleteModal from "../../common/DeleteModal";
import TableLoader from "./TableLoader";
import OverlayFragment from "../../common/OverlayFragment";
import TablePagination from "./TablePagination";
import ProfileDefaultImg from "../../common/ProfileDefaultImg";
import { FaCog } from "react-icons/fa";
import { ROUTES } from "../../utils/routes";
import { PlusCircle } from "lucide-react";
import { IoTrashOutline } from "react-icons/io5";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../shadcn/components/ui/table";

export interface IEmploye {
    name: string;
    avatar: string;
    emailId: string;
    mobile: string;
    country: string;
    state: string;
    district: string;
    id: string;
}

export interface IFilters {
    [key: string]: string[];
}

interface IPROPS {
    data: IEmploye[];
    isLoading: boolean;
    searchText: string;
    setSearchText: (param: string) => void;
    totalPages: number;
    page: number;
    limit: number;
    totalCount: number;
    setLimit: (props: any) => void;
    setPage: (props: any) => void;
    refetch: (props: any) => void;
}

export function EmployeesTable({
    data,
    isLoading,
    totalCount,
    setSearchText,
    page,
    setPage,
    limit,
    setLimit,
    refetch,
}: IPROPS) {
    // const [showGrid, setShowGrid] = React.useState<string | null>(
    //     localStorage.getItem("showGrid") == "false" ? "true" : "true"
    // );

    const showGrid = "true";
    const [search, setSearch] = React.useState<string>("");
    const [addEmploye, setAddEmploye] = React.useState<boolean>(false);
    const [editEmployee, setEditEmployee] = React.useState<boolean>(false);
    const [deleteEmployee, setDeleteEmployee] = React.useState<boolean>(false);
    const [editEmployeeId, setEditEmployeeId] = React.useState<string>("");
    const [deleteEmployeeId, setDeleteEmployeeId] = React.useState<string>("");

    // Implemented debouncing to minimize  state updation on searh query
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // contains all table columns structure
    const columns: ColumnDef<IEmploye>[] = [
        {
            accessorKey: "Id",
            header: () => (
                <div className=" capitalize    w-fit pl-1 text-start  font-bold  py-0">
                    Id
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.id}</div>,
        },
        {
            accessorKey: "name",
            header: ({}) => <div> Name</div>,
            cell: ({ row }) => {
                return (
                    <>
                        <div className="group capitalize  line-clamp-1 flex gap-2 items-center pl-2 text-wrap  min-w-[210px] max-w-[210px] w-full">
                            {row?.original?.avatar ? (
                                <img
                                    src={row?.original?.avatar}
                                    alt=""
                                    className="w-10 h-10 min-w-10 max-w-10 min-h-10 max-h-10 rounded-full object-cover"
                                />
                            ) : (
                                <ProfileDefaultImg
                                    firstName={row?.original?.name as any}
                                    width="w-7 min-w-7"
                                    height="h-7 min-h-7"
                                />
                            )}

                            <span className="line-clamp-1 w-full">{`${row.original?.name}`}</span>
                        </div>
                    </>
                );
            },
        },
        {
            accessorKey: "Email",
            header: () => (
                <div className=" capitalize w-full min-w-[80px]  pl-1 text-start  font-bold  py-0">
                    Email
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.emailId}</div>,
        },
        {
            accessorKey: "mobile",
            header: () => (
                <div className=" capitalize  min-w-[140px] w-full  pl-1 text-start  font-bold  py-0">
                    Phone Number
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.mobile}</div>,
        },
        {
            accessorKey: "country",
            header: () => (
                <div className=" capitalize w-full min-w-[80px]  pl-1 text-start  font-bold  py-0">
                    Country
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.country}</div>,
        },
        {
            accessorKey: "state",
            header: () => (
                <div className=" capitalize w-full min-w-[80px]  pl-1 text-start  font-bold  py-0">
                    State
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.state}</div>,
        },
        {
            accessorKey: "district",
            header: () => (
                <div className=" capitalize w-full min-w-[80px]  pl-1 text-start  font-bold  py-0">
                    District
                </div>
            ),
            cell: ({ row }) => <div>{row.original?.district}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex gap-4 justify-start items-center">
                        <button
                            onClick={() => {
                                setEditEmployeeId(row.original?.id);
                                setEditEmployee(true);
                            }}
                            className="disabled:opacity-40"
                        >
                            <FaCog className="w-6 h-6 text-[#48ADF7]" />
                        </button>

                        <button
                            className="disabled:opacity-40"
                            onClick={() => {
                                setDeleteEmployeeId(row.original?.id);
                                setDeleteEmployee(true);
                            }}
                        >
                            <IoTrashOutline className="h-6 w-6 text-[#F7594D]" />
                        </button>
                    </div>
                );
            },
        },
    ];

    // tanstack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",

        state: {
            // Sticky columns logic is commented
            // columnPinning: { left: ["Id", "name"] },
            // rowPinning: { top: ["Id", "name"] },
        },
    });

    // Sticky columns logic
    const getCommonPinningStyles = (
        column: Column<IEmploye>,
        bgColor: string
    ): React.CSSProperties => {
        const isPinned = column.getIsPinned();
        const isLastLeftPinnedColumn =
            isPinned === "left" && column.getIsLastColumn("left");
        const isFirstRightPinnedColumn =
            isPinned === "right" && column.getIsFirstColumn("right");

        return {
            boxShadow: isLastLeftPinnedColumn
                ? ""
                : isFirstRightPinnedColumn
                ? ""
                : undefined,
            left:
                isPinned === "left"
                    ? `${column.getStart("left")}px `
                    : undefined,
            right:
                isPinned === "right"
                    ? `${column.getAfter("right")}px`
                    : undefined,
            opacity: isPinned ? 0.95 : 1,
            position: isPinned ? "sticky" : "relative",
            width: column.getSize(),
            zIndex: isPinned ? 1 : 0,
            backgroundColor: bgColor,
        };
    };

    return (
        <>
            <div className="bg-white    mx-auto   -x rounded-2xl px-5 sm:px-0  mt-3">
                <div className="w-[98%]  mx-auto  space-y-2 ">
                    <div className="flex flex-row items-center sm:py-4 justify-between">
                        <div className=" flex items-center flex-row justify-end  w-full sm:gap-4 gap-1">
                            <div className="flex flex-1 justify-end items-center px-2 gap ">
                                <div className="w-full max-w-lg lg:max-w-xs  rounded-sm ">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="block  h-8 sm:h-10   sm:w-[320px]   text-black   rounded-md   py-1 pl-10 pr-3 border-2 border-gray-light  placeholder:text-gray-400  outline-none text-sm sm:text-sm sm:leading-6"
                                            placeholder="Search by Id. . . "
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                Icon={PlusCircle}
                                text="Add Employee"
                                textColor=""
                                className="hidden sm:flex"
                                handleFunction={() => setAddEmploye(true)}
                            />
                            <Button
                                Icon={PlusCircle}
                                text=""
                                textColor=""
                                className=" sm:hidden"
                                handleFunction={() => setAddEmploye(true)}
                            />
                        </div>
                    </div>

                    <div
                        className={`rounded-2xl min-h-[75vh]  max-h-[75vh] overflow-auto   border  relative`}
                    >
                        <Table className=" min-h-full  ">
                            <TableHeader className="  sticky top-0  bg-[#EEEEEE]   rounded-2xl  h-fit overflow-hidden ">
                                {table
                                    ?.getHeaderGroups()
                                    ?.map((headerGroup) => (
                                        <TableRow
                                            key={headerGroup.id}
                                            className=" "
                                        >
                                            {headerGroup?.headers?.map(
                                                (header) => {
                                                    return (
                                                        <TableHead
                                                            style={{
                                                                ...getCommonPinningStyles(
                                                                    header.column,
                                                                    "#EEEEEE"
                                                                ),
                                                            }}
                                                            className="text-black   font-bold    border-r border-r-gray-300   h-fit  py-2 sm:py-2"
                                                            key={header.id}
                                                        >
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header
                                                                          .column
                                                                          .columnDef
                                                                          .header,
                                                                      header.getContext()
                                                                  )}
                                                        </TableHead>
                                                    );
                                                }
                                            )}
                                        </TableRow>
                                    ))}
                            </TableHeader>
                            <TableBody className=" text-gray-5 min-h-full h-full  text-sm ">
                                {!isLoading ? (
                                    <>
                                        {table?.getRowModel()?.rows?.length ? (
                                            table
                                                .getRowModel()
                                                .rows.map((row) => (
                                                    <TableRow
                                                        className="py-2  hover:bg-gray-100   border-0"
                                                        key={row.id}
                                                        data-state={
                                                            row.getIsSelected() &&
                                                            "selected"
                                                        }
                                                    >
                                                        {row
                                                            .getVisibleCells()
                                                            .map((cell) => (
                                                                <TableCell
                                                                    className={`${
                                                                        showGrid ==
                                                                        "true"
                                                                            ? "py-2 border-r-1 border-r-slate-950 border-b  "
                                                                            : "py-2"
                                                                    }    max-w-[270px] `}
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                    style={{
                                                                        ...getCommonPinningStyles(
                                                                            cell.column,
                                                                            "#ffffff"
                                                                        ),
                                                                    }}
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </TableCell>
                                                            ))}
                                                    </TableRow>
                                                ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns?.length}
                                                    className="h-24 text-center"
                                                >
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            className="h-80 text-center "
                                        >
                                            <TableLoader />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex w-full space-x-2 py-6 sm:py-4">
                        <TablePagination
                            page={page}
                            limit={limit}
                            setPage={setPage}
                            setLimit={setLimit}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </div>
            <OverlayFragment
                isOpen={addEmploye}
                setIsOpen={setAddEmploye}
                children={<AddEmploye setCancel={setAddEmploye} />}
            />
            <OverlayFragment
                isOpen={editEmployee}
                setIsOpen={setEditEmployee}
                children={
                    <AddEmploye
                        setCancel={setEditEmployee}
                        id={editEmployeeId}
                    />
                }
            />

            <OverlayFragment
                isOpen={deleteEmployee}
                setIsOpen={setDeleteEmployee}
                isAlert={false}
                children={
                    <DeleteModal
                        apiUrl={ROUTES.DELETE_EMPLOYEE}
                        id={deleteEmployeeId}
                        close={setDeleteEmployee}
                        type="Employee"
                        dataToRefetch="employeesData"
                        refetch={refetch}
                    />
                }
            />
        </>
    );
}
