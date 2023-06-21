const apiURL = 'https://ka96jx8to7.execute-api.eu-north-1.amazonaws.com/prod/';

export const getUser = (email, token) =>
    new Promise(() => {
        fetch(apiURL + email, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            return response.json();
        }).catch(e => console.log(e));
    });
