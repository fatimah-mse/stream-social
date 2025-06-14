import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'

export default function Preloader() {
    return (
        <div className="h-screen w-full flex justify-center items-center overflow-hidden">
            <Hourglass
                size="80"
                bgOpacity="0.4"
                speed="1.75"
                color="#006fd3"
            />
        </div>

    )
}
