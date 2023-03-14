//基础参数
var mytextStyle = {
    color: "#fff",                //文字颜色
    fontStyle: "normal",         //italic斜体  oblique倾斜
    fontWeight: "100",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
    fontFamily: "microsoft yahei",    //字体系列
    fontSize: 14,                  //字体大小
};
var mytextHoverStyle = {
    color: "#fff",                //文字颜色
    fontStyle: "normal",         //italic斜体  oblique倾斜
    fontWeight: "bold",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
    fontFamily: "microsoft yahei",    //字体系列
    fontSize: 20,                  //字体大小
};
var mylineStyle = {
    color: "#333",               //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
    shadowColor: "red",          //阴影颜色
    shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
    shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
    shadowBlur: 10,              //图形阴影的模糊大小。
    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
    width: 1,                    //坐标轴线线宽
    opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
};
var myareaStyle = {
    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],//分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
    shadowColor: "red",          //阴影颜色
    shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
    shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
    shadowBlur: 10,              //图形阴影的模糊大小。
    opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
};
var myitemStyle = {
    color: "red",                 //颜色
    borderColor: "#fff",         //边框颜色
    borderWidth: 1,               //柱条的描边宽度，默认不描边。
    borderType: "solid",         //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
    barBorderRadius: 1,          //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
    shadowBlur: 5,               //图形阴影的模糊大小。
    shadowColor: "#fff",         //阴影颜色
    shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
    shadowOffsetY: 0,            //阴影垂直方向上的偏移距离。
    opacity: 0.8,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
    areaColor: '#4792e5'
};
var myitemHoverStyle = {
    color: "#fff",                 //颜色
    borderColor: "#fff",         //边框颜色
    borderWidth: 0,               //柱条的描边宽度，默认不描边。
    borderType: "solid",         //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
    barBorderRadius: 0,          //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
    shadowBlur: 50,               //图形阴影的模糊大小。
    shadowColor: "#000",         //阴影颜色
    shadowOffsetX: -3,            //阴影水平方向上的偏移距离。
    shadowOffsetY: 5,            //阴影垂直方向上的偏移距离。
    opacity: 1,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
    areaColor: '#e32429'
};
var mylabel = {
    show: false,                  //是否显示标签。
    position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
    offset: [30, 40],             //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
    formatter: '{b}: {c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
    textStyle: mytextStyle
};
var mypoint = {
    symbol: "pin",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
    symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
    symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
    silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    label: {
        normal: mylabel,
        emphasis: mylabel
    },
    itemStyle: {
        normal: myitemStyle,
        emphasis: myitemStyle
    }
};
var myline = {
    symbol: ["pin", "circle"],    //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
    precision: 2,                //标线数值的精度，在显示平均值线的时候有用。
    silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    label: {
        normal: mylabel,
        emphasis: mylabel
    },
    lineStyle: {
        normal: mylineStyle,
        emphasis: mylineStyle
    }
};
var myarea = {
    silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    label: {
        normal: mylabel,
        emphasis: mylabel
    },
    itemStyle: {
        normal: myitemStyle,
        emphasis: myitemStyle
    }
};

function createExampleMap(option, tooltipOption) {
    var myChart_map = echarts.init(document.getElementById('mapcontainer'));
    myChart_map.setOption(option);
    tools.loopShowTooltip(myChart_map, option, tooltipOption);
}


function intChinaMap() {
    var postData = {};
    var postUrl = getPostUrl("zwry-map");
    var successBack = function (result) {
        layer.closeAll();
        var mapData = [];// [{ name: '西藏自治区', value: 10, bvalue: 6 }, { name: '新疆维吾尔自治区', value: 10, bvalue: 6 }];
        if (!!result && result.code == 200 && !!result.data) {
            $.each(result.data, function (i, item) {
                var keyarry = Object.keys(item);
                var valarry = Object.values(item);
                if (keyarry.length > 0 && valarry.length > 0) {
                    mapData.push({ name: keyarry[0], value: valarry[0], bvalue: 0 });
                }
            })
        }
        loadChinaMap(mapData);
        loadOutArea(mapData);
    }
    var errorBack = function () {
        layer.closeAll();
    }
    $.ajaxGet(postUrl, postData, successBack);
    //var mapData = [{ name: '西藏自治区', value: 10, bvalue: 6 }, { name: '新疆维吾尔自治区', value: 10, bvalue: 6 }];
    //loadChinaMap(mapData);
}

function loadChinaMap(dataList) {
    var minNumber = 0;
    var maxNumber = 10;
    if (!!dataList && dataList.length > 0) {
        for (var i = 0; i < dataList.length; i++) {
            var cdata = dataList[i];
            if (Number(cdata.value) < minNumber) {
                minNumber = Number(cdata.value);
            }
            if (Number(cdata.value) > maxNumber) {
                maxNumber = Number(cdata.value);
            }
        }
    }
    var mapdata = dataList;
    $.get('json/china.json?v=20201021', function (usaJson) {
        echarts.registerMap('CHINA', usaJson);
        var option = {

            tooltip: {
                trigger: 'item',
                //formatter: '总共办理{c}件'
                //trigger: 'item',
                //showDelay: 0,
                //transitionDuration: 0.2,
                //backgroundColor: '#ffffff',
                //padding: 10,
                //extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                //textStyle: {
                //    color: 'gray',
                //},
                formatter: function (params) {
                    var rHtml = "";
                    if (!!params.data) {
                        rHtml = params.data.name + '：<br />在外平昌人' + params.data.value + '人';// <br />已返回' + params.data.bvalue + '人，尚未返回' + (params.data.value - params.data.bvalue) + '人';
                    } else {
                        rHtml = params.data.name + "：<br />在外平昌人0人";//<br />已返回0人，尚未返回0人
                    }
                    return rHtml;
                },
                textStyle: {
                    fontSize: 20
                }
            },
            visualMap: {
                min: minNumber,
                max: maxNumber,
                showLabel: true,
                itemWidth: 20,                           //图形的宽度，即长条的宽度。
                itemHeight: 100,
                left: "0%",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
                bottom: "0%",
                textStyle: {
                    color: "#fff",                 //颜色
                },
                inRange: {
                    color: ['#4792e5', '#f2954f', '#fcca72', '#fce98c', '#f8f5a4', '#def1c1', '#bde1df', '#9cd0f1', '#83c6ee', '#6ebdd3', '#5bb6b0', '#4eb196']
                },
                text: [maxNumber, minNumber],
                calculable: false,
                backgroundColor: "transparent"//标题背景色
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'left',
                top: 'top',
                feature: {
                    dataView: { readOnly: true },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '区域分布',
                    type: 'map',
                    map: 'CHINA',
                    zoom: 1.25,//放大比例
                    label: {                                     //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                        normal: {
                            show: true,                          //是否在普通状态下显示标签。
                            textStyle: mytextStyle,              //普通状态下的标签文本样式。
                        },
                        emphasis: {
                            show: true,                         //是否在高亮状态下显示标签。
                            textStyle: mytextHoverStyle              //高亮状态下的标签文本样式。
                        }
                    },
                    itemStyle: {                                 //地图区域的多边形 图形样式
                        normal: myitemStyle,
                        emphasis: myitemHoverStyle
                    },
                    // 文本位置修正
                    //textFixed: {
                    //    Alaska: [20, -20]
                    //},
                    data: mapdata
                }
            ]
        };
        createExampleMap(option, {
            loopSeries: true
        });
    });
}




