import AuthComponent from "../components/AuthComponent";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function SignUp() {

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const response = await axios.post("https://stream-social-apis-production.up.railway.app/api/auth/signup", {
                name,
                email,
                password,
            })

            const { token } = response.data.data

            localStorage.setItem("token", token)
            localStorage.setItem("userId", response.data.data.user.id)

            await Swal.fire({
                title: 'Account Created!',
                text: 'Your account has been created successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#006fd3'
            })

            navigate("/home")
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Signup failed"
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#006fd3'
            })
        }
    }

    return <AuthComponent register={true} handleSubmit={handleSubmit} />
}
