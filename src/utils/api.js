import { api } from "./constants"
import { checkReponse } from "./utils"

export const getIngredients = () => {
    return fetch(`${api}/ingredients`)
    .then(res => checkReponse(res))
}