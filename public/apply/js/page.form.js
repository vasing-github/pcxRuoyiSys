/**
* 加载行业数据，并初始化行业选择控件
* */
function iniIndustry() {
    var postUrl = getPostUrl("industry");;
    var postData = {

    };
    var successBack = function (result) {
        if (result != null && result.code == 200 && result.data != null && result.data.length>0) {
            var dataindustry = [];
            $.each(result.data, function (i, item) {
                dataindustry.push(item.dictLabel);
            })
            $("#workIndustry").picker({
                title: "请选择您从事的行业",
                cols: [
                    {
                        textAlign: 'center',
                        values: dataindustry//['服务业', '建筑业', '其他']
                    }
                ],
                onChange: function (p, v, dv) {
                    //console.log(p, v, dv);
                },
                onClose: function (p, v, d) {
                    //console.log("close");
                }
            });

        }
    }
    var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {

    }
    ajaxPost(postUrl, postData, successBack, errorBack, "正在获取数据", "get", false);
}
/**
* 初始化页面控件。具体控件参考WEUI
* */
function iniUserControl() {
    //解决表单控件不能回弹 只有微信ios有这个问题
    $("input,select,textarea").blur(function () {
        setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    })

    iniIndustry();

    $("#basePolitical").picker({
        title: "请选择您的政治面貌",
        cols: [
            {
                textAlign: 'center',
                values: ['中共党员', '中共预备党员', '共青团员', '民革党员', '民盟盟员', '民建会员', '民进会员', '农工党党员', '致公党党员', '九三学社社员', '台盟盟员', '无党派人士', '群众']
            }
        ],
        onChange: function (p, v, dv) {
            //console.log(p, v, dv);

        },
        onClose: function (p, v, d) {
            //console.log("close");
            $("#workOrganizationRelationshipAddrBox").hide();
            $("#workOrganizationRelationshipAddrInfoBox").hide();
            if (p != null && p.value != null) {
                if (p.value[0] == "中共党员" || p.value[0] == "中共预备党员") {
                    $("#workOrganizationRelationshipAddrBox").show();
                    $("#workOrganizationRelationshipAddrInfoBox").show();
                }
            }
        }
    });


    $("#baseJgAddr").cityPCPicker({
        title: "请选择您的籍贯地址",
        showDistrict: true,
        onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
        },
        onClose: function (p, v, d) {
            //console.log("close");
        }
    });
    $("#baseJzAddr").cityPCPicker({
        title: "请选择您的居住地址",
        onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
        },
        onClose: function (p, v, d) {
            //console.log("close");
        }
    });


    $("#workAddr").cityPicker({
        title: "选择您工作地址",
        onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
        }
    });

    $("#workOrganizationRelationshipAddr").cityPicker({
        title: "选择您的党组织关系所在地",
        onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
        }
    });

    $(document).on("click", "#btnSubmit", function () {
        formSubmit();
    })
}
/**
 * 初始化页面数据，修改时使用
 * */
