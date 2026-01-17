import './InputField.css';

function InputField({name,type,className,placeholder}) {
    return (
        <>
            <input
                name={name}
                className={`input-field ${className}`}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
}

export default InputField;