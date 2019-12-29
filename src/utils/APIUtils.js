import { BASE_URL, USERNAME, PASSWORD } from '../constants/Constants'

<<<<<<< HEAD
const request = async (options) => {
=======
export const request = async (options) => {
>>>>>>> master
    const headers = new Headers({

        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD),
<<<<<<< HEAD
        'Access-Control-Allow-Origin': '*'

=======
        'Allow-Cross-Origin-Access': '*'
>>>>>>> master
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

<<<<<<< HEAD

=======
>>>>>>> master
    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );

};
export function getAllDashboards() {
    return request({
        url: BASE_URL + `/dashboards.json`,
        method: 'GET'
    })
}

export function getOneDashboard(dashId) {
    return request({
        url: BASE_URL + `/dashboards/${dashId}`,
        method: 'GET'
    })
}

export function getDataElements() {
    return request({
        url: BASE_URL + '/dataElements?pageSize=10&fields=*',
        method: 'GET'
    })
}

export function getCharts() {
    return request({
        url: BASE_URL + '/charts.json?fields=*&paging=false',
        method: 'GET'
    })
}

export function getAllDashboards() {
    return request({
        url: BASE_URL + '/dashboards.json?fields=*&paging=false',
        method: 'GET'
    })
}

export function getOrganisationUnits() {
    return request({
        url: BASE_URL + "/organisationUnits.json?fields=displayName, id&paging=false",
        method: "GET"
    })
}

export function getData(id1, id2, id3, id4) {
    return request({
        url: BASE_URL + `/analytics.json?dimension=dx:${id1};${id2}&dimension=ou:${id3}&dimension=pe:${id4}`,
        method: 'GET'
    })
}

export function oneChart() {
    return request({
        url: BASE_URL + '/analytics?dimension=dx:Uvn6LCg7dVU;AUqdhY4mpvp;Q3M7Htpzg1Y&dimension=pe:THIS_YEAR',
        method: "GET"
    })
}