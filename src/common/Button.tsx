import Spinner from "./Spinner";

interface PropButton extends HTMLButtonElement {
    iconStyle?: string;
    text: string;
    handleFunction(): any;
    width?: string;
    bgColor?: string;
    textColor?: string;
    padding?: string;
    Icon?: React.ElementType;
    loading?: boolean;
    refElement?: any;
    fontWeight?: string;
}

const Button: React.FC<Partial<PropButton>> = (props) => {
    const {
        handleFunction,
        iconStyle,
        text,
        className,
        width,
        bgColor,
        textColor,
        Icon,
        padding,
        loading,
        disabled,
        refElement,
        fontWeight,
        type,
    } = props;
    return (
        <button
            type={`${type ? type : "button"}`}
            className={`${className} shadow flex transition-all duration-200 hover:scale-95  items-center gap-4 justify-center rounded-lg ${
                bgColor ? bgColor : `bg-blue-600`
            } sm:p-3 text-xs sm:text-sm ${fontWeight ?? "font-semibold"} ${
                textColor ? textColor : "text-white"
            } ${width ? width : ""} ${
                padding ? padding : "px-2 py-2 sm:px-3.5 sm:py-2.5"
            } shadow-sm border hover:${
                bgColor ? bgColor : `bg-blue-600`
            } hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-40`}
            onClick={handleFunction}
            disabled={loading || disabled}
            ref={refElement}
        >
            {Icon && (
                <Icon
                    className={`text-sm ${
                        textColor ? textColor : "text-white"
                    } ${iconStyle ? iconStyle : "w-5 h-5"} `}
                />
            )}
            {loading && <Spinner />}
            {text}
        </button>
    );
};

export default Button;
