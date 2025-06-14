import user from '../assets/user.png'
import plus from '../assets/plus.png'

interface Tnav {
    img: string
    link: string
    alt: string
}

export const NavData : Array<Tnav> = [
    {
        img: plus,
        link: '/',
        alt: 'plus'
    },
    {
        img: user,
        link: '/about',
        alt: 'user'
    }
]