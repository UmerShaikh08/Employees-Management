import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { APIHandler } from "../helpers/apiHandler";
import { useState } from "react";

interface IProps {
    id: string;
    close: (value: boolean) => void;
    refetch: (value: any) => void;
    dataToRefetch: string | string[];
    apiUrl: string;
    type: string;
}

const DeleteModal = (props: IProps) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const { close, dataToRefetch, apiUrl, id, type, refetch } = props;

    // delete employee function
    const handleDelete = async () => {
        setLoading(true);
        const { status, message } = await APIHandler(
            "DELETE",
            `${apiUrl}/${id}`,
            {},
            {}
        );
        setLoading(false);
        if (!status) {
            toast.error("Internal Server Error" ?? message);
        } else {
            toast.success(`${type} Deleted Successfully` ?? message);
            queryClient.invalidateQueries({
                queryKey: [...dataToRefetch],
            });
            refetch(dataToRefetch);
            close(false);
        }
    };

    return (
        <div className=" flex flex-col   items-center gap-5 max-w-xs">
            <TrashIcon className="w-16 h-16 bg-slate-100 text-main-red p-3 rounded-full" />
            <h1 className="capitalize text-dark-gray text-xl font-semibold max-w-lg text-center">
                are you sure you want to delete this {type} ?
            </h1>
            <div className="flex gap-10">
                <Button
                    text="Cancel"
                    className="bg-white"
                    textColor="text-black"
                    bgColor="bg-white"
                    disabled={loading}
                    handleFunction={() => close(false)}
                />
                <Button
                    text="Delete"
                    disabled={loading}
                    loading={loading}
                    handleFunction={handleDelete}
                />
            </div>
        </div>
    );
};

export default DeleteModal;
