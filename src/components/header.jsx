import logo from '../assets/v-logo-vit.png'
import './header.css'

function Header() {
    return (
        <div id='container'>
            <img src={logo} ></img>
            <h1>Vajans lilla röda</h1>
        </div>
    )
}

export default Header