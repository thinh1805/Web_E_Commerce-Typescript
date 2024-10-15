import axios from "axios";
import { AxiosInstance } from "axios";
// AxiosInstance: Đây là kiểu dữ liệu của axios.create() trong TypeScript.
//  Nó đảm bảo rằng axiosInstance tuân theo các kiểu và phương thức do Axios cung cấp.
//Với kiểu này, TypeScript sẽ kiểm tra tính hợp lệ của các phương thức được sử dụng
// trên axiosInstance như get, post, put, delete, v.v.
export const Api:AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
})
    