function iniData() {
    var postUrl = getPostUrl("view");;
    var postData = {
        famerCard: rCode,
        pageNum: 1,
        pageSize: 1
    };
    var successBack = function (result) {
        $.hideLoading();
        if (result != null && result.code == 200 && result.rows != null && result.total > 0) {
            var rdata = result.rows[0];
            _famerId = rdata.famerId;
            //基础
            $("#baseName").val(rdata.famerName);
            //$('input[name="baseSex"]:checked').val(rdata.famerSex);
            switch (Number(rdata.famerSex)) {
                case 0:
                    $("#baseSex_1").attr("checked", "checked");
                    $("#baseSex_2").removeAttr("checked");
                    break;
                case 1:
                    $("#baseSex_1").removeAttr("checked");
                    $("#baseSex_2").attr("checked", "checked");
                    break;
            }
            $("#baseIdCard").val(rdata.famerCard);
            $("#basePolitical").val(rdata.famerFacepolitics);
            $("#baseTel").val(rdata.famerPhone);

            var JgAddrArry = explode(",", rdata.famerBirth);
            if (JgAddrArry != null && JgAddrArry.length >= 3) {
                $("#baseJgAddr").val(JgAddrArry[0] + " " + JgAddrArry[1] + " " + JgAddrArry[2]);
            }
            if (JgAddrArry != null && JgAddrArry.length > 3) {
                $("#baseJgAddrInfo").val(JgAddrArry[3]);
            }
            var JzAddrArry = explode(",", rdata.famerNowplace);
            if (JzAddrArry != null && JzAddrArry.length >= 3) {
                $("#baseJzAddr").val(JzAddrArry[0] + " " + JzAddrArry[1] + " " + JzAddrArry[2]);
            }
            if (JzAddrArry != null && JzAddrArry.length > 3) {
                $("#baseJzAddrInfo").val(JzAddrArry[3]);
            }

            //务工
            //$('input[name="workType"]:checked').val(rdata.famerFighttype);
            switch (Number(rdata.famerFighttype)) {
                case 0:
                    $("#workType_1").attr("checked", "checked");
                    $("#workType_2").removeAttr("checked");
                    $("#workType_3").removeAttr("checked");
                    break;
                case 1:
                    $("#workType_1").removeAttr("checked");
                    $("#workType_2").attr("checked", "checked");
                    $("#workType_3").removeAttr("checked");
                    break;
                case 2:
                    $("#workType_1").removeAttr("checked");
                    $("#workType_2").removeAttr("checked");
                    $("#workType_3").attr("checked", "checked");
                    break;
            }

            var WorkAddrArry = explode(",", rdata.famerFightplace);
            if (WorkAddrArry != null && WorkAddrArry.length >= 3) {
                $("#workAddr").val(WorkAddrArry[0] + " " + WorkAddrArry[1] + " " + WorkAddrArry[2]);
            }
            $("#workIndustry").val(rdata.famerJob);
            $("#workSpeciality").val(rdata.famerHobby);
            $("#workTechnicaltitle").val(rdata.famerTechnicaltitle);
            ///$('input[name="workIsSpecialGroup"]:checked').val(rdata.famerIsspecialperson);
            switch (rdata.famerIsspecialperson) {
                case "Y":
                    $("#workIsSpecialGroup_1").attr("checked", "checked");
                    $("#workIsSpecialGroup_2").removeAttr("checked");
                    break;
                case "N":
                    $("#workIsSpecialGroup_1").removeAttr("checked");
                    $("#workIsSpecialGroup_2").attr("checked", "checked");
                    break;
            }
            //$('input[name="workIsPreferentialGroup"]:checked').val(rdata.famerIscareperson);
            switch (rdata.workIsPreferentialGroup) {
                case "Y":
                    $("#workIsPreferentialGroup_1").attr("checked", "checked");
                    $("#workIsPreferentialGroup_2").removeAttr("checked");
                    break;
                case "N":
                    $("#workIsPreferentialGroup_1").removeAttr("checked");
                    $("#workIsPreferentialGroup_2").attr("checked", "checked");
                    break;
            }
            var OrganizationRelationshipAddrArry = explode(",", rdata.famerPartyplace);
            if (OrganizationRelationshipAddrArry != null && OrganizationRelationshipAddrArry.length >= 3) {
                $("#workOrganizationRelationshipAddr").val(OrganizationRelationshipAddrArry[0] + " " + OrganizationRelationshipAddrArry[1] + " " + OrganizationRelationshipAddrArry[2]);
            }
            if (OrganizationRelationshipAddrArry != null && OrganizationRelationshipAddrArry.length > 3) {
                $("#workOrganizationRelationshipAddrInfo").val(OrganizationRelationshipAddrArry[3]);
            }
            //$("#workOrganizationRelationshipAddr").val(rdata.famerPartyplace);
            //$("#workOrganizationRelationshipAddrInfo").val(rdata.famerPartyplace);

            if (rdata.famerFacepolitics == "中共党员" || rdata.famerFacepolitics == "中共预备党员") {
                $("#workOrganizationRelationshipAddrBox").show();
                $("#workOrganizationRelationshipAddrInfoBox").show();
            }

            iniUserControl();

        }
        else {
            $.alert("数据获取失败，请返回重试！", "系统提示", function () {
                location.href = "check.html";
            });
        }
    }
    var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
        $.hideLoading();
        $.alert("数据获取失败，请返回重试！", "系统提示", function () {
            location.href = "check.html";
        });
    }
    ajaxGet(postUrl, postData, successBack, errorBack, "正在获取数据");
}

/**
 * 提交事件
 * */
