import './Button.css';

function Button({text,type,className,children,onClick,disabled}) {
    return (
        <>
            <div>
                <button
                    className={`button-styling ${className}`}
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                >{text}{children}</button>
            </div>
        </>
    );
}

export default Button;