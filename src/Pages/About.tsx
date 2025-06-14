import TopBanner from '../components/TopBanner'
import MyInfo from '../components/MyInfo'
import MyPosts from '../components/MyPosts'

export default function About() {


    return (
        <div className="">
            <TopBanner />
            <section className="py-10 max-768:py-5 max-992:px-10 max-768:px-5 px-20 mt-20 max-992:mt-[72px] max-576:mt-14 flex flex-wrap justify-between gap-3">
                <MyInfo />
                <MyPosts />
            </section>


        </div>
    )
}



