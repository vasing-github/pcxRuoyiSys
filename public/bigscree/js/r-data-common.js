/**
 * 获取请求地址
 * */
function getPostUrl(method) {
    var _host = "http://10.167.39.125:8080";
    var rurl = "";
    switch (method) {
        case "zwry-total"://总数统计
            rurl = "/farmer/farmernotoken/countfarmer";
            break;
        case "zwry-map"://返平人员出发区域分布
            rurl = "/farmer/farmernotoken/outorder";
            break;
        case "zwry-town"://到平区域分布
            rurl = "/farmer/farmernotoken/backorder";
            break;
        case "zwry-industry"://行业分布
            rurl = "/farmer/farmernotoken/outindustry";
            break;
        case "zwry-sex"://性别分布
            rurl = "/farmer/farmernotoken/outsexcount";
            break;
        case "zwry-age"://年龄分布
            rurl = "/farmer/farmernotoken/outagecount";
            break;
        case "zwry-nfp"://未来15天拟返平
            rurl = "/farmer/farmernotoken/preback";
            break;
    }
    return _host + rurl;
}