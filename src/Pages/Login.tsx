import axios from "axios"
import AuthComponent from "../components/AuthComponent"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const response = await axios.post("https://stream-social-apis-production.up.railway.app/api/auth/login", {
                email,
                password,
            })

            const { token } = response.data.data

            localStorage.setItem("token", token)
            localStorage.setItem("userId", response.data.data.user.id)

            await Swal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#006fd3',
                cancelButtonColor: '#F15D8E'
            })

            navigate("/home")
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Login failed"
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

    return <AuthComponent register={false} handleSubmit={handleSubmit} />
}
