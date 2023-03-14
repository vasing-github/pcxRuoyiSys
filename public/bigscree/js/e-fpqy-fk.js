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
        yAxis: ["新疆维吾尔自治区", "北京市", "浙江省", "福建省", "XX省", "XX省", "XXX省", "XXX省", "XXXX省", "XXXX省"],
        xAxis: [50000, 40000, 30000, 20000, 30000, 20000, 30000, 20000, 30000, 20000]
    };
    loadFPQY(builderJson);
}

function loadFPQY(builderJson) {

    var option_fpqy = {
        title: {
            text: '返平人员省份排行',
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
                color: '#fff',
                fontSize: 14
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

