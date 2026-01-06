import './MenuBar.css';

function MenuBar({className, onClick}) {
    return (
        <div className={`menu-container ${className}`} onClick={onClick}>
            <div className="menu-icon"></div>
        </div>
    );
}

export default MenuBar;