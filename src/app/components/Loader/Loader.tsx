import "./Loader.css";

interface Props {
    texto?: string;
}

export const Loader = ({texto}:Props) => (
    <div className="fixed w-full h-full flex justify-center items-center  bg-primary-200 z-50 left-0 top-0 flex-col">
        <span className="loader"></span>
        <p className="text-secondary-100 translate-y-8">{texto}</p>
    </div>
);
