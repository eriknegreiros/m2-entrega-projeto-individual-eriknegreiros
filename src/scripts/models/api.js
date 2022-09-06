import {
    homepageList
} from "../axios.js"

export class Request {

    static async requestCompanyHomePage() {
        const base = await homepageList
            .get(`/companies`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestFilterCards(sector) {
        const base = await homepageList
            .get(`/companies/${sector}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }
}