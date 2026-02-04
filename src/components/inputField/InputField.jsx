import './InputField.css';

function InputField({name,type,className,placeholder,value,onChange,icon, ...rest}) {
    return (
        <>
            <input
                name={name}
                className={`input-field ${className}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </>
    );
}

export default InputField;