import './navBar.css'
import { Link } from 'react-router-dom'

function NavBar(){
    return(
        <>
            <header className="navBar">
                <img src="./batman.png" alt="" />
        

            </header>
            
            <section className='subMenu'>
                <nav className="menuNav">
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/'>SENSORES</Link></li>
                        <li><Link to='/'>AMBIENTES</Link></li>
                        <li><Link to='/'>HISTÓRICO</Link></li>
                        <li><Link to='/'>SOBRE NÓS</Link></li>
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default NavBar