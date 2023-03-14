//返平区域排行

function createExampleNfp(option, tooltipOption) {
    var myChart_nfp = echarts.init(document.getElementById('nfpBox'));
    myChart_nfp.setOption(option);
    tools.loopShowTooltip(myChart_nfp, option, tooltipOption);
}

function intNFP() {
    var builderJson = [['amount', 'day']];
    var postData = {};
    var postUrl = getPostUrl("zwry-nfp");
    var successBack = function (result) {
        layer.closeAll();
        if (!!result && result.code == 200 && !!result.data) {
            $.each(result.data, function (i, item) {
                var keyarry = Object.keys(item);
                var valarry = Object.values(item);
                if (keyarry.length > 0 && valarry.length > 0) {
                    var _key = keyarry[0];
                    builderJson.push([valarry[0], _key]);
                }
            })
        }
        loadNFP(builderJson);
    }
    var errorBack = function () {
        layer.closeAll();
    }
    $.ajaxGet(postUrl, postData, successBack);
    //测试数据
    //for (var i = 1; i <= 15; i++) {
    //    builderJson.push(
    //        { name: i + '号', value: i++ }
    //    );
    //}
    //loadNFP(builderJson);
}

function loadNFP(builderJson) {
    var dataxAxis = [];
    var dataseries = [];
    if (builderJson != null) {
        $.each(builderJson, function (i, item) {
            dataxAxis.push(item.name);
            dataseries.push(item.value);
        })
    }

    var option_nfp = {
        title: {
            text: '未来15天拟返平人数',
            left: '50%',
            top: '3%',
            textAlign: 'center',
            textStyle: {
                fontSize: '22',
                fontWeight: 'normal',
                color: '#fff'
            }
        },
        dataset: {
            source: builderJson
        },
        grid: {
            top: '12%',
            width: '90%',
            bottom: '5%',
            left: 10,
            containLabel: true
        },
        xAxis: {
            name: 'amount',
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
                color: '#fff',
                fontSize: 12,
                interval: 0,
                rotate: 30
            }
        },
        yAxis: {
            type: 'category',
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
                color: '#fff',
                fontSize: 12,
                interval: 0,
                rotate: 30
            }
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 20112,
            max: 101852,
            text: ['最高', '最低'],
            textStyle: { color: '#fff'},
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'day'
                },
                label: {
                    position: 'insideRight',
                    show: true,
                    color: '#fff'
                }
            }
        ]
    };


    createExampleNfp(option_nfp, {
        loopSeries: true
    });
}

