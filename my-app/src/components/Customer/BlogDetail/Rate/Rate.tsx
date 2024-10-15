import React, { useEffect, useState } from 'react';
import { Flex, message, Rate } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { Api } from '../../../Api/Api';
import { Tag } from '../Tag/Tag';
interface RatingData {
    rate: number;
}
export const RateBlog: React.FC = () => {
    const auth = useContext(AuthContext);
    const param = useParams<{ id: string }>();
    const [rating, setRating] = useState<number>(0);
    const handleRate = async(newRating: number) => {
        setRating(newRating);
        if (!auth?.token) {
            message.error("Vui lòng đăng nhập để đánh giá");
            return;
        }
        const url = "/blog/rate/" + param.id
        const formData = new FormData();
        formData.append('blog_id', param.id ?? "")
        formData.append('user_id', auth?.user?.id ?? "")
        formData.append('rate', newRating.toString());
        let config = {
            headers: {
                'Authorization': 'Bearer ' + auth?.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        try{
            const response = await Api.post(url,formData,config)
            message.success("Bạn đã đánh giá thành công")
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getRate();   
    },[param.id])
    const getRate = async() =>{
        try{
            const response = await Api.get("blog/rate/"+param.id)
            const ratings:RatingData[] = response.data.data;
            const totalRatings = ratings.reduce((sum: number, current: { rate: number }) => sum + current.rate, 0);
            const averageRating = totalRatings / ratings.length;
            setRating(averageRating);
        }catch(error){
            console.log(error)
        }
        
    }
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <Flex gap="middle" vertical>
                    <Flex gap="middle">
                        <Rate
                            value={rating}
                            onChange={handleRate}
                        />
                    </Flex>
                </Flex>
                <li className="color">(5 votes)</li>
            </ul>
            <Tag/>
        </div>//rating-area
    );
}