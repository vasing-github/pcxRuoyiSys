//卡口数据

function createExampleKksj(option, tooltipOption) {
    var myChart_kksj = echarts.init(document.getElementById('kksjBox'));
    myChart_kksj.setOption(option);
    tools.loopShowTooltip(myChart_kksj, option, tooltipOption);
}

function intKKSJ() {
    var builderJson = [];
    //var postData = {
    //    "Action": "GetStaticsProjectNumByCardNo",
    //    "areatop": 7,
    //    "wintop": 5,
    //    "DateMonth": $("#hidMonth").val()
    //};
    //var postUrl = "/IWebInterface/ISequenceHandler.ashx";
    //var successBack = function (result) {
    //    layer.closeAll();
    //    var townMapData = [{ name: '同州街道', value: 10, bvalue: 6 }, { name: '黑水乡', value: 10, bvalue: 6 }];
    //    loadTownMap(townMapData);
    //}
    //var errorBack = function () {
    //    layer.closeAll();
    //    layer.open({
    //        content: '对不起，数据加载失败！'
    //        , shadeClose: false
    //        , btn: '确定'
    //    });
    //}
    //$.ajaxPost(postUrl, postData, successBack);
    var areaList = ["东互通", "西互通", "驷马互通", "青凤互通", "火车站","乡镇道卡口"];
    $.each(areaList, function (i, item) {
        builderJson.push(
            {
                name: item,
                value: [
                    { name: "9点", value: "300" },
                    { name: "10点", value: "1000" },
                    { name: "11点", value: "1500" },
                    { name: "12点", value: "2000" },
                    { name: "13点", value: "2500" },
                    { name: "14点", value: "3000" },
                    { name: "15点", value: "5000" },
                    { name: "16点", value: "3500" },
                    { name: "17点", value: "1000" }
                ]
            });
    });
    loadKKSJ(builderJson);
}

function loadKKSJ(builderJson) {
    var datalegend = [];//["东互通","西互通","驷马互通"]
    var dataxAxis = [];//['9点','10点']
    var seriesList = [];
    //{
    //    name: 'Email',
    //    type: 'line',
    //    stack: 'Total',
    //    data: [120, 132, 101, 134, 90, 230, 210]
    //}
    if (builderJson != null) {
        $.each(builderJson, function (i, item) {
            //构建datalegend
            var ishave = false;
            if (datalegend != null && datalegend.length > 0) {
                $.each(datalegend, function (k, ditem) {
                    if (ditem == item.name) {
                        ishave = true;
                        return false;
                    }
                });
            }
            if (!ishave) {
                datalegend.push(item.name);
            }
            //构建dataxAxis和seriesData
            var seriesData = [];//[120, 132, 101, 134, 90, 230, 210]
            var pdata = item.value;
            if (pdata != null) {
                $.each(pdata, function (j, citem) {
                    ishave = false;
                    if (dataxAxis != null && dataxAxis.length > 0) {
                        $.each(dataxAxis, function (h, xitem) {
                            if (citem.name == xitem) {
                                ishave = true;
                                return false;
                            }
                        });
                    }
                    if (!ishave) {
                        dataxAxis.push(citem.name);
                    }
                    seriesData.push(citem.value);
                })
            }

            seriesList.push(
                {
                    name: item.name,
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: seriesData
                }
            );
        })
    }


    var option_kksj = {
        title: {
            text: '卡口实时数据',
            left: '50%',
            top: '2%',
            textAlign: 'center',
            textStyle: {
                fontSize: '22',
                fontWeight: 'normal',
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom:'5%',
            data: datalegend,
            textStyle: {
                fontSize: 12,//字体大小
                color: '#ffffff'//字体颜色
            }
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '18%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            },
            data: dataxAxis
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            }
        },
        series: seriesList
        //[
        //    {
        //        name: 'Email',
        //        type: 'line',
        //        stack: 'Total',
        //        data: [120, 132, 101, 134, 90, 230, 210]
        //    },
        //    {
        //        name: 'Union Ads',
        //        type: 'line',
        //        stack: 'Total',
        //        data: [220, 182, 191, 234, 290, 330, 310]
        //    },
        //    {
        //        name: 'Video Ads',
        //        type: 'line',
        //        stack: 'Total',
        //        data: [150, 232, 201, 154, 190, 330, 410]
        //    },
        //    {
        //        name: 'Direct',
        //        type: 'line',
        //        stack: 'Total',
        //        data: [320, 332, 301, 334, 390, 330, 320]
        //    },
        //    {
        //        name: 'Search Engine',
        //        type: 'line',
        //        stack: 'Total',
        //        data: [820, 932, 901, 934, 1290, 1330, 1320]
        //    }
        //]
    };

    createExampleKksj(option_kksj, {
        loopSeries: true
    });
}

