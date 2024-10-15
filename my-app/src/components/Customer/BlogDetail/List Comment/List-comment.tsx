import { useEffect, useState } from "react"
import { Api } from "../../../Api/Api";
import { Link, useParams } from "react-router-dom";
import { UserOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
interface Comment {
    id: number;
    comment: string;
    image_user: string;
}
export const ListComment:React.FC = () => {
    const [comment, setComment] = useState<Comment[]>([]);
    const params = useParams<{id:string}>();
    useEffect(() => {
        const intervalId = setInterval(() =>{
            getData();
        },5000)
        getData();
        return() => clearInterval(intervalId);
    }, [])

    const getData = async () => {
        try {
            const response = await Api.get("/blog/detail/" + params.id)
            setComment(response.data.data.comment)
        } catch (error) {
            console.log(error)
        }

    }
    const renderComment = (): JSX.Element | JSX.Element[] | null => {
        if (comment.length === 0) {
            return (
                <p>No comment in blog.</p>
            )
        }
        return comment.map((data) => (
            <li className="media">
                <a className="pull-left" href="#">
                    <img src={"http://localhost/laravel/public/upload/user/avatar/" + data.image_user} alt="8888" style={{width:50}} />
                </a>
                <div className="media-body">
                    <ul className="sinlge-post-meta">
                        <li><UserOutlined className="icon"/>Janis Gallagher</li>
                        <li><ClockCircleOutlined className="icon"/> 1:33 pm</li>
                        <li><CalendarOutlined className="icon"/> DEC 5, 2013</li>
                    </ul>
                    <p>{data.comment}</p>
                    <a className="btn btn-primary" href=""><i className="fa fa-reply" />Replay</a>
                </div>
            </li>
        ));
    }
    return (
        <div className="response-area">
            <h2>{comment.length} RESPONSES</h2>
            <ul className="media-list">
                {renderComment()}
            </ul>
        </div>
    )
}