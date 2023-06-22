import {API} from "aws-amplify";

const apiName = 'listupAPI';
const myInit = {
    response: true,
}

export async function getUser(email) {
    const path = '/user/' + email;

    return API.get(apiName, path, myInit)
        .then((response) => {
            console.log('got response', response)
            return response
        })
        .catch((error) => {
            console.log('got error', error)
            return error
        })
}