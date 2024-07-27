import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ROUTES } from "../utils/routes";
import { APIHandler } from "../helpers/apiHandler";
// import { any } from "../components/Table/Table";

interface IEdit {
    id: string;
    data: any;
}
const useUpdateEmployee = (setCancel: (props: any) => void) => {
    const queryClient = useQueryClient();

    // Create a new employee
    const mutationCreate = useMutation({
        mutationFn: async (data: any) => {
            const { status, message } = await APIHandler(
                "POST",
                `${ROUTES.CREATE_EMPLOYEE}`,
                data
            );

            if (status) {
                return true;
            } else {
                const error = new Error(message || "Failed to create employee");
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employeesData"] });
            toast.success("employee Created Successfully");
            setCancel(false);
        },

        onError: (error) => {
            toast.error(error?.message || "Internal Server Error");
            console.log("onerror ", error);
        },
    });

    // Edit an existing employee
    const mutationEdit = useMutation({
        mutationFn: async ({ data, id }: IEdit) => {
            const { status, message } = await APIHandler(
                "PUT",
                `${ROUTES.UPDATE_EMPLOYEE}/${id}`,
                data
            );

            if (status) {
                return true;
                ``;
            } else {
                const error = new Error(message || "Failed to edit employee");
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employeesData"] });
            toast.success("Employee Edited Successfully");
            setCancel(false);
        },

        onError: (error) => {
            toast.error(error?.message || "Internal Server Error");
            console.log("onerror ", error);
        },
    });

    const createEmployee = async (data: any) => {
        try {
            await mutationCreate.mutateAsync(data as any);
        } catch (error) {
            console.error("Error Create employee:", error);
        }
    };
    const editEmployee = async (data: IEdit) => {
        try {
            await mutationEdit.mutateAsync(data as IEdit);
        } catch (error) {
            console.error("Error Edit employee:", error);
            return error;
        }
    };

    return {
        createEmployee,
        editEmployee,
        creatLoading: mutationCreate.isPending,
        createError: mutationCreate.error,
        editLoading: mutationEdit.isPending,
        editError: mutationEdit.isError,
    };
};

export default useUpdateEmployee;
