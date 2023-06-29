import HYRequest from '../request'

export function getCityAll() {
    return HYRequest.get({
        url: "/city/all"
    })
}