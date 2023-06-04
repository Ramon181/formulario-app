import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav className="nav_body">
            <Link to={"/"} className="tile_nav">
                <h2>Formulario App</h2>
            </Link>
            <ul className="links_nav">
                <li className="link_nav">
                    <Link to={"/"} href="#!">Formulario</Link>
                </li>
                <li className="link_nav">
                    <Link to={"/list"} href="#!">Lista</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav