import Proptypes from 'prop-types';

// styles
import './style.scss';

const lightThemeIcon = "https://cdn.iconscout.com/icon/free/png-256/sun-bright-rays-sunny-weather-33960.png"
const darkThemeIcon = "https://pics.freeicons.io/uploads/icons/png/10940529141579174130-512.png";

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
                        <img height={30} width={30} src={lightThemeIcon} /> :
                        <img height={30} width={30} src={darkThemeIcon} />
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