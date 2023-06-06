import { useEffect } from "react";

const Header = ({ handleNewGame, wins }) => {
    //update title
    useEffect(() => {wins < 1 ? document.title = 'Memoy Game' : document.title = `${wins} wins`});

    return (
        <header className="header">
            <h4>{wins} wins</h4>
            <h3>Memory Game</h3>
            <button onClick={handleNewGame}>New Game</button>
        </header>
    )
};

export default Header;