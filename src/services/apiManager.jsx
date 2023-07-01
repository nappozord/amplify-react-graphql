import { API } from 'aws-amplify';

const apiName = 'listupAPI';

export async function getUser(email) {
    const path = '/user/' + email;
    const myInit = {
        response: true,
    };

    return API.get(apiName, path, myInit)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function postUser(user) {
    const path = '/user/' + user.email;
    const myInit = {
        body: user,
    };

    return API.post(apiName, path, myInit)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function getCategories(category) {
    const path = '/categories/' + category;
    const myInit = {
        response: true,
    };

    return API.get(apiName, path, myInit)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function postList(user, list) {
    const path = '/user/' + user.email + '/list';
    const myInit = {
        body: list,
    };

    return API.post(apiName, path, myInit)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export async function getAllLists(user) {
    const path = '/user/' + user.email + '/list';
    const myInit = {
        response: true,
    };

    return API.get(apiName, path, myInit)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
