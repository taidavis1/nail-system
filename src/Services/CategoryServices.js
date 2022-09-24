import axios from "axios";

const baseUrl = 'http://127.0.0.1:5000';

const CategoryServices = {
    getCategory : async() => {
        return new Promise((resolve,reject)=> {
            axios.get(`${baseUrl}/get_data`).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(
                err => reject(err)
            )
        })
    },
    addCategory : async(name,color) => {
        return new Promise((resolve,reject)=> {
            axios.post(`${baseUrl}/Add_Category`,{
                name : name,
                color : color
            }).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    }
}


export default CategoryServices;