import './Button.css';

function Button({text,type,className,children,onClick}) {
    return (
        <>
            <div>
                <button
                    className={`button-styling ${className}`}
                    type={type}
                    onClick={onClick}
                >{text}{children}</button>
            </div>
        </>
    );
}

export default Button;