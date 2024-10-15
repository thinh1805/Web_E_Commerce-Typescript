import { useEffect, useState } from "react"
import Socical from "../../../images/blog/socials.png"
import { Api } from "../../../Api/Api";
import { useParams } from "react-router-dom";
import { Category } from "../../../Home/Category/Category";
import { Comment } from "../Comment/Comment";
import { ListComment } from "../List Comment/List-comment";
import { RateBlog } from "../Rate/Rate";
import { Tag } from "../Tag/Tag";
interface Detail {
    id: number;
    content: string;
    image: string;
    title: string;
}
export const Detail: React.FC = () => {
    const [data, setData] = useState<Detail | null>(null);
    const params = useParams<{id:string}>();
    useEffect(() => {
        getData();
    }, [params.id])
    const getData = async () => {
        try {
            const response = await Api.get("/blog/detail/" + params.id) // cái này trả về 1 object nên state khai báo kiểu thế
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const renderData = (): JSX.Element | null => { //JSX.Element là một kiểu dữ liệu trong TypeScript dùng để đại diện cho một phần tử JSX trong React. JSX (JavaScript XML) là cú pháp cho phép bạn viết các phần tử 
        //React bằng cách kết hợp JavaScript và HTML trong cùng một tệp.
        if (!data) {
            return (
                <p>No Blog posts available.</p>
            )
        }
        return(
            <div className="single-blog-post" >
                <h3>{data.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                </div>
                <a href="">
                    <img src={"http://localhost/laravel/public/upload/blog/image/" + data.image} alt="" />
                </a>
                <p>
                    {data.content}
                </p>
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Category />
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {renderData()}
                </div>{/*/blog-post-area*/}
                <RateBlog/>
                
                <div className="socials-share">
                    <a href=""><img src={Socical} alt="" /></a>
                </div>
                <ListComment/>
                <Comment/>
            </div>
        </div>
    )
}