

import service from "@/request/request";

 export function getPictureData(params){
    return service({
        url:'/api/datasharing/findThemeDatasetList',
        method:'post',
        maxRedirects:0,
        params
    })
}