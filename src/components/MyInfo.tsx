// import { Hourglass } from "ldrs/react"
import userimg from "../assets/user.png"
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function MyInfo() {

    const navigate = useNavigate()
    const [user, setUser] = useState<{ name: string; email: string } | null>(null)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get('https://stream-social-apis-production.up.railway.app/api/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => setUser(response.data.data))
                .catch((error) => console.error(error))
        }
    }

    const handleEdit = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Edit Profile',
            html:
                `<input id="swal-name" class="swal2-input w-full m-0 mb-6" placeholder="Name" value="${user?.name || ''}" />` +
                `<input id="swal-email" class="swal2-input w-full m-0 mb-6" placeholder="Email" value="${user?.email || ''}" />` +
                `<input id="swal-oldPass" type="password" class="swal2-input w-full m-0 mb-6" placeholder="Current Password" />` +
                `<input id="swal-newPass" type="password" class="swal2-input w-full m-0 mb-6" placeholder="New Password (optional)" />`,
            focusConfirm: false,
            confirmButtonText: 'Update',
            confirmButtonColor: '#006fd3',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E',
            preConfirm: () => {
                const nameVal = (document.getElementById('swal-name') as HTMLInputElement).value.trim()
                const emailVal = (document.getElementById('swal-email') as HTMLInputElement).value.trim()
                const oldPassVal = (document.getElementById('swal-oldPass') as HTMLInputElement).value
                const newPassVal = (document.getElementById('swal-newPass') as HTMLInputElement).value

                if ((nameVal !== user?.name || emailVal !== user?.email || newPassVal) && !oldPassVal) {
                    Swal.showValidationMessage('You must provide your current password to update your profile')
                    return false
                }

                return {
                    name: nameVal,
                    email: emailVal,
                    oldPassword: oldPassVal,
                    password: newPassVal,
                }
            },
        })

        if (formValues) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.put(
                    'https://stream-social-apis-production.up.railway.app/api/users/me',
                    formValues,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                Swal.fire({
                    title: 'Updated',
                    text: response.data.message || 'Profile updated successfully',
                    icon: 'success',
                    confirmButtonColor: '#006fd3',
                })
                fetchUser()
            } catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'An error occurred during update',
                    icon: 'error',
                    confirmButtonColor: '#006fd3',
                })
            }
        }
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Your account will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#006fd3',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E'
        })

        if (result.isConfirmed) {
            const token = localStorage.getItem('token')
            try {
                await axios.delete('https://stream-social-apis-production.up.railway.app/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                Swal.fire({
                    title: 'Deleted',
                    text: 'Your account has been deleted successfully',
                    icon: 'success',
                    confirmButtonColor: '#006fd3',
                })
                localStorage.removeItem('token')
                setUser(null)
                navigate("/home")
            } catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to delete account',
                    icon: 'error',
                    confirmButtonColor: '#006fd3',
                })
            }
        }
    }

    const handleDeleteMyPosts = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Your Posts will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#006fd3',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E'
        })

        if (result.isConfirmed) {
            const token = localStorage.getItem('token')
            try {
                await axios.delete('https://stream-social-apis-production.up.railway.app/api/posts/', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                Swal.fire({
                    title: 'Deleted',
                    text: 'Your Posts has been deleted successfully',
                    icon: 'success',
                    confirmButtonColor: '#006fd3',
                })
                fetchUser()
                navigate("/home")
            } 
            catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to delete all posts',
                    icon: 'error',
                    confirmButtonColor: '#006fd3',
                })
            }
        }
    }

    const handleٌReset = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Your All Posts, comments, and likes will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reset it!',
            confirmButtonColor: '#006fd3',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E'
        })

        if (result.isConfirmed) {
            const token = localStorage.getItem('token')
            try {
                await axios.put(
                    'https://stream-social-apis-production.up.railway.app/api/reset/',
                    {}, 
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                Swal.fire({
                    title: 'Reset',
                    text: 'Your Account has been reset successfully',
                    icon: 'success',
                    confirmButtonColor: '#006fd3',
                })
                fetchUser()
                navigate("/")
            } catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to reset your account',
                    icon: 'error',
                    confirmButtonColor: '#006fd3',
                })
            }
        }
    }

    return (
        <div className="w-1/5 max-768:w-full px-3 py-4 flex flex-col gap-4 ">
            <img className="w-full max-w-48 mx-auto" src={userimg} alt="user" />
            {user && (
                <>
                    <h2 className="mb-2 text-2xl text-center capitalize font-merienda font-extrabold text-myPrimary">{user.name}</h2>
                    <button onClick={handleEdit} className="text-white font-bold capitalize px-8 py-2 rounded-lg bg-myPrimary hover:opacity-80 transition-all duration-500 ease-in-out">edit</button>
                    <button onClick={handleٌReset} className="text-white font-bold capitalize px-8 py-2 rounded-lg bg-myPrimary hover:opacity-80 transition-all duration-500 ease-in-out">reset my account</button>
                    <button onClick={handleDelete} className="text-gray-800 font-bold capitalize px-8 py-2 rounded-lg bg-mySecondary hover:opacity-80 transition-all duration-500 ease-in-out">delete my account</button>
                    <button onClick={handleDeleteMyPosts} className="text-gray-800 font-bold capitalize px-8 py-2 rounded-lg bg-mySecondary hover:opacity-80 transition-all duration-500 ease-in-out">delete all my Posts</button>
                </>
            )
                // : (
                //     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                //         <Hourglass
                //             size="80"
                //             bgOpacity="0.4"
                //             speed="1.75"
                //             color="#006fd3"
                //         />
                //     </div>
                // )
            }
        </div>
    )
}
