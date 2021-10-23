import http from "../http-common"


class AllergyDataService {
    getAllAllergy(){
        return http.get("/allergy")
    }
    get(id){
        return http.get(`/allergy?id=${id}`)
    }

    createFoodItem(data){
        return http.post("/allergy", data)
    }

    find(query, page = 0) {
        let string = ""

        const queries = Object.entries(query)
        queries.forEach(([k,v], i) => {
            const amountQueries = queries.length - 1
        if (i === amountQueries) {
            string = string.concat(String(k), "=", String(v))
        } else {
            string = string.concat(String(k), "=", String(v),"&")
        }
        })
        console.log(string);
        return http.get(`/allergy?${string}`);
      } 

    updateFoodItem(data) {
        return http.put("/allergy", data)
    }

    deleteFoodItem(id) {
        return http.delete(`/allergy?id=${id}`)
    }
}

export default new AllergyDataService