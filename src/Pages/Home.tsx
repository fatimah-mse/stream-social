import AddPost from "../components/AddPost";
// import HomeHero from "../components/HomeHero";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";

export default function Home() {
    return (
        <>
            <Navbar />
            {/* <HomeHero /> */}
            <section className="py-4 max-992:py-3 max-992:px-10 max-768:px-5 px-20 gap-5 flex max-576:flex-col justify-between mt-20 max-992:mt-[72px] max-576:mt-14">
                <h2 className="text-3xl font-merienda font-bold text-mySecondary max-576:text-center">All Posts</h2>
                <AddPost />
            </section>
            <PostsList />
        </>
    )
}
