//返平区域排行

function createExampleFpqy(option, tooltipOption) {
    var myChart_fpqy = echarts.init(document.getElementById('fpqyBox'));
    myChart_fpqy.setOption(option);
    tools.loopShowTooltip(myChart_fpqy, option, tooltipOption);
}

function intFPQY() {
    var builderJson = {
        all: 0,
        industrydata: {},
        sexdata: {},
        agedata: {}
    };
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

    builderJson = {
        yAxis: ["驷马镇", "同州街道", "金宝街道", "涵水镇", "XX街道", "XX镇", "XXX街道", "XXX镇", "XXXX街道", "XXXX镇"],
        xAxis: [1000, 2000, 3000, 5000, 10000, 20000, 30000, 45000, 50000, 70000]
    };
    loadFPQY(builderJson);
}

function loadFPQY(builderJson) {

    var option_fpqy = {
        title: {
            text: '在平区域排行',
            left: '50%',
            top: '3%',
            textAlign: 'center',
            textStyle: {
                fontSize: '22',
                fontWeight: 'normal',
                color: '#fff'
            }
        },
        grid: {
            top: 50,
            width: '90%',
            bottom: '5%',
            left: 10,
            containLabel: true
        },
        yAxis: {
            type: 'category',
            data: builderJson.yAxis,
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
                interval: 0,
                rotate: 30,
                color: '#fff'
            }
        },
        xAxis: {
            type: 'value',
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
            }
        },
        series: [
            {
                data: builderJson.xAxis,
                type: 'bar',
                showBackground: true,
                label: {
                    position: 'insideRight',
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    color: '#1fabfb'
                },
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    createExampleFpqy(option_fpqy, {
        loopSeries: true
    });
}

