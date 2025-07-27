import service from "@/request/request";

 export function getData(params){
    return service({
        url:'/api/flood/getAll',
        method:'GET',
        maxRedirects:0,
        params
    })
}

export function getTableData(params){
    return service({
        url:'/api/flood/getList',
        method:'GET',
        maxRedirects:0,
        params
    })
}

export function selectData(params){
    return service({
        url:'/api/flood/search',
        method:'GET',
        maxRedirects:0,
        params
    })
}

