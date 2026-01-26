import './Button.css';

function Button({text,type,className,children}) {
    return (
        <>
            <div>
                <button
                    className={`button-styling ${className}`}
                    type={type}
                >{text}{children}</button>
            </div>
        </>
    );
}

export default Button;