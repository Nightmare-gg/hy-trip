import HYRequest from '../request/index'

export function getHomeHotSuggests() {
    return HYRequest.get({
        url: "/home/hotSuggests",
    });
}