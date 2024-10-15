import { Slider } from "./Slider/Slider"
import { Category } from "./Category/Category"
import { Items } from "./Features Items/Items"
export const Home:React.FC = () => {
    return(
        <div>
            <Slider/>
            <Category/>
            <Items/>
        </div>
    )
}