var countTimeInterval = null;
var touchTime = new Date().getTime();
var touchNum=0;
(function ($) {
    $.extend({
        initYYPHClientSize: function () {
            var ClientSize = $.getBrowserSize();
            $("#ph_cont").css({ width: ClientSize.clientWidth + "px", height: ClientSize.clientHeight + "px" });
            $.shieldInit();
        },
        //获取浏览器可用尺寸
        getBrowserSize: function () {
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;

            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;

            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {

                //IE 4 compatible
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            return { clientWidth: myWidth, clientHeight: myHeight }
        },
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //加载键盘信息
        LoadKeyboard: function (id) {
            //xfjianpan(id),当id为input的id，如果id==false时，键盘隐藏
            $("#" + id).val("");
            var jpnub = $("#xfjp td").length;
            //move("jianpan");        //开启键盘可移动
            $("#xfjp td").unbind("click");
            if (id != false) {
                $("#jianpan").show();
                var xfjp_text = $("#" + id).val();                        //获取input框当前的val值
                $(".input_on").removeClass("input_on");
                $("#" + id).addClass("input_on");                         //设置input框选中时的样式
                $("#jptitle").html($("#" + id).attr("placeholder"));      //键盘标题，自动获取input的placeholder值
                $("#xfjp td").click(function () {
                    var click = $(this).html();                         //获取点击按键的内容
                    //特殊按键在这添加事件
                    //判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
                    var curPosition = $.getTxtCursorPosition(id);
                    if (click == "清空") {
                        xfjp_text = "";
                        $("#" + id).val(xfjp_text);
                    } else if (click == "shift") {
                        for (i = 0; i < jpnub; i++) {
                            $("#xfjp td:eq(" + i + ")").html($("#xfjp td:eq(" + i + ")").html().toUpperCase());
                        }
                    } else if (click == "SHIFT") {
                        for (i = 0; i < jpnub; i++) {
                            $("#xfjp td:eq(" + i + ")").html($("#xfjp td:eq(" + i + ")").html().toLowerCase());
                        }
                    } else if (click == "空格") {
                        xfjp_text = xfjp_text + " ";
                        $("#" + id).val(xfjp_text);
                    } else if (click == "退格") {
                        if (curPosition == xfjp_text.length) {
                            xfjp_text = xfjp_text.substr(0, xfjp_text.length - 1);
                        } else {
                            var txt1 = xfjp_text.substr(0, curPosition - 1);
                            var txt2 = xfjp_text.substr(curPosition, xfjp_text.length);
                            xfjp_text = txt1 + txt2;

                        }
                        $.setCursorPosition($("#" + id), curPosition - 1);
                        $("#" + id).val(xfjp_text);
                    } else {
                        if (curPosition == xfjp_text.length) {
                            xfjp_text = xfjp_text + click;
                        } else {
                            var txt1 = xfjp_text.substr(0, curPosition);
                            var txt2 = xfjp_text.substr(curPosition, xfjp_text.length);
                            xfjp_text = txt1 + click + txt2;
                        }
                        $.setCursorPosition($("#" + id), curPosition + 1);
                        $("#" + id).val(xfjp_text);
                    }
                    $("#" + id).focus();
                })
            } else {
                $(".input_on").removeClass("input_on");                    //移除选中input的选中样式
                $("#jianpan").hide();
            }
        },
        //键盘函数：获取光标所在位置
        getTxtCursorPosition: function (tagId) {
            var $input = document.getElementById(tagId);
            var cursurPosition = 0;
            if ($input.selectionStart) {//非IE
                cursurPosition = $input.selectionStart;
            } else {//IE
                try {
                    var range = document.selection.createRange();
                    range.moveStart("character", -$input.value.length);
                    cursurPosition = range.text.length;
                } catch (e) {
                    cursurPosition = $input.value.length;
                }
            }
            return cursurPosition;//打印当前索引
        },
        //键盘函数：设置光标位置
        setCursorPosition: function (elem, index) {
            var val = elem.val();
            var len = val.length
            if (len < index) return
            setTimeout(function () {
                elem.focus()
                if (elem[0].setSelectionRange) { // 标准浏览器
                    elem[0].setSelectionRange(index, index)
                } else { // IE9-
                    var range = elem[0].createTextRange()
                    range.moveStart("character", -len)
                    range.moveEnd("character", -len)
                    range.moveStart("character", index)
                    range.moveEnd("character", 0)
                    range.select()
                }
            }, 10)
        },
        ajaxPost: function (url, params, success, error, loadtxt) {
            var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
                layer.closeAll();
                //$.debug(textStatus);
            };
            if (!!error) {
                errorBack = error;
            }
            $.ajax({
                url: url,
                data: params,
                type: "post",
                dataType: "json",
                success: success,
                error: errorBack,
                beforeSend: function () {
                    //layer.open({ type: 2 });
                },
                complete: function () {

                }
            });
        },
        ajaxGet: function (url, params, success, error, loadtxt) {
            var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
                layer.closeAll();
                //$.debug(textStatus);
            };
            if (!!error) {
                errorBack = error;
            }
            $.ajax({
                url: url,
                data: params,
                type: "get",
                dataType: "json",
                success: success,
                error: errorBack,
                beforeSend: function () {
                    //layer.open({ type: 2 });
                },
                complete: function () {

                }
            });
        },
        ajaxPostNoAsync: function (url, params, success, error, loadtxt) {
            var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
                layer.closeAll();
                //$.debug(textStatus);
            };
            if (!!error) {
                errorBack = error;
            }
            $.ajax({
                url: url,
                data: params,
                type: "post",
                async: false,
                dataType: "json",
                success: success,
                error: errorBack,
                beforeSend: function () {
                   // layer.open({ type: 2 });
                },
                complete: function () {

                }
            });
        },
        ajaxPostNoLoad: function (url, params, success, error, loadtxt) {
            var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
                layer.closeAll();
                //$.debug(textStatus);
            };
            if (!!error) {
                errorBack = error;
            }
            $.ajax({
                url: url,
                data: params,
                type: "post",
                dataType: "json",
                success: success,
                error: errorBack,
                complete: function () {

                }
            });
        },
        queryParams: function (url, name) {
            var strHref = url;
            var intPos = strHref.indexOf("?");
            var strRight = strHref.substr(intPos + 1);
            var arrTmp = strRight.split("&");
            for (var i = 0; i < arrTmp.length; i++) {
                var arrTemp = arrTmp[i].split("=");
                if (arrTemp[0].toUpperCase() == name.toUpperCase()) return arrTemp[1];
            }
            return "";
        },
        //身份证号合法性验证 
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        isCardNum: function (code) {
            var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
            var tip = "";
            var pass = true;
            //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
            if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                tip = "身份证号格式错误";
                pass = false;
            }

            else if (!city[code.substr(0, 2)]) {
                tip = "地址编码错误";
                pass = false;
            }
            else {
                //18位身份证需要验证最后一位校验位
                if (code.length == 18) {
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    //校验位
                    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++) {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if (parity[sum % 11] != code[17]) {
                        tip = "校验位错误";
                        pass = false;
                    }
                }
            }
            //if (!pass) alert(tip);
            return pass;
        },
        isPhone: function (phone) {
            if ((/^1[345789]\d{9}$/.test(phone))) {
                return true;
            }
            return false;
        },
        shieldInit: function () {
            //屏蔽鼠标右键、Ctrl+N、Shift+F10、F11、F5刷新、退格键
            document.oncontextmenu = function () {
                event.cancelBubble = true
                event.returnValue = false;
                return false;
            }//屏蔽鼠标右键     
            window.onhelp = function () { return false; }//屏蔽F1帮助     
            document.onkeydown = function () {
                if ((window.event.altKey) &&
                    ((window.event.keyCode == 37) ||       //屏蔽   Alt+   方向键   ←     
                        (window.event.keyCode == 39))) {     //屏蔽   Alt+   方向键   →     
                    event.returnValue = false;
                    return false;
                }
        		/* 注：这还不是真正地屏蔽Alt+方向键，     
                　　　　因为Alt+方向键弹出警告框时，按住Alt键不放，     
                　　　　用鼠标点掉警告框，这种屏蔽方法就失效了。*/
                if (
                    //(event.keyCode == 27) ||                                 //屏蔽Esc键
                    //(event.keyCode == 8) ||                                 //屏蔽退格删除键     
                    (event.keyCode == 116) ||                             //屏蔽   F5   刷新键     
                    (event.ctrlKe && event.keyCode == 82)) {              //Ctrl   +   R     
                    event.keyCode = 0;
                    event.returnValue = false;
                    return false;
                }
                if (event.keyCode == 122) {
                    event.keyCode = 0;
                    event.returnValue = false;
                    return false;
                }         //屏蔽F11     
                if (event.ctrlKey && event.keyCode == 78) {
                    event.cancelBubble = true
                    event.returnValue = false;
                    return false;
                }    //屏蔽Ctrl+n     
                if (event.shiftKey && event.keyCode == 121) {
                    event.cancelBubble = true
                    event.returnValue = false;
                    return false;
                };     //屏蔽shift+F10     
                if (window.event.srcElement.tagName == "A" && window.event.shiftKey) {
                    //屏蔽shift加鼠标左键新开一网页     
                    window.event.cancelBubble = true
                    window.event.returnValue = false;
                    return false;
                }
                if ((window.event.altKey) && (window.event.keyCode == 115)) {              //屏蔽Alt+F4     
                    window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");
                    return false;
                }
            }
        },
        dialogAlert: function (txt, okback) {
            var yesBack = function (index) {
                layer.close(index);
            };
            if (!!okback) {
                yesBack = okback;
            }
            layer.open({
                content: txt,
                btn: '我知道了',
                shadeClose: false,
                yes: yesBack
            });
        },
        dialogConfirm: function (txt, okback, cancleback, okTitle, cancleTitle) {
            var yesBack = function (index) {
                layer.close(index);
            },
                noBack = function (index) {
                    layer.close(index);
                };
            if (!!okback) {
                yesBack = okback;
            }
            if (!!cancleback) {
                noBack = cancleback;
            }
            layer.open({
                content: txt
                , btn: [okTitle, cancleTitle]
                , shadeClose: false
                , yes: yesBack
                , no: cancleback
            });
        }
    }),
        $.fn.extend({
            //倒计时
            countDownInit: function (url) {
                clearInterval(countTimeInterval);
                var cobj = $(this);
                var CountDownDiyCount = function () {
                    if (Number($(cobj).text()) > 0) {
                        $(cobj).text(Number($(cobj).text()) - 1);
                    } else {
                        location.href = url;
                    }
                }
                countTimeInterval = setInterval(CountDownDiyCount, 1000);
            },
            //展示当前时间
            showDateTime: function () {
                try {
                    var cobj = $(this);
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var RefreshTime = function () {
                        var time = new Date();
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        var date = time.getDate();
                        var day = time.getDay();
                        var hour = time.getHours();
                        var minutes = time.getMinutes();
                        var second = time.getSeconds();
                        month = month + 1;
                        month < 10 ? month = '0' + month : month;
                        hour < 10 ? hour = '0' + hour : hour;
                        minutes < 10 ? minutes = '0' + minutes : minutes;
                        second < 10 ? second = '0' + second : second;
                        var now_time = '' + year + '年' + month + '月' + date + '日' + '&nbsp;&nbsp;' + hour + ':' + minutes + ':' + second + '&nbsp;&nbsp;' + show_day[day];
                        $(cobj).html(now_time);
                    }
                    setInterval(RefreshTime, 1000);
                } catch (e) { }
            },
            //展示当前时间
            showDtdsDateTime: function () {
                try {
                    var cobj = $(this);
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var RefreshTime = function () {
                        var time = new Date();
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        var date = time.getDate();
                        var day = time.getDay();
                        var hour = time.getHours();
                        var minutes = time.getMinutes();
                        var second = time.getSeconds();
                        month = month + 1;
                        month < 10 ? month = '0' + month : month;
                        hour < 10 ? hour = '0' + hour : hour;
                        minutes < 10 ? minutes = '0' + minutes : minutes;
                        second < 10 ? second = '0' + second : second;
                        var now_time = '';// + year + '年' + month + '月' + date + '日' + '&nbsp;&nbsp;' + hour + ':' + minutes + ':' + second + '&nbsp;&nbsp;' + show_day[day];
                        now_time += '<p class="f-1">' + show_day[day] + '</p>';
                        now_time += '<p class="f-0">' + year + '/' + month + '/' + date + '</p>';
                        now_time += '<p class="f-2">' + hour + ':' + minutes + '</p>';
                        $(cobj).html(now_time);
                    }
                    setInterval(RefreshTime, 1000);
                } catch (e) { }
            },
            //展示当前时间
            showZzblDateTime: function () {
                try {
                    var cobj = $(this);
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var RefreshTime = function () {
                        var time = new Date();
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        var date = time.getDate();
                        var day = time.getDay();
                        var hour = time.getHours();
                        var minutes = time.getMinutes();
                        var second = time.getSeconds();
                        month = month + 1;
                        month < 10 ? month = '0' + month : month;
                        hour < 10 ? hour = '0' + hour : hour;
                        minutes < 10 ? minutes = '0' + minutes : minutes;
                        second < 10 ? second = '0' + second : second;
                        var now_time = '';// + year + '年' + month + '月' + date + '日' + '&nbsp;&nbsp;' + hour + ':' + minutes + ':' + second + '&nbsp;&nbsp;' + show_day[day];
                        now_time += '<span>' + show_day[day] + '<br />' + year + '-' + month + '-' + date + '</span>';
                        now_time += '<span>' + hour + ':' + minutes + '</span>';
                        $(cobj).html(now_time);
                    }
                    setInterval(RefreshTime, 1000);
                } catch (e) { }
            },
            //展示当前时间
            showZzblIndexDateTime: function () {
                try {
                    var cobj = $(this);
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var RefreshTime = function () {
                        var time = new Date();
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        var date = time.getDate();
                        var day = time.getDay();
                        var hour = time.getHours();
                        var minutes = time.getMinutes();
                        var second = time.getSeconds();
                        month = month + 1;
                        month < 10 ? month = '0' + month : month;
                        hour < 10 ? hour = '0' + hour : hour;
                        minutes < 10 ? minutes = '0' + minutes : minutes;
                        second < 10 ? second = '0' + second : second;
                        var now_time = '<span>' + hour + ':' + minutes + '</span>' + year + '-' + month + '-' + date + '&nbsp;&nbsp;' + show_day[day] + '';// + year + '年' + month + '月' + date + '日' + '&nbsp;&nbsp;' + hour + ':' + minutes + ':' + second + '&nbsp;&nbsp;' + show_day[day];
                        $(cobj).html(now_time);
                    }
                    setInterval(RefreshTime, 1000);
                } catch (e) { }
            }
        }),
        $.wdsStorage = {
            //设置
            Set: function (key, val) {//存储信息
                if (!window.localStorage) {
                    top.$.cookie(key, val, { path: "/", expires: 7 });
                } else {
                    var storage = window.localStorage;
                    storage.setItem(key, val);
                }
            },
            //获取
            Get: function (key) {//获取key对应的值
                var rData = "";
                if (!window.localStorage) {
                    rData = top.$.cookie(key);
                } else {
                    var storage = window.localStorage;
                    rData = storage.getItem(key);
                }
                return rData;
            },
            //删除
            Remove: function (key) {
                if (!window.localStorage) {
                    top.$.cookie(key, '', { path: "/", expires: -1 });
                } else {
                    var storage = window.localStorage;
                    storage.removeItem(key);
                }
            }
        };
}(jQuery))