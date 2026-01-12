import './InputField.css';

function InputField({type,className,placeholder}) {
    return (
        <>
            <input
                className={`input-field ${className}`}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
}

export default InputField;