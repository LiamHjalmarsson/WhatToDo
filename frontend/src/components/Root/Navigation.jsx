import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

const MainNavigation = () => {
    return (
        <>
            <header>
                <nav>
                    <ul className={styles.ul}>
                        <li>
                            <NavLink to="/" className={styles.link}> 
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todos" className={styles.link}>
                                Todos
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default MainNavigation;