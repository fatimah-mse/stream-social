import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.png' 
import house from '../assets/house.png'
import logout from '../assets/logout.png'
import Swal from 'sweetalert2'

export default function TopBanner() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to log out from your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log me out!',
            confirmButtonColor: '#006fd3',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E'
        })

        if (confirmResult.isConfirmed) {
            try {
                const response = await axios.post("https://stream-social-apis-production.up.railway.app/api/auth/logout")

                const successMessage = response.data?.message || "Logged out successfully."

                await Swal.fire({
                    title: 'Success!',
                    text: successMessage,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#006fd3',
                    cancelButtonColor: '#F15D8E'
                })

                localStorage.removeItem("token")

                navigate("/")
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Logout failed."

                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#006fd3',
                    cancelButtonColor: '#F15D8E'
                })
            }
        }
    }

    return (
        <section className={`fixed top-0 z-50 flex justify-between items-center bg-mybg w-full py-4 max-992:py-3 max-992:px-10 max-768:px-5 px-20`}>
            <div className="flex gap-1 sm:!gap-3 items-center">
                <img className='w-10 max-576:w-6' src={logo} alt="logo" />
                <h1 className={`text-myPrimary font-merienda text-2xl max-768:text-xl font-bold`}>Stream Media</h1>
            </div>
            <div className={`flex items-center gap-1 sm:!gap-3`}>
                <Link to={"/home"}><img className='w-12 max-576:w-8 rounded-full' src={house} alt="house" /></Link>
                <img
                    className='w-12 max-576:w-8 cursor-pointer'
                    src={logout}
                    alt="logout"
                    onClick={handleLogout}
                />
            </div>
        </section>
    )
}

