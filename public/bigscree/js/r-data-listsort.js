/**
 * 总数统计指标对接--在外平昌人信息服务平台大数据分析系统
 * */
function loadTotalNum() {
    var postData = {};
    var postUrl = getPostUrl("zwry-total");;
    var successBack = function (result) {
        layer.closeAll();
        if (result != null && result.code == 200) {
            $("#todayBackNum").text(result.data.todayBack);//今日返平
            $("#totalNum").text(result.data.allfarmer);//申报在外人员总数
            $("#totalOutNum").text(result.data.outFarmer);//尚在外人数
            $("#totalBackNum").text(result.data.backAll);//年度返乡总人次
        }
    }
    var errorBack = function () {
        layer.closeAll();
    }
    $.ajaxGet(postUrl, postData, successBack);
}

/**
 * 在外人员省份排行--在外平昌人信息服务平台大数据分析系统
 * */
function loadOutArea(seqAreaData) {
    if (!!seqAreaData && seqAreaData.length > 0) {
        var rHtml = "";
        var maxNum = 0;
        $.each(seqAreaData, function (i, item) {
            if (i < 6) {
                var numstr = "";
                switch (i) {
                    case 0:
                        numstr = "①";
                        maxNum = Number(item.value);
                        break;
                    case 1:
                        numstr = "②";
                        break;
                    case 2:
                        numstr = "③";
                        break;
                    case 3:
                        numstr = "④";
                        break;
                    case 4:
                        numstr = "⑤";
                        break;
                    case 5:
                        numstr = "⑥";
                        break;
                    case 6:
                        numstr = "⑦";
                        break;
                }
                var prowidth = 100;
                if (maxNum > 0) {
                    prowidth = ((Number(item.value) / maxNum) * 100).toFixed(2);
                }
                rHtml += '<li>' + numstr + ' <span><em class="txt">' + item.name.replace(/<br>/g, "").replace(/<br >/g, "") + '</em><em class="bg" style="width:' + prowidth + '%"></em></span><i>' + item.value + '人</i></li>';
            } else {
                return false;
            }
        })
        $("#listHaveBackAreaSort").html(rHtml);
    }
}

function loadHaveBackArea() {
    var postData = {
        "Action": "GetStaticsProjectNumByCardNo",
        "areatop": 7,
        "wintop": 5,
        "DateMonth": $("#hidMonth").val()
    };
    var postUrl = "/IWebInterface/ISequenceHandler.ashx";
    var successBack = function (result) {
        layer.closeAll();
        $("#totalNum").text(result.DayNum);//总计务工人员
        $("#totalBackNum").text(result.MonthNum);//已返乡
        $("#totalOutNum").text(result.YearNum);//尚在外

        //已返乡人员务工省份排行榜
        var seqAreaData = result.SeqAreaData;
        if (!!seqAreaData) {
            var maxNum = 0;
            $.each(seqAreaData, function (i, item) {
                var numstr = "";
                switch (i) {
                    case 0:
                        numstr = "①";
                        maxNum = Number(item.num);
                        break;
                    case 1:
                        numstr = "②";
                        break;
                    case 2:
                        numstr = "③";
                        break;
                    case 3:
                        numstr = "④";
                        break;
                    case 4:
                        numstr = "⑤";
                        break;
                    case 5:
                        numstr = "⑥";
                        break;
                    case 6:
                        numstr = "⑦";
                        break;
                }
                var prowidth = 100;
                if (maxNum > 0) {
                    prowidth = ((Number(item.Num) / maxNum) * 100).toFixed(2);
                }
                $("#listHaveBackAreaSort").append('<li>' + numstr + ' <span><em class="txt">' + item.name.replace(/<br>/g, "").replace(/<br >/g, "") + '</em><em class="bg" style="width:' + prowidth + '%"></em></span><i>' + item.num + '人</i></li>');
            })
        }

        var seqWinData = result.SeqWinData;
        if (!!seqWinData) {
            var maxNum = 0;
            $.each(seqWinData, function (i, item) {
                var rstr = '<li><span>' + item.WinName + item.WinNo + '</span><i>' + (i + 1) + '</i></li>'
                $("#seqWinSort").append(rstr);
            })
        }
    }
    var errorBack = function () {
        layer.closeAll();
        layer.open({
            content: '对不起，数据加载失败！'
            , shadeClose: false
            , btn: '确定'
        });
    }
    $.ajaxPost(postUrl, postData, successBack);
}

function loadNoBackArea() {
    var postData = {
        "Action": "GetStaticsProjectNumByCardNo",
        "areatop": 7,
        "wintop": 5,
        "DateMonth": $("#hidMonth").val()
    };
    var postUrl = "/IWebInterface/ISequenceHandler.ashx";
    var successBack = function (result) {
        //已返乡人员务工省份排行榜
        var seqAreaData = result.data;
        if (!!seqAreaData) {
            $("#listNoBackAreaSort").html("");
            var maxNum = 0;
            $.each(seqAreaData, function (i, item) {
                var _name = item.AreaName.replace(/<br>/g, "").replace(/<br >/g, "");
                var _num = item.Num;
                $("#listNoBackAreaSort").append('<li><span>' + _name + '（' + _num + '人）</span><i>' + (i + 1) + '</i></li>');
            })
        }
    }
    var errorBack = function () {
        layer.closeAll();
        layer.open({
            content: '对不起，数据加载失败！'
            , shadeClose: false
            , btn: '确定'
        });
    }
    $.ajaxPost(postUrl, postData, successBack);
}

//防控统计
function loadBackArea() {
    var postData = {
        "Action": "GetStaticsProjectNumByCardNo",
        "areatop": 7,
        "wintop": 5,
        "DateMonth": $("#hidMonth").val()
    };
    var postUrl = "/IWebInterface/ISequenceHandler.ashx";
    var successBack = function (result) {
        layer.closeAll();
        $("#totalNum").text(result.DayNum);//总返平人员
        $("#totalBackNum").text(result.MonthNum);//今日返平
        $("#totalOutNum").text(result.YearNum);//本月返平

        $("#todayBackDongNum").text(result.TodaySeqNum);//东互通
        $("#todayBackXiNum").text(result.TodayCallNum);//西互通
        $("#todayBackSiMaNum").text(result.TodayPassNum);//驷马互通
        $("#todayBackQingFengNum").text(result.TodayPassNum);//青凤互通
        $("#todayBackTrainNum").text(result.TodayPassNum);//火车站

        //已返乡人员务工省份排行榜
        var seqWinData = result.SeqWinData;
        if (!!seqWinData) {
            $("#listBackAreaSort").html("");
            $.each(seqWinData, function (i, item) {
                var rstr = '<li><span>' + item.WinName + item.WinNo + '</span><i>' + (i + 1) + '</i></li>'
                $("#listBackAreaSort").append(rstr);
            })
            jQuery(".txtMarquee-top").slide({ mainCell: ".bd ul", autoPlay: true, effect: "topMarquee", vis: 5, interTime: 50 });
        }
    }
    //对接完成后删除
    jQuery(".txtMarquee-top").slide({ mainCell: ".bd ul", autoPlay: true, effect: "topMarquee", vis: 8, interTime: 50 });
    jQuery(".txtMarquee3-top").slide({ mainCell: ".bd ul", autoPlay: true, effect: "topMarquee", vis: 7, interTime: 50 });
    var errorBack = function () {
        layer.closeAll();
        layer.open({
            content: '对不起，数据加载失败！'
            , shadeClose: false
            , btn: '确定'
        });
    }
    $.ajaxPost(postUrl, postData, successBack);
}
