<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="父栏目id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入父栏目id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="列表or网页" prop="meneorhtml">
        <el-select v-model="queryParams.meneorhtml" placeholder="请选择列表or网页" clearable>
          <el-option
            v-for="dict in dict.type.reportmeneorhtml"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称" prop="menuName">
        <el-input
          v-model="queryParams.menuName"
          placeholder="请输入栏目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="显示顺序" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入显示顺序"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          v-model="queryParams.icon"
          placeholder="请输入图标"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="背景色" prop="bgcolor">
        <el-input
          v-model="queryParams.bgcolor"
          placeholder="请输入背景色"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
	    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['report:reportEdit:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="reportEditList"
      row-key="menuId"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="父栏目id" align="center" prop="parentId" />
      <el-table-column label="列表or网页" align="center" prop="meneorhtml">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.reportmeneorhtml" :value="scope.row.meneorhtml"/>
        </template>
      </el-table-column>
      <el-table-column label="菜单id" align="center" prop="menuId" />
      <el-table-column label="栏目名称" align="center" prop="menuName" />
      <el-table-column label="显示顺序" align="center" prop="orderNum" />
       <el-table-column prop="icon" label="图标" align="center" width="100">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="背景色" align="center" prop="bgcolor" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['report:reportEdit:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['report:reportEdit:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['report:reportEdit:remove']"
          >删除</el-button>
          <el-button
            v-if="scope.row.parentId === 0"
            size="mini"
            type="text"
            icon="el-icon-picture"
            @click="creatQrCode(scope.row.menuId)"
          >二维码</el-button>
         
        </template>
      </el-table-column>
    </el-table>
   
      <el-dialog  :title="qrlog.tit" :visible.sync="qrlog.open" width="300px" >
              <div v-if="qrlog.open" class="qrcode" ref="qrCodeUrl"></div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" >确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>


    <!-- 添加或修改栏目内容编辑对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父栏目id" prop="parentId">
          <treeselect v-model="form.parentId" :options="reportEditOptions" :normalizer="normalizer" placeholder="请选择父栏目id" />
        </el-form-item>
        <el-form-item label-width="100px" label="列表or网页" >
          <el-radio-group v-model="form.meneorhtml">
            <el-radio
              v-for="dict in dict.type.reportmeneorhtml"
              :key="dict.value"
              :label="dict.value"
             
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="栏目名称" prop="menuName">
          <el-input v-model="form.menuName" placeholder="请输入栏目名称" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
        </el-form-item>
        
            <el-form-item label="菜单图标" prop="icon">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
        
        <el-form-item label="背景色" prop="bgcolor">

        <el-color-picker v-model="form.bgcolor"  @change="selectChange"></el-color-picker>
        </el-form-item>
        <el-form-item v-show="form.meneorhtml ==='1'" label="富文本内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listReportEdit, getReportEdit, delReportEdit, addReportEdit, updateReportEdit } from "@/api/report/reportEdit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";

import QRCode from "qrcodejs2/";



export default {
  name: "ReportEdit",
  components: { Treeselect, IconSelect, QRCode },
  dicts: ['reportmeneorhtml'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 栏目内容编辑表格数据
      reportEditList: [],
      // 栏目内容编辑树选项
      reportEditOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        parentId: null,
        meneorhtml: null,
        menuName: null,
        orderNum: null,
        icon: null,
        bgcolor: null,
        content: null
      },
      // 表单参数
      form: {
       
      },
      // 表单校验
      rules: {
      },
      qrcode: null,
      qrlog:{
        tit:"",
        open:false,

      },
   
    };
  },
  created() {
    this.getList();
  },
  methods: {
    
    creatQrCode(id) {
      
      console.log('http://10.164.163.39:8888/firstpage/'+id)
      this.qrlog.open = true;
      this.qrlog.tit = "二维码";
      setTimeout(() => {
        this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: 'http://10.164.163.39:8888/firstpage/'+id, // 需要转换为二维码的内容
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
      }, 500);
                
    },

    selectChange(value) {
      this.form.bgcolor = value;
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询栏目内容编辑列表 */
    getList() {
      this.loading = true;
      listReportEdit(this.queryParams).then(response => {
        this.reportEditList = this.handleTree(response.data, "menuId", "parentId");
        this.loading = false;
      });
    },
    /** 转换栏目内容编辑数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      };
    },
	/** 查询栏目内容编辑下拉树结构 */
    getTreeselect() {
      listReportEdit().then(response => {
        this.reportEditOptions = [];
        const data = { menuId: 0, menuName: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "menuId", "parentId");
        this.reportEditOptions.push(data);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.qrlog.open = false;
      this.qrcode = '';
      console.log(this.qrcode)
    },

    // 表单重置
    reset() {
      this.form = {
        parentId: null,
        meneorhtml: "0",
        menuId: null,
        menuName: null,
        orderNum: null,
        icon: undefined,
        bgcolor: null,
        content: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.menuId) {
        this.form.parentId = row.menuId;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加栏目内容编辑";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentId = row.menuId;
      }
      getReportEdit(row.menuId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改栏目内容编辑";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.menuId != null) {
            updateReportEdit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReportEdit(this.form).then(response => {
             
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              
            
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除栏目内容编辑编号为"' + row.menuId + '"的数据项？').then(function() {
        return delReportEdit(row.menuId);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
