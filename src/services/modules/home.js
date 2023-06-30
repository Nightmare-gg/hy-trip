import HYRequest from '../request/index'

export function getHomeHotSuggests() {
    return HYRequest.get({
        url: "/home/hotSuggests",
    });
};

export function getCategories() {
    return HYRequest.get({
        url: "/home/categories",
    });
}