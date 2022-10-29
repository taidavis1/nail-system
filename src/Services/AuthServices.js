import api from "."

const authServices = {
    userLogin: async (email, password) => {
        let formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return new Promise((resolve, reject) => {
            api.call().post(`/login`, formData, config).then(
                res => {
                    const { data } = res
                    resolve(data)
                }
            ).catch(
                err => reject(err)
            )
        })
    }
}

export default authServices