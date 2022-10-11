import api from ".";

const CategoryServices = {
    getCategory: async () => {
        return new Promise((resolve, reject) => {
            api.call().get('/get_data').then(
                res => {
                    const { data } = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    },
    addCategory: async (name, color) => {
        return new Promise((resolve, reject) => {
            api.call().post(`/Add_Category`, {
                name: name,
                color: color
            }).then(
                res => {
                    const { data } = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    },
    addSubCat: async (name, category) => {
        return new Promise((resolve, reject) => {
            api.call().post(`/Add_Subcat`, {
                name: name,
                category: category
            }).then(
                res => {
                    const { data } = res
                    resolve(data)
                }
            ).catch(err => reject(err))
        })
    },
    // Services API
    addService: async (displayName, name, price, commision, chooseColor, image, category, subcat) => {
        let formData = new FormData()
        formData.append('displayName', displayName)
        formData.append('name', name);
        formData.append('price', price);
        formData.append('commission', commision);
        formData.append('color', chooseColor);
        formData.append("photo", { uri: image, name: 'image', type: 'image/jpeg' });
        formData.append('category', category);
        formData.append('subcat', subcat);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
                    }
            return new Promise((resolve,reject)=> {
                api.call().post('/Add_Services',formData,config).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(err => reject(err))
            })
        },
        getServices : async() => {
            return new Promise((resolve,reject)=> {
                api.call().get('/get_all_services').then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(err => reject(err))
            })
        },
        getServicesByCat :  async (categoryID) => {
            return new Promise((resolve,reject)=> {
                api.call().post(`/get_services_by_category/${categoryID}`).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(err => reject(err))
            })
        },
        getServiceBySubCat : async (categoryID,subCatID) => {
            return new Promise((resolve,reject)=> {
                api.call().post(`/get_services_by_subcat/${categoryID}/${subCatID}`).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(err => reject(err))
            })
        },
        deleteService : async (service_id) => {
            return new Promise((resolve,reject) => {
                api.call().post(`/delete_service`,
                {
                    service_id : service_id
                }).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(
                    err => reject(err)
                )
            })
        },
        getServiceByID : async (service_id) => {
            return new Promise((resolve,reject)=> {
                api.call().post(`/get_services_by_id`, {
                    service_id : service_id
                }).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(
                    err => reject(err)
                )
            })
        },
        editServiceInfo : async (category_id,subcat_id,service_id,
            name,photo,display_name,commision,color) => {
            
            return new Promise((resolve,reject) => {
                api.call().post(`edit_service_infor`,{
                    category_id : category_id,
                    subcat_id : subcat_id,
                    service_id : service_id,
                    name : name,
                    photo : photo,
                    display_name : display_name,
                    commision : commision,
                    color : color
                }).then(
                    res => {
                        const {data} = res
                        resolve(data)
                    }
                ).catch(
                    err => reject(err)
                )
            })
            }
    }


export default CategoryServices;