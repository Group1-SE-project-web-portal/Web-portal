import { BASE_URL, USERNAME, PASSWORD } from '../constants/Constants'

const request = async (options) => {
    const headers = new Headers({

        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD),
        'Access-Control-Allow-Origin': '*'

    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);


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
        url: BASE_URL + '/charts.json?fields=*&paging=true&pageSize=5',
        method: 'GET'
    })
}

export function getOrganisationGroups() {
    return request({
        url: BASE_URL + "/organisationUnits.json?fields=displayName, dataSets[id, displayName], programs[id, displayName]&paging=true&pageSize=10",
        method: "GET"
    })
}