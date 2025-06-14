import Swal from "sweetalert2"
import AddPost from "./AddPost"
import axios from "axios"
import { useEffect, useState } from "react"
import userImg from "../assets/user.png"
import reactUNactive from "../assets/reaction-dark.png"
import reactActive from "../assets/reaction-red.png"
import deleteicon from "../assets/delete.png"

interface Post {
    _id: string
    title: string
    content: string
    authorId: {
        _id: string
        name: string
    }
    comments: string[]
    likes: string[]
    createdAt: string
}

export default function MyPosts() {
    const [postLikes, setPostLikes] = useState<{ [postId: string]: boolean }>({})
    const [posts, setPosts] = useState<Post[]>([])
    const [userId, setUserId] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const t = localStorage.getItem("token")
        const uId = localStorage.getItem("userId")

        if (t && uId) {
            setToken(t)
            setUserId(uId)
        }
    }, [])

    useEffect(() => {
        if (token && userId) {
            fetchPosts()
        }
    }, [token, userId])

    const handleLike = async (postId: string) => {
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "You must be logged in",
            })
            return
        }

        try {
            if (postLikes[postId]) {
                await axios.delete(
                    `https://stream-social-apis-production.up.railway.app/api/likes/${postId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setPostLikes((prev) => ({ ...prev, [postId]: false }))
                Swal.fire({
                    icon: "info",
                    title: "Like removed",
                    timer: 1200,
                    showConfirmButton: false,
                })
            } else {
                // المستخدم ما عامل لايك => نضيف لايك
                const response = await axios.post(
                    `https://stream-social-apis-production.up.railway.app/api/likes/${postId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                // تأكد من نجاح العملية ومن اليوزر
                const userIdFromResponse = response.data?.data?.userId
                if (userIdFromResponse === userId) {
                    setPostLikes((prev) => ({ ...prev, [postId]: true }))
                    Swal.fire({
                        icon: "success",
                        title: "Liked!",
                        timer: 1200,
                        showConfirmButton: false,
                    })
                }
            }
            fetchPosts()
        } catch (error: any) {
            console.error(error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to update like",
            })
        }
    }

    const fetchPosts = async () => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")

        if (!token || !userId) return

        try {
            const res = await axios.get(
                "https://stream-social-apis-production.up.railway.app/api/posts/")

            const allPosts = res.data.data.data
            const myPosts = allPosts.filter((post: Post) => post.authorId._id === userId)

            setPosts(myPosts)

            const likesState = myPosts.reduce((acc: any, post: any) => {
                acc[post._id] = post.likes.includes(userId)
                return acc
            }, {})
            setPostLikes(likesState)

        } catch (err) {
            console.error("Error fetching my posts:", err)
            Swal.fire("Error", "Failed to fetch your posts", "error")
        }
    }


    const handleShowComments = async (post: any) => {
        try {
            const loggedInUserId = localStorage.getItem("userId")

            const response = await axios.get(
                `https://stream-social-apis-production.up.railway.app/api/comments/${post._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const comments = response.data.data

            if (comments.length === 0) {
                await Swal.fire({
                    title: "No Comments",
                    text: "There are no comments for this post yet.",
                    icon: "info",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#006fd3",
                })
                return
            }

            const formattedComments = comments
                .map((comment: any) => {
                    const isCommentOwner = comment.authorId._id === loggedInUserId

                    return `
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <img class="w-10 rounded-full" src="${userImg}" alt="user" />
                            <span class="!ms-2 !text-myPrimary font-merienda capitalize font-semibold">
                                ${comment.authorId.name}
                            </span>
                        </div>
                        ${isCommentOwner
                            ? `<button data-commentid="${comment._id}" class="delete-comment-btn bg-red-500 text-white px-2 py-1 rounded">
                                        Delete
                                    </button>`
                            : ""
                        }
                    </div>
                    <p class="!text-start py-2 mb-4 border-b-2 border-mySecondary">${comment.content}</p>
                `
                })
                .join("")

            await Swal.fire({
                title: "Comments for Post",
                html: formattedComments,
                icon: "success",
                showConfirmButton: false,
                showCloseButton: true,
                didOpen: () => {
                    const buttons = Swal.getHtmlContainer()?.querySelectorAll(".delete-comment-btn")
                    buttons?.forEach((btn) => {
                        btn.addEventListener("click", async () => {
                            const commentId = btn.getAttribute("data-commentid")
                            if (!commentId) return

                            const confirmResult = await Swal.fire({
                                title: "Are you sure?",
                                text: "You will not be able to recover this comment!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Yes, delete it!",
                            })

                            if (confirmResult.isConfirmed) {
                                try {
                                    await axios.delete(
                                        `https://stream-social-apis-production.up.railway.app/api/comments/${commentId}`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    )
                                    Swal.fire("Deleted!", "Comment has been deleted.", "success")
                                    handleShowComments(post) // إعادة تحميل التعليقات
                                } catch (error) {
                                    Swal.fire("Error", "You are not the owner of this comment.", "error")
                                }
                            }
                        })
                    })
                },
            })
            fetchPosts()
        } catch (error) {
            let message = "Something went wrong."
            if (
                axios.isAxiosError(error) &&
                error.response &&
                typeof error.response.data.message === "string"
            ) {
                message = error.response.data.message
            }

            await Swal.fire({
                title: "Failed to fetch comments",
                text: message,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#F15D8E",
            })
        }
    }

    const handleAddComment = async (
        e: React.FormEvent<HTMLFormElement>,
        postId: string
    ) => {
        e.preventDefault()

        if (!token) {
            Swal.fire("You must be logged in to comment", "", "warning")
            return
        }

        const form = e.currentTarget
        const input = form.querySelector<HTMLInputElement>('#comment-input')

        const content = input?.value.trim()

        if (!content) {
            Swal.fire("Please enter a comment", "", "warning")
            return
        }

        try {
            const response = await axios.post(
                `https://stream-social-apis-production.up.railway.app/api/comments`,
                { content, postId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            Swal.fire("Success", response.data.message || "Comment added", "success")

            if (input) input.value = ""

            fetchPosts && fetchPosts()

        } catch (error: any) {
            console.error(error)

            const errorMsg =
                error.response?.data?.message || "Failed to add comment"

            Swal.fire("Error", errorMsg, "error")
        }
    }

    const handleDeletePost = async (postId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#006fd3',
            cancelButtonColor: '#ff709c',
            confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(
                    `https://stream-social-apis-production.up.railway.app/api/posts/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
                fetchPosts()
            } catch (error) {
                Swal.fire('Error', 'Failed to delete post', 'error')
                console.error(error)
            }
        }
    }
    return (
        <div className="w-3/4 max-768:w-full px-3 py-4 flex flex-col gap-4 ">
            <div className="gap-5 flex max-576:flex-col justify-between">
                <h2 className="text-3xl font-merienda font-bold text-mySecondary max-576:text-center">My Posts</h2>
                <AddPost />
            </div>
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="relative border-2 border-mySecondary rounded-lg my-4 px-4 py-5 shadow-2xl"
                >
                    <h2 className="mb-5 max-576:!text-xl max-576:w-3/4 text-2xl font-bold text-myPrimary capitalize font-merienda">{post.title}</h2>
                    <p className="mb-4 text-base capitalize">{post.content}</p>
                    <span className="text-sm text-mySecondary font-extrabold underline">by {post.authorId.name}</span>

                    <form id="comment-form" className="flex items-center my-8 gap-4 max-576:flex-col max-576:!items-start" onSubmit={(e) => handleAddComment(e, post._id)}>
                        <input id="comment-input" type="text" placeholder="add comment.."
                            className="flex-1 border-transparent focus:outline-none py-2 focus:border-b-2 focus:border-b-myPrimary" />
                        <input type="submit" value="SEND" className="bg-myPrimary font-semibold text-white px-4 py-2 rounded-lg" />

                    </form>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <img
                                onClick={() => handleLike(post._id)}
                                src={postLikes[post._id] ? reactActive : reactUNactive}
                                alt="reaction"
                                style={{ cursor: "pointer", width: "24px" }}
                            />
                            <span>{post.likes.length}</span>
                        </div>
                        <button
                            className="block px-4 py-2 bg-myPrimary text-white rounded-lg hover:bg-opacity-80 transition"
                            onClick={() => handleShowComments(post)}
                        >
                            Show Comments
                        </button>
                        {userId === post.authorId._id && (
                            <img onClick={() => handleDeletePost(post._id)}
                                className="absolute rounded-full w-12 !top-4 right-4" src={deleteicon} alt="deleteicon" />
                        )}
                    </div>

                </div>
            ))}
        </div>
    )
}
