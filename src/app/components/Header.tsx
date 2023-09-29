
interface Props {
    childrenLeft: JSX.Element;
    childrenRight: JSX.Element;
}

export const Header = ({ childrenLeft, childrenRight }: Props) => {
    return (
        <div className="flex justify-between items-center ">
            <span className="text-4xl font-bold font-poppins text-text1 tracking-wider text-secondary-100">
                {childrenLeft}
            </span>
            <div
                className="bg-primary-100 h-14 w-14 relative rounded-2xl flex justify-center items-center text-secondary-100"
            >
                {childrenRight}
            </div>
        </div>
    );
};
