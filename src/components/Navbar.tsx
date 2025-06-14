import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { NavData } from '../Data/NavData'

export default function Navbar() {

    function handleScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <nav className={`fixed top-0 z-50 flex justify-between items-center bg-mybg w-full py-4 max-992:py-3 max-992:px-10 max-768:px-5 px-20`}>
            <div className="flex gap-1 sm:!gap-3 items-center">
                <img className='w-10 max-576:w-6' src={logo} alt="logo" />
                <h1 className={`text-myPrimary font-merienda text-2xl max-768:text-xl font-bold`}>Stream Media</h1>
            </div>
            <div className={`flex items-center gap-1 sm:!gap-3`}>
                    {NavData.map((e, index) => {
                        return (
                                <NavLink key={index}
                                    onClick={handleScrollToTop}
                                    to={e.link}
                                >
                                    <img className='w-12 max-576:w-8' src={e.img} alt={e.alt} />
                                </NavLink>
                        )
                    })}
            </div>
        </nav>
    )
}