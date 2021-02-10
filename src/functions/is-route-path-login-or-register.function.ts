import {useRoute} from "vue-router";

export function isRoutePathLoginOrRegister(): boolean {
    const route = useRoute();
    return route.path === '/login' || route.path === '/register';
}
