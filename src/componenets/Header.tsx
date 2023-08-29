import {OWNER, REPO} from '../constants/repoInfo';

const Header = () => {
    return (
        <header>
            <span>{OWNER}</span>/<span>{REPO}</span>
        </header>
    );
};

export default Header;
