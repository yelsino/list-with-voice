
interface Props {
    children: React.ReactNode;
}

export const SuperTitle = ({ children }:Props) => {
    return (
        <div className="text-5xl font-black  font-catamaran  leading-tight text-secondary-100  ">
           {children}
        </div>
    );
};

