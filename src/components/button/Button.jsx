import './Button.css';

function Button({buttontext}) {
    return (
        <>
            <div>
           <button className="button-styling">{buttontext}</button>
            </div>
            </>
    );
}

export default Button;