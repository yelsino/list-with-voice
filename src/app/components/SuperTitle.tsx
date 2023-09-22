interface Props {
    children: React.ReactNode;
    title: React.ReactNode;
}

export const SuperTitle = ({ title, children }: Props) => {
    return (
        <div className="font-catamaran">
            <p className="text-4xl capitalize text-secondary-100 font-black   leading-tight  ">
                {title}
            </p>
            {children}
        </div>
    );
};
