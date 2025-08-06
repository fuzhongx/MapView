<template>
  <div class="constar">
    <div class="header">
      <div class="logo">
        <img src="@/assets/image/logo.png" alt="" />
        <span>中国汛情动态预警监测综合服务平台</span>
      </div>
      <div class="logo-r">
        <div class="logo-t">
          <img src="@/assets/image/noda.png" alt="" />
        </div>
      </div>
    </div>

    <!-- li -->
    <div class="nav">
      <ul>
        <li @click="handleHome">首页 <span>>></span></li>
        <li>汛情动态 <span>>></span></li>
        <li>灾害案例</li>
      </ul>
    </div>

    <!-- main -->
    <div class="mapBox">
      <div class="map">
        <div class="mapView">
          <MapContainer />
        </div>
        <!-- date nav -->
        <div class="dateNav">
          <div class="date-box">
            <ul>
              <li class="oricle" ref="oricleRef" v-for="item in dateTime.length" :key="item">

              </li>
            </ul>
          </div>
          <div class="date-box2">
            <div v-for="item in dateTime" :key="item">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 展示数据 -->
      <div class="mapdata">
        <div class="title">
          <h3>洪涝信息</h3>
        </div>
        <!-- 搜索区域 -->
        <div class="form">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="区间搜索:">
              <el-date-picker v-model="getTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="daterange"
                unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handle"
                class="picker" />
            </el-form-item>

            <el-form-item label="等级:">
              <el-select v-model="formData.ranks" placeholder="请选择" class="select" clearable>
                <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="搜索内容:">
              <el-input placeholder="请输入搜索内容" v-model="formData.content" clearable class="inp-w" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectBtn" class="btn">查询数据</el-button>
              <el-button type="primary" class="btn" @click="handleDaoChu">导出数据</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableView">
          <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }"
            style="width:10.7125rem; height: 5.8625rem;font-size: .175rem;" border show-overflow-tooltip
            @row-click="getRowData">
            <el-table-column prop="datetime" label="时间" sortable width="159" align="center"
              style="height: 0.5375rem !important" />
            <el-table-column prop="rank" label="等级" sortable width="99" align="center" v-slot="scope">
              <span v-if="scope.row.rank == '红色预警'" class="bg1"> {{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank == '橙色预警'" class="bg2"> {{ scope.row.rank }}</span>
              <span v-else-if="scope.row.rank == '黄色预警'" class="bg3"> {{ scope.row.rank }}</span>
              <span v-if="scope.row.rank == '蓝色预警'" class="bg4"> {{ scope.row.rank }}</span>

            </el-table-column>
            <el-table-column prop="scope" label="影响范围" width="451" align="center" />
            <el-table-column prop="poi" label="发布单位" width="120" align="center" />
          </el-table>
          <div class="pagina">
            <el-pagination background layout=" prev, pager, next,total" :total="total" class="mt-4"
              :page-sizes="[100, 200, 300, 400]" v-model:current-page="currentPage" v-model:page-size="pageSize"
              @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>版权所有：国家对地观测科学数据中心</p>
      <p>技术支持： 山东科技大学</p>
      <p>电话：010-82177657 邮箱：noda_office@aircas.ac.cn</p>
    </div>
  </div>
</template>

<script setup>
import MapContainer from '@/components/GaoDeMap.vue'
import { getData, getTableData, selectData } from "@/api/map";
import bus from '@/uilt/bus'

import XLSX from '@/uilt/export'
import dateTime from '@/uilt/dateTime';
import { useRouter } from 'vue-router';

import { onMounted, reactive, ref } from "vue";

const router = useRouter()
const getTime = ref();
const formData = reactive({
  content: "",
  ranks: "",
  pageSize: 10,
  pageNum: 1,
  startTime: "",
  endTime: "",
});



const currentPage = ref(null)
const pageSize = ref(null)

const options = [
  {
    label: "一级预警",
    value: "红色预警",
    bgc: {
      color: 'red'
    }
  },
  {
    label: "二级预警",
    value: "橙色预警",
    bgc: {
      color: 'orange'
    }
  },
  {
    label: "三级预警",
    value: "黄色预警",
    bgc: {
      color: 'yellow'
    }
  },
  {
    label: "四级预警",
    value: "蓝色预警",
    bgc: {
      color: 'blue'
    }
  },
];
const tableData = ref([]);
const total = ref(0);

onMounted(() => {
  getTable();
  getData({
    pageNum: 1,
    pageSize: 1000,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => { console.log(error) });
});

//获取下列时间
const oricleRef = ref(null)

// oricleRef.value.style.background='#ededde'
// console.log(oricleRef.value.style.background='red');



// 首页
const handleHome = () => {
  router.push('/floodData')
}

// 获取时间
const handle = (dataTime) => {
  formData.startTime = dataTime[0]
  formData.endTime = dataTime[1]
};
// 获取表格某行数据
const getRowData = (row) => {
  bus.emit('code', row.adcode)
  bus.emit('color', row.rank)
  console.log(row);


}

//分页
const handleSizeChange = (val) => {
  pageSize.value = val
  formData.pageSize = val
  selectBtn()

}
const handleCurrentChange = (val) => {
  currentPage.value = val
  formData.pageNum = val
  selectBtn()
}

// 查询
const selectBtn = () => {
  selectData(formData).then((res) => {
    tableData.value = res.data.rows;
    total.value = res.data.total;
  });
};

// 导出
const handleDaoChu = () => {
  XLSX(tableData.value)
}

const getTable = () => {
  getTableData({
    dateTime: "2025-07-26",
  }).then((res) => {

    tableData.value = res.data.data;
    total.value = res.data.data.length;
  }).catch(error => {
    console.log(error, 'hahah');
    if (error.status == 302) {
      // const Url=error.headers.get('Location')
      window.location.href = 'https://noda.ac.cn/login '
    }
  });
};

</script>

<style lang="scss" scoped>
.dateNav {
  width: 100%;
  height: .3375rem;
  .date-box2{

    width: 87%;
    height: .25rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .date-box {
    width: 90%;
    margin: 0 auto;
    // background: green;
    ul {
      display: flex;
      justify-content: space-evenly;

      li {
        position: relative;
        width: .1875rem;
        height: .1875rem;
        border-radius: 50%;
        border: 1px solid #dcdfe6;
        background: #fff;
        z-index: 33;

        &::before {
          position: absolute;
          display: block;
          content: '';
          top: 7px;
          right: 15px;
          width: 44px;
          height: 1px;
          background: #dcdfe6;
          z-index: 1;
        }

        &::after {
          position: absolute;
          display: block;
          content: '';
          top: 7px;
          left: 15px;
          width: 48px;
          height: 1px;
          background: #dcdfe6;
          z-index: 1;
        }
      }

      // li::before{
      //   display: block;
      //   content: '';
      //   position: absolute;
      //   top: 0px;
      //   left: 0;
      //   width: 60px;
      //   height: 1px;
      //   background: #fff;
      //   border: 100px solid #858282;
      // }

    }

  }
}

.bg1,
.bg2,
.bg3,
.bg4 {
  display: block;
  width: .95rem;
  height: .325rem;
  border-radius: .125rem;
}

.bg1 {
  background: red;
  color: #fcfcfc;
}

.bg2 {
  background: orange;
  color: #fff;
}

.bg3 {
  background: yellow;
  color: #858282;
}

.bg4 {
  background: blue;
  color: #fff;
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: .75rem;
  margin-top: .125rem;

  p {
    font-weight: 700;
    color: #2c3e50;
    font-size: .175rem;
  }
}

.pagina {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.25rem 0;
}

.tableView {
  width: 100%;
  height: 6.975rem;
  overflow: hidden;
  scroll-behavior: auto;
}

.demo-form-inline {
  height: 1.375rem;
  padding: .25rem 0 0 0;
}

.btn {
  width: 1.7rem;
  height: 0.5rem;
  font-size: .175rem;
}

.btn:nth-child(2) {
  margin-right: 0px;
}

.inp-w {
  width: 5.125rem !important;
  height: 0.4375rem;
}

.select {
  width: 2.975rem !important;
  height: 0.4375rem;
}

.nav {
  height: 0.4375rem;
  padding: 0 0 0 0.375rem;
  line-height: .5rem;

  ul {
    display: flex;

    li {
      cursor: pointer;
      color: #3c3e50;
      font-size: .2rem;
      font-family: Fira Sans, sans-serif;

      // color: #00f;
      &:hover {
        font-weight: 700;
        color: #00f;
      }

      &:active {
        font-weight: 700;
        color: #00f;
      }
    }
  }
}

.mapBox {
  padding: 0 0.25rem;
  display: flex;
  margin-top: .0625rem;

  .map {
    flex: 1.155;
    height: 9.2375rem;
    background: #fff;
    padding: .125rem;

    .mapView {
      // width: 12.3625rem;
      height: 8.5875rem;
      // background: red;
    }
  }

  .mapdata {
    flex: 1;
    padding: 0 0 0 0.25rem;

    .title {
      height: 1rem;
      background: #fff;
      display: flex;
      align-items: center;
      margin-top: -0.1375rem;
      padding-left: 0.125rem;
      z-index: 10;

      h3 {
        width: 1.2rem;
        height: 0.5rem;
        background: #e1251b;
        color: #fff;
        font-size: 0.175rem;
        font-weight: 700;
        // padding: 0 .25rem;
        text-align: center;
        line-height: 0.5rem;
      }
    }

    // background: green;
  }
}

.logo {
  width: 16.8rem;
  height: 0.5rem;
  padding: 0 0 0 0.25rem;
  display: flex;
  // justify-content: center;
  align-items: center;

  img {
    width: 0.4838rem;
    height: 0.375rem;
    line-height: 0.5rem;
    margin: 0.0625rem 0.125rem;
  }

  span {
    color: #ffffff;
    line-height: 0.5rem;
    font-weight: bolder;
    letter-spacing: 2px;
    font-size: 0.225rem;
  }
}

.logo-r {
  width: 6.95rem;
  height: 0.5rem;
  display: flex;
  justify-content: center;
}

.logo-t {
  width: 4.1875rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: .125rem;

  img {
    width: 4.0625rem;
    height: 0.325rem;
    padding-top: 0.025rem;
  }
}

.header {
  height: 0.5rem;
  background-color: #deb887;
  display: flex;
}

.constar {
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-card__body {
  padding: .25rem 0;
}

.el-range-editor.el-input__wrapper {
  width: 4.8875rem !important;
  height: 0.4375rem;
}
</style>
<style scoped>
::v-deep .el-form-item--label-right .el-form-item__label {
  font-size: .175rem !important;
}

::v-deep .el-date-editor .el-range-input {
  font-size: .15rem;
}

::v-deep .el-date-editor .el-range-separator {
  font-size: .15rem;
}

::v-deep .el-date-editor .el-range__icon svg {
  font-size: .15rem;
}

::v-deep .el-select__wrapper {
  height: .4375rem;
  font-size: .15rem;
}

::v-deep .el-input__inner {
  font-size: .15rem;
}

::v-deep .el-form--inline .el-form-item {
  display: inline-flex;
  margin-right: .4rem;
  vertical-align: middle;
}
</style>