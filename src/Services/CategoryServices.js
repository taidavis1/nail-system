import axios from "axios";
import api from ".";

const baseUrl = 'http://127.0.0.1:5000';

const CategoryServices = {
    getCategory : async() => {
        return new Promise((resolve,reject)=> {
            api.call().get('/get_data').then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    },
    addCategory : async(name,color) => {
        return new Promise((resolve,reject)=> {
            api.call().post(`/Add_Category`,{
                name : name,
                color : color
            }).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    },
    addSubCat : async(name,category) => {
        return new Promise((resolve,reject)=> {
            axios.call().post(`/Add_Subcat`,{
                name : name,
                category : category
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