function formSubmit() {

    //基础数据
    var _baseName = $("#baseName").val();
    if (_baseName == "") {
        $.toptip("姓名不能为空！");
        return false;
    }
    var _baseSex = $('input[name="baseSex"]:checked').val();

    var _baseIdCard = $("#baseIdCard").val();
    if (_baseIdCard == "") {
        $.toptip("身份证号码不能为空！");
        return false;
    }
    if (!is_id(_baseIdCard)) {
        $.toptip("请填写正确的身份证号码");
        return false;
    }
    var _basePolitical = $("#basePolitical").val();
    if (_basePolitical == "") {
        $.toptip("请选择您的政治面貌！");
        return false;
    }
    var _baseTel = $("#baseTel").val();
    if (_baseTel == "") {
        $.toptip("联系手机号码不能为空！");
        return false;
    }
    if (!is_phone(_baseTel)) {
        $.toptip("请填写正确的手机号码");
        return false;
    }
    //var _baseJgAddr = $("#baseJgAddr").val();
    var _baseJgAddr = preg_replace(/ /, ",", $("#baseJgAddr").val());
    if (_baseJgAddr == "") {
        $.toptip("请选择您的籍贯地址！");
        return false;
    }
    //var _baseJgAddrInfo = $("#baseJgAddrInfo").val();
    //if (_baseJgAddrInfo == "") {
    //    $.toptip("请填写详细籍贯地址！");
    //    return false;
    //}
    var _baseJzAddr = preg_replace(/ /, ",", $("#baseJzAddr").val());
    if (_baseJzAddr == "") {
        $.toptip("请选择您长期居住地址！");
        return false;
    }
    var _baseJzAddrInfo = $("#baseJzAddrInfo").val();
    if (_baseJzAddrInfo == "") {
        $.toptip("请填写详细长期居住地址！");
        return false;
    }


    //务工数据
    var _workType = $('input[name="workType"]:checked').val();
    var _workAddr = preg_replace(/ /, ",", $("#workAddr").val());
    if (_workAddr == "") {
        $.toptip("请选择您的工作地址！");
        return false;
    }
    var _workIndustry = $("#workIndustry").val();
    if (_workIndustry == "") {
        $.toptip("请选择您从事行业！");
        return false;
    }
    var _workSpeciality = $("#workSpeciality").val();
    var _workTechnicaltitle = $("#workTechnicaltitle").val();
    var _workIsSpecialGroup = $('input[name="workIsSpecialGroup"]:checked').val();
    var _workIsPreferentialGroup = $('input[name="workIsPreferentialGroup"]:checked').val();
    var _workOrganizationRelationshipAddr = preg_replace(/ /, ",", $("#workOrganizationRelationshipAddr").val());
    var _workOrganizationRelationshipAddrInfo = $("#workOrganizationRelationshipAddrInfo").val();
    if (_basePolitical == "中共党员" || _basePolitical == "中共预备党员") {
        if (_workOrganizationRelationshipAddr == "") {
            $.toptip("请选择您的工作地址！");
            return false;
        }
        if (_workOrganizationRelationshipAddrInfo == "") {
            $.toptip("请填写党组织详细地址！");
            return false;
        }
    } else {
        _workOrganizationRelationshipAddr = "";
        _workOrganizationRelationshipAddrInfo = "";
    }

    var postUrl = "";
    var rType = "post";
    if (rCode != null && rCode != "" && rCode.length > 0) {
        postUrl = getPostUrl("edit");
        rType = "put";
    } else {
        postUrl = getPostUrl("add");
    }
    var postData = {
        famerId: _famerId,
        famerName: _baseName,
        famerSex: _baseSex,
        famerCard: _baseIdCard,
        famerFacepolitics: _basePolitical,
        famerPhone: _baseTel,
        famerBirth: _baseJgAddr,// + _baseJgAddrInfo
        famerNowplace: _baseJzAddr + "," + _baseJzAddrInfo,
        famerFighttype: _workType,
        famerFightplace: _workAddr,
        famerJob: _workIndustry,
        famerHobby: _workSpeciality,
        famerTechnicaltitle: _workTechnicaltitle,
        famerIsspecialperson: _workIsSpecialGroup,
        famerIscareperson: _workIsPreferentialGroup,
        famerPartyplace: _workOrganizationRelationshipAddr + "," + _workOrganizationRelationshipAddrInfo
    };
    var successBack = function (result) {
        $.hideLoading();
        if (result != null && result.code == 200) {
            location.href = "success.html";
        }
        else {
            $.toptip('数据提交失败', 'error')
        }
    }
    var errorBack = function (XMLHttpRequest, textStatus, errorThrown) {
        $.hideLoading();
        $.toast("数据提交失败", "forbidden");
    }
    ajaxPost(postUrl, JSON.stringify(postData), successBack, errorBack, "正在提交数据", rType);
}