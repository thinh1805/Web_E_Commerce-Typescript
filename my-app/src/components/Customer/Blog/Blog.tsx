import { useEffect, useState } from "react"
import { Category } from "../../Home/Category/Category";
import { Api } from "../../Api/Api";
import { Link } from "react-router-dom";
interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
}
export const Blog: React.FC = () => {
    const [data, setData] = useState<Blog[]>([]);
    
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            const response = await Api.get("/blog")
            setData(response.data.blog.data)
        } catch (error) {
            console.log(error)
        }
        
    }
    //Khi bạn định nghĩa kiểu trả về cho hàm renderData là JSX.Element,
    //bạn đang chỉ định rằng hàm này sẽ trả về một phần tử JSX duy nhất. 
    //Tuy nhiên, trong trường hợp bạn sử dụng data.map, 
    //bạn có thể đang trả về một mảng các phần tử JSX, 
    //điều này có thể gây ra lỗi kiểu nếu bạn không xử lý đúng.
    // const renderData = (): JSX.Element => đọc đoạn trên để hiểu vì sao không dùng cái này thks
    const renderData = (): JSX.Element | JSX.Element[] | null => { //JSX.Element là một kiểu dữ liệu trong TypeScript dùng để đại diện cho một phần tử JSX trong React. JSX (JavaScript XML) là cú pháp cho phép bạn viết các phần tử 
                                                                   //React bằng cách kết hợp JavaScript và HTML trong cùng một tệp.
        if (data.length === 0) {
            return (
                <p>No Blog posts available.</p>
            )
        }
        return data.map((blog) => (
            <div className="single-blog-post" key={blog.id}>
                <h3>{blog.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                    </span>
                </div>
                <a href="">
                    <img src={"http://localhost/laravel/public/upload/blog/image/" + blog.image} alt={blog.title} />
                </a>
                <p>{blog.content}</p> {/* Sử dụng nội dung từ blog */}
                <Link to={"/blog/detail/" + blog.id} className="btn btn-primary">Read More</Link>
            </div>
        ));
    }
    return (
        <div>
            <Category />
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {renderData()}
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a href="" className="active">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                            <li><a href=""><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}