<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="famerName">
        <el-input
          v-model="queryParams.famerName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号码" prop="famerCard">
        <el-input
          v-model="queryParams.famerCard"
          placeholder="请输入身份证号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="famerPhone">
        <el-input
          v-model="queryParams.famerPhone"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="政治面貌" prop="famerFacepolitics">
        <el-input
          v-model="queryParams.famerFacepolitics"
          placeholder="请输入政治面貌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="现户籍地址" prop="famerNowplace">
        <el-input
          v-model="queryParams.famerNowplace"
          placeholder="请输入现户籍地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="现工作地址" prop="famerFightplace">
        <el-input
          v-model="queryParams.famerFightplace"
          placeholder="请输入现工作地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="历史工作记录" prop="famerFighthistory">
        <el-input
          v-model="queryParams.famerFighthistory"
          placeholder="请输入历史工作记录"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作类型" prop="famerFighttype">
        <el-select v-model="queryParams.famerFighttype" placeholder="请选择工作类型" clearable>
          <el-option
            v-for="dict in dict.type.sys_famer_fighttype"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="从事何业" prop="famerJob">
        <el-select v-model="queryParams.famerJob" placeholder="请选择从事何业" clearable>
          <el-option
            v-for="dict in dict.type.sys_farmer_industry"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="有何特长" prop="famerHobby">
        <el-input
          v-model="queryParams.famerHobby"
          placeholder="请输入有何特长"
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
          v-hasPermi="['farmer:farmer:add']"
        >新增</el-button>
      </el-col>
      
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['farmer:farmer:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['farmer:farmer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['farmer:farmer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="farmerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="famerId" />
      <el-table-column label="姓名" align="center" prop="famerName" />
      <el-table-column label="性别" align="center" prop="famerSex">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.famerSex"/>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" align="center" prop="famerCard" />
      <el-table-column label="电话" align="center" prop="famerPhone" />
      <el-table-column label="政治面貌" align="center" prop="famerFacepolitics" />
      <el-table-column label="籍贯地址" align="center" prop="famerBirth" />
      <el-table-column label="现户籍地址" align="center" prop="famerNowplace" />
      <el-table-column label="现工作地址" align="center" prop="famerFightplace" />
      <el-table-column label="历史工作记录" align="center" prop="famerFighthistory" />
      <el-table-column label="工作类型" align="center" prop="famerFighttype">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_famer_fighttype" :value="scope.row.famerFighttype"/>
        </template>
      </el-table-column>
      <el-table-column label="从事何业" align="center" prop="famerJob">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_farmer_industry" :value="scope.row.famerJob"/>
        </template>
      </el-table-column>
      <el-table-column label="具体岗位" align="center" prop="famerJobpost" />
      <el-table-column label="有何特长" align="center" prop="famerHobby" />
      <el-table-column label="技术职称" align="center" prop="famerTechnicaltitle" />
      <el-table-column label="是否特殊人群" align="center" prop="famerIsspecialperson">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.famerIsspecialperson"/>
        </template>
      </el-table-column>
      <el-table-column label="是否优抚对象" align="center" prop="famerIscareperson">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.famerIscareperson"/>
        </template>
      </el-table-column>
      <el-table-column label="党组织所在地" align="center" prop="famerPartyplace" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['farmer:farmer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['farmer:farmer:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改农民工信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="famerName">
          <el-input v-model="form.famerName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="famerSex">
          <el-select v-model="form.famerSex" placeholder="请选择性别">
            <el-option
              v-for="dict in dict.type.sys_user_sex"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码" prop="famerCard">
          <el-input v-model="form.famerCard" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="电话" prop="famerPhone">
          <el-input v-model="form.famerPhone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="famerFacepolitics">
          <el-input v-model="form.famerFacepolitics" placeholder="请输入政治面貌" />
        </el-form-item>
        <el-form-item label="籍贯地址" prop="famerBirth">
          <el-input v-model="form.famerBirth" placeholder="请输入籍贯地址" />
        </el-form-item>
        <el-form-item label="现户籍地址" prop="famerNowplace">
          <el-input v-model="form.famerNowplace" placeholder="请输入现户籍地址" />
        </el-form-item>
        <el-form-item label="现工作地址" prop="famerFightplace">
          <el-input v-model="form.famerFightplace" placeholder="请输入现工作地址" />
        </el-form-item>
        <el-form-item label="历史工作记录" prop="famerFighthistory">
          <el-input v-model="form.famerFighthistory" placeholder="请输入历史工作记录" />
        </el-form-item>
        <el-form-item label="工作类型" prop="famerFighttype">
          <el-select v-model="form.famerFighttype" placeholder="请选择工作类型">
            <el-option
              v-for="dict in dict.type.sys_famer_fighttype"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从事何业" prop="famerJob">
          <el-select v-model="form.famerJob" placeholder="请选择从事何业">
            <el-option
              v-for="dict in dict.type.sys_farmer_industry"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体岗位" prop="famerJobpost">
          <el-input v-model="form.famerJobpost" placeholder="请输入具体岗位" />
        </el-form-item>
        <el-form-item label="有何特长" prop="famerHobby">
          <el-input v-model="form.famerHobby" placeholder="请输入有何特长" />
        </el-form-item>
        <el-form-item label="技术职称" prop="famerTechnicaltitle">
          <el-input v-model="form.famerTechnicaltitle" placeholder="请输入技术职称" />
        </el-form-item>
        <el-form-item label="是否特殊人群" prop="famerIsspecialperson">
          <el-select v-model="form.famerIsspecialperson" placeholder="请选择是否特殊人群">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否优抚对象" prop="famerIscareperson">
          <el-select v-model="form.famerIscareperson" placeholder="请选择是否优抚对象">
            <el-option
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="党组织所在地" prop="famerPartyplace">
          <el-input v-model="form.famerPartyplace" placeholder="请输入党组织所在地" />
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
import { listFarmer, getFarmer, delFarmer, addFarmer, updateFarmer } from "@/api/farmer/farmer";

export default {
  name: "Farmer",
  dicts: ['sys_yes_no', 'sys_user_sex', 'sys_farmer_industry', 'sys_famer_fighttype'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 农民工信息表格数据
      farmerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        famerName: null,
        famerCard: null,
        famerPhone: null,
        famerFacepolitics: null,
        famerNowplace: null,
        famerFightplace: null,
        famerFighthistory: null,
        famerFighttype: null,
        famerJob: null,
        famerHobby: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        famerName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        famerSex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        famerCard: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        famerPhone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        famerNowplace: [
          { required: true, message: "现户籍地址不能为空", trigger: "blur" }
        ],
        famerFightplace: [
          { required: true, message: "现工作地址不能为空", trigger: "blur" }
        ],
        famerFighttype: [
          { required: true, message: "工作类型不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询农民工信息列表 */
    getList() {
      this.loading = true;
      listFarmer(this.queryParams).then(response => {
        this.farmerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        famerId: null,
        famerName: null,
        famerSex: null,
        famerCard: null,
        famerPhone: null,
        famerFacepolitics: null,
        famerBirth: null,
        famerNowplace: null,
        famerFightplace: null,
        famerFighthistory: null,
        famerFighttype: null,
        famerJob: null,
        famerJobpost: null,
        famerHobby: null,
        famerTechnicaltitle: null,
        famerIsspecialperson: null,
        famerIscareperson: null,
        famerPartyplace: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.famerId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加农民工信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const famerId = row.famerId || this.ids
      getFarmer(famerId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改农民工信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.famerId != null) {
            updateFarmer(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFarmer(this.form).then(response => {
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
      const famerIds = row.famerId || this.ids;
      this.$modal.confirm('是否确认删除农民工信息编号为"' + famerIds + '"的数据项？').then(function() {
        return delFarmer(famerIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('farmer/farmer/export', {
        ...this.queryParams
      }, `farmer_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
