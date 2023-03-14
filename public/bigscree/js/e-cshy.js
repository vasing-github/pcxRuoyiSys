function createExampleCshy(option, tooltipOption) {
    var myChart_cshy = echarts.init(document.getElementById('cshyBox'));
    myChart_cshy.setOption(option);
    tools.loopShowTooltip(myChart_cshy, option, tooltipOption);
}

function intCSHY() {
    var builderJson = {
        all: 0,
        industrydata: {},
        sexdata: {},
        agedata: {}
    };
    //加载行业数据
    var postData = {};
    var postUrl = getPostUrl("zwry-industry");
    var successBack = function (result) {
        layer.closeAll();
        if (!!result && result.code == 200 && !!result.data) {
            $.each(result.data, function (i, item) {
                if (i < 10) {
                    var keyarry = Object.keys(item);
                    var valarry = Object.values(item);
                    if (keyarry.length > 0 && valarry.length > 0) {
                        var _key = strcut(keyarry[0], 6, "...");
                        var _num = Number(valarry[0]);
                        builderJson.industrydata[_key] = _num;
                        if (_num > builderJson.all) {
                            builderJson.all = _num;
                        }
                    }
                } else {
                    return false;
                }
            })
        }
        loadCSHY(builderJson);
    }
    $.ajaxGet(postUrl, postData, successBack);

    //加载性别数据
    var postSexData = {};
    var postSexUrl = getPostUrl("zwry-sex");
    var successSexBack = function (result) {
        layer.closeAll();
        if (!!result && result.code == 200 && !!result.data) {
            var keyarry = Object.keys(result.data);
            var valarry = Object.values(result.data);
            $.each(keyarry, function (i, citem) {
                var _num = Number(valarry[i]);
                var _key = "";
                switch (Number(citem)) {
                    case 0:
                        _key = "男";
                        break;
                    case 1:
                        _key = "女";
                        break;
                }
                builderJson.sexdata[_key] = _num;
            })
        }
        loadCSHY(builderJson);
    }
    $.ajaxGet(postSexUrl, postSexData, successSexBack);

    //加载年龄数据
    var postAgeData = {};
    var postAgeUrl = getPostUrl("zwry-age");
    var successAgeBack = function (result) {
        layer.closeAll();
        if (!!result && result.code == 200 && !!result.data) {
            var keyarry = Object.keys(result.data);
            var valarry = Object.values(result.data);
            $.each(keyarry, function (i, citem) {
                var _num = Number(valarry[i]);
                if (_num > 0) {
                    builderJson.agedata[citem] = _num;
                }
            })
        }
        loadCSHY(builderJson);
    }
    $.ajaxGet(postAgeUrl, postAgeData, successAgeBack);


    //builderJson = {
    //    all: 10887,
    //    industrydata: {
    //        '建筑业': 2788,
    //        '服务业': 9575,
    //        '保险业': 9400,
    //        '采矿': 9466,
    //        '能源': 9266,
    //        '餐饮': 3419,
    //        '宾馆': 2984,
    //        '房地产': 2739,
    //        '服装业': 2744,
    //        '广告业': 2466
    //    },
    //    sexdata: {
    //        '男性': 17365,
    //        '女性': 4079
    //    },
    //    agedata: {
    //        '21-30': 1594,
    //        '31-40': 925,
    //        '41-50': 1608,
    //        '51-60': 721,
    //        '61-70': 2179
    //    }
    //};
    //loadCSHY(builderJson);
}

function loadCSHY(builderJson) {

    const waterMarkText = 'ECHARTS';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.08;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);
    var option_cshy = {
        backgroundColor: {
            type: 'pattern',
            image: canvas,
            repeat: 'repeat'
        },
        tooltip: {},
        title: [
            {
                text: '从事行业情况',
                left: '50%',
                top: '3%',
                textAlign: 'center',
                textStyle: {
                    fontSize: '22',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            {
                text: '性别统计',
                left: '20%',
                top: '55%',
                textAlign: 'center',
                textStyle: {
                    fontSize: '22',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            {
                text: '年龄段统计',
                left: '75%',
                top: '55%',
                textAlign: 'center',
                textStyle: {
                    fontSize: '22',
                    fontWeight: 'normal',
                    color: '#fff'
                }
            }
        ],
        grid: [
            {
                top: 50,
                width: '90%',
                bottom: '50%',
                left: 10,
                containLabel: true
            }
        ],
        xAxis: [
            {
                type: 'value',
                max: builderJson.all,
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
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: Object.keys(builderJson.industrydata),
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                stack: 'component',
                z: 3,
                label: {
                    position: 'right',
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    color: '#1fabfb'
                },
                data: Object.keys(builderJson.industrydata).map(function (key) {
                    return builderJson.industrydata[key];
                })
            },
            {
                type: 'pie',
                radius: [0, '30%'],
                center: ['20%', '80%'],
                label: {
                    position: 'inside',
                    minMargin: 5,
                    edgeDistance: 10,
                    lineHeight: 20,
                    fontSize: '14',
                    color: '#fff',
                    rich: {
                        time: {
                            fontSize: 14,
                            color: '#fff'
                        }
                    }
                },
                data: Object.keys(builderJson.sexdata).map(function (key) {
                    return {
                        name: key.replace('.js', ''),
                        value: builderJson.sexdata[key]
                    };
                })
            },
            {
                type: 'pie',
                radius: [0, '30%'],
                center: ['75%', '80%'],
                label: {
                    position: 'inside',
                    minMargin: 5,
                    edgeDistance: 10,
                    lineHeight: 20,
                    fontSize: '14',
                    color: '#fff',
                    rich: {
                        time: {
                            fontSize: 14,
                            color: '#fff'
                        }
                    }
                },
                data: Object.keys(builderJson.agedata).map(function (key) {
                    return {
                        name: key.replace('.js', ''),
                        value: builderJson.agedata[key]
                    };
                })
            }
        ]
    };

    createExampleCshy(option_cshy, {
        loopSeries: true
    });
}

