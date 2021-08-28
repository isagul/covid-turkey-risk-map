import Proptypes from 'prop-types';
import darkTheme from 'images/darkTheme.png';
import lightTheme from 'images/lightTheme.webp';

// styles
import './style.scss';

const Header = ({ theme, dateRange, onThemeChange }) => {
    return (
        <header>
            <h2 className="app-title">
                Türkiye Vaka Risk Haritası
                {dateRange.length > 0 && <span> ({dateRange.split("-").join(" - ")})</span>}
            </h2>
            <div className="icon" onClick={onThemeChange}>
                {
                    theme === "light" ?
                        <img height={25} width={25} src={lightTheme} /> :
                        <img height={25} width={25} src={darkTheme} />
                }
            </div>

        </header>
    )
}

Header.propTypes = {
    theme: Proptypes.string,
    dateRange: Proptypes.string,
    onThemeChange: Proptypes.func
}

Header.defaultProps = {
    theme: "light",
    dateRange: ""
}

export default Header;