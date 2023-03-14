/**
 * 获取请求地址
 * */
function getPostUrl(method) {
    var _host = "http://10.167.39.125:8080";
    var rurl = "";
    switch (method) {
        case "add":
            rurl = "/farmer/farmernotoken/addfarmer";
            break;
        case "edit":
            rurl = "/farmer/farmernotoken/modify";
            break;
        case "view":
            rurl = "/farmer/farmernotoken/getone";
            break;
        case "industry":
            rurl = "/farmer/farmernotoken/type?dictType=sys_farmer_industry";
            break;
    }
    return _host + rurl;
}

function ajaxPost(url, params, success, error, loadtxt, type, isshowload) {
    var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
    };
    if (!!error) {
        errorBack = error;
    }
    var ltxt = "数据提交中";
    if (!!loadtxt) {
        ltxt = loadtxt;
    }
    var ltype = "post";
    if (!!type) {
        ltype = type;
    }
    var lisshowload = true;
    if (isshowload != null) {
        lisshowload = isshowload;
    }
    $.ajax({
        url: url,
        data: params,
        type: ltype,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: success,
        error: errorBack,
        beforeSend: function () {
            if (lisshowload) {
                $.showLoading(ltxt);
            }
        },
        complete: function () {

        }
    });
}

function ajaxGet(url, params, success, error, loadtxt, type) {
    var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
    };
    if (!!error) {
        errorBack = error;
    }
    var ltxt = "数据提交中";
    if (!!loadtxt) {
        ltxt = loadtxt;
    }
    var ltype = "get";
    if (!!ltype) {
        ltype = type;
    }
    $.ajax({
        url: url,
        data: params,
        type: ltype,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: success,
        error: errorBack,
        beforeSend: function () {
            $.showLoading(ltxt);
        },
        complete: function () {

        }
    });
}