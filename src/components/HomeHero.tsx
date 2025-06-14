import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { HeroImgs } from "../Data/HeroData"

export default function HomeHero() {

    const settings = {
        dots: true,
        arrows: false, 
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    
    return (
        <section className="h-hero-lg max-992:h-hero-md max-576:h-hero-sm mt-20 max-992:mt-[72px] max-576:mt-14 flex flex-wrap items-center max-768:flex-col-reverse gap-y-10 justify-between">
            <div className="slider-container w-full h-full">
                <Slider {...settings}>
                    {HeroImgs.map((img,index) => {
                        return (
                            <img className="object-cover w-full h-hero-lg max-992:h-hero-md max-576:h-hero-sm" key={index} src={img.img} alt={`slide.`+ index +1} />
                        )
                    })}
                </Slider>
            </div>
        </section>
    )
}
