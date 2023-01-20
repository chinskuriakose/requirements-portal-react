import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { services as service_list} from './service_list.js';

export async function getServices(query) {
    let services = await localforage.getItem("services");
    if (!services) services = [];
    if (query) {
        services = matchSorter(services, query, { keys: ["name"] })
    }
    else {
        
    }

    return services.sort(sortBy('name', 'createdAt'))
}



export async function createService(name) {
    let id = Math.random().toString(36).substring(2, 9);
    let serviceName = name;
    let service = { id, serviceName, createdAt: Date.now() }
    let services = await getServices();
    console.log(service)
    console.log(services)
    services.unshift(service);
    await set(services);
    return service;
}

export function getServicesList(query) {
    let services = service_list;
    if (!services) services = [];
    if (query) {
        services = matchSorter(services, query)
        return services
    } else {
        return services.sort()
    }
}

export async function updateService(id, updates) {
    let services = await localforage.getItem("services");
    let service = services.find(service => service.id === id);
    if (!service) throw new Error("Service object not created for ", id);
    Object.assign(service, updates);
    await set(services);
    return service;
}


function set(services) {
    return localforage.setItem("services", services);
}
