import './InputField.css';

function InputField({name,type,className,placeholder,value,onChange}) {
    return (
        <>
            <input
                name={name}
                className={`input-field ${className}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default InputField;