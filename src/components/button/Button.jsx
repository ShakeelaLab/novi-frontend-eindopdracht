import './Button.css';

function Button({text,type,className}) {
    return (
        <>
            <div>
                <button
                    className={`button-styling ${className}`}
                    type={type}
                >{text}</button>
            </div>
        </>
    );
}

export default Button;