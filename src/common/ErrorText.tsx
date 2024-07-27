interface PropErrorText {
    text?: string;
}

const ErrorText: React.FC<PropErrorText> = (props) => {
    const { text } = props;
    return <p className=" text-xs text-red-600">{text}</p>;
};

export default ErrorText;
