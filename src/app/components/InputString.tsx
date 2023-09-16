interface Props {
    title: string;
    placeholder: string;
    name: string;
    type: string;
}

function InputString(prop: Props) {
    return (
        <div>
            <p className="text-secondary-200">{prop.title}</p>
            <input
                className="bg-primary-100 py-5 px-3 w-full text-xl text-secondary-100 outline-none rounded-md placeholder:text-secondary-200"
                type={prop.type}
                placeholder={prop.placeholder}
                name={prop.name}
            />
        </div>
    );
}

export default InputString;
