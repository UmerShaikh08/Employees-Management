import { Column } from "@tanstack/react-table";
import { IEmploye } from "../components/Table/Table";

export const formatText = (text: string | undefined) => {
    if (text === undefined) return "";
    let title = text?.split("_").join(" ")?.split("-").join(" ").toLowerCase();
    return title;
};

export const getCommonPinningStyles = (
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
        left: isPinned === "left" ? `${column.getStart("left")}px ` : undefined,
        right:
            isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: isPinned ? 0.95 : 1,
        position: isPinned ? "sticky" : "relative",
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
        backgroundColor: bgColor,
    };
};
