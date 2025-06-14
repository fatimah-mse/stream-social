import { Link } from 'react-router'
import img from '../assets/auth.jpg'
import logo from '../assets/logo.png'

interface Tauth {
    register: boolean,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function AuthComponent({register, handleSubmit} : Tauth) {
    return (
        <section className='flex max-992:flex-col max-992:h-screen max-992:items-center max-992:justify-center max-992:px-10 max-768:px-5 max-992:py-10 max-768:py-4 max-992:gap-y-5 relative'>
            <img className='w-1/2 h-screen object-cover max-992:w-full max-992:absolute -z-10 top-0 max-992:opacity-80' src={img} alt="auth-img" />
            <div data-aos="zoom-in" className='flex flex-col justify-center items-center w-1/2 h-screen max-992:w-full max-992:!h-max gap-y-5 px-5 py-3 max-992:py-6 max-992:bg-[#ffffffc9] max-992:rounded-xl'>
                <div className='flex justify-between items-center gap-x-5 mb-5 max-768:gap-x-2'>
                    <img className='w-16 max-768:w-10' src={logo} alt="logo" />
                    <h1 className='font-merienda text-myPrimary font-extrabold text-4xl uppercase max-768:text-xl'>Stream social</h1>
                </div>
                <h2 className='font-merienda text-myPrimary font-extrabold text-2xl uppercase max-768:text-lg'>
                    {register ? "Sign up" : "Sign in"}
                </h2>
                <p className='mb-5 text-gray-800 font-semibold max-768:text-sm max-768:text-center'>
                    {register ?
                        "Fill in the following fields to create an account"
                        :
                        "Enter your credentials to access your account"}
                </p>
                <form className='w-2/3 max-992:w-full flex flex-col gap-y-5' onSubmit={handleSubmit} method='post'>
                    {register && 
                        <input type="text" name="name" placeholder='Enter Your Name' className='w-full border-2 border-myPrimary rounded-lg px-4 py-2 outline-mySecondary' />
                    }
                    <input type="email" name="email" placeholder='Enter Your Email' className='w-full border-2 border-myPrimary rounded-lg px-4 py-2 outline-mySecondary' />
                    <input type="password" name="password" placeholder='Enter Your Password' className='w-full border-2 border-myPrimary rounded-lg px-4 py-2 outline-mySecondary' />
                    <input type="submit"  value={register ? "SIGN UP" : "LOGIN"} className='w-full py-3 px-4 bg-myPrimary text-white rounded-lg hover:opacity-70 transition duration-900 ease-in-out' />
                </form>
                <p className='mb-5 text-gray-800 font-semibold max-768:text-sm max-768:text-center'>{register ? "Do you have an account?" : "Don’t have an account?"} <Link to={register ? '/' : '/sign-up'} className='text-mySecondary font-extrabold'>{register ? 'Login' : 'Create one'}</Link></p>
            </div>
        </section>
    )
}
