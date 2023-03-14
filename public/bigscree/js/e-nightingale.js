function createExampleSfzb(option, tooltipOption) {
    var myChart_sfzb = echarts.init(document.getElementById('bjl'));
    myChart_sfzb.setOption(option);
    tools.loopShowTooltip(myChart_sfzb, option, tooltipOption);
}
function loadJtType(dataList) {

    var option_sfzb = {
        title: {
            text: '使用交通工具',
            left: 'center',
            top: 10,
            textStyle: {
                color: '#fff',
                fontSize: '28',
                fontWeight: 'normal',
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: 'center',
            textStyle: {
                color: '#fff',
                //fontSize: '22',
                fontWeight: 'normal',
            }
        },
        series: [
            {
                name: '交通工具：',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                //itemStyle: {
                //    borderRadius: 10,
                //    borderColor: '#fff',
                //    borderWidth: 2
                //},
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: dataList
            }
        ]
    };

    createExampleSfzb(option_sfzb, {
        loopSeries: true
    });
}

