import Swal from 'sweetalert2'
import axios from 'axios'

export default function AddPost() {

    const handleCreatePost = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add New Post',
            html:
                `<input id="swal-title" class="swal2-input w-full m-0 !mb-4" placeholder="Post Title" />` +
                `<textarea id="swal-content" class="swal2-textarea w-full m-0" placeholder="Post Content" rows="4"></textarea>`,
            focusConfirm: false,
            confirmButtonText: 'Create Post',
            confirmButtonColor: '#006fd3',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#F15D8E',
            preConfirm: () => {
                const title = (document.getElementById('swal-title') as HTMLInputElement).value.trim()
                const content = (document.getElementById('swal-content') as HTMLInputElement).value.trim()

                if (!title || !content) {
                    Swal.showValidationMessage('Both title and content are required.')
                    return false
                }

                return { title, content }
            },
        })

        if (formValues) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.post(
                    'https://stream-social-apis-production.up.railway.app/api/posts/',
                    formValues,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                Swal.fire({
                    title: 'Success',
                    text: response.data.message || 'Post created successfully!',
                    icon: 'success',
                    confirmButtonColor: '#006fd3',
                })

            }
            catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'An error occurred while creating the post',
                    icon: 'error',
                    confirmButtonColor: '#006fd3',
                })
            }
        }
    }

    return (
        <button
            onClick={handleCreatePost}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
            Add Post
        </button>
    )
}

