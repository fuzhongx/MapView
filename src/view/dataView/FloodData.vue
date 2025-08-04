<template>
    <div class="contair">
        <!-- 头部 -->
        <div class="header">
            <div class="hea-top">
                <div class="h-l-img">
                    <img src="https://noda.ac.cn/static/images/icon/logo_01.jpg" alt="">
                    <img src="	https://noda.ac.cn/static/images/icon/logo_02.jpg" alt="">
                </div>
                <div class="h-r-text">
                    <span>EngLish</span>
                </div>
            </div>
            <div class="hea-down">
                <div class="h-d-l">
                    <img src="https://noda.ac.cn/static/images/back/logo4.png" alt="">
                </div>
                <div class="h-d-r">
                    <el-button>登录</el-button>
                    <el-button>注册</el-button>
                </div>
            </div>
        </div>


        <!-- 导航栏 -->
        <div class="nav">
            <div class="nav-center">
                <div class="nav-c-l">
                    <img src="https://noda.ac.cn/static/images/icon/fouLog.png" alt="">
                </div>
                <div class="nav-c-r">
                    <ul>
                        <li>首页</li>
                        <li>数据集检索</li>
                        <li>影像产品检索</li>
                        <li>专题服务</li>
                        <li>投票服务</li>
                        <li>帮助中心</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 内容展示 -->
        <div class="content">
            <!-- 导航栏 -->
            <div class="cont-nav">
                <span>专题服务</span>
                <span>></span>
                <span>专题详情</span>
            </div>

            <!-- 内容展示 -->
            <div class="cont-view">
                <!-- 专题服务 -->
                <div class="services">
                    <div class="services-img"><img
                            src="https://noda.ac.cn/group1/M00/01/20/CgMMMmKoI3CAOxK1AAFIkOJGgdc078.jpg" alt=""></div>
                    <div class="services-text">
                        <h3> 2024年中国夏季洪涝灾害数据专题服务</h3>
                        <p>2023-09-20 15:10:49</p>
                        <p>我国是世界上洪涝灾害多发频发的国家之一，大约三分之二的国土面积上都可能发生不同类型和不同程度的洪涝灾害。国家对地观测科学数据中心自2020年以来，持续组织有关单位和科研团队开展夏季洪涝灾害数据专题服务，为地方政府和减灾机构提供了及时有效科学准确的灾情遥感监测分析信息。2023年汛期期间，由中心自主研制的我国首个汛情动态预警监测综合服务平台正式上线，该平台基于AI和大数据技术实时采集和动态更新县级以上水利数据中心发布的水情预警信息，已先后为重庆、北京、西安、宜昌、福州等重大洪涝灾害应急工作提供了遥感影像、社交媒体、基础地理等数据支撑，用户可按需查看和下载相关数据。
                        </p>
                        <p>平台链接：<a href="https://www.chinageoss.cn/xqyjjc/">中国汛情动态预警监测综合服务平台</a> </p>

                    </div>
                </div>
                <!-- 绿色通道 -->
                <div class="green">
                    <div><img src="https://noda.ac.cn/static/images/icon/FspeDT01.png" alt=""></div>
                    <div class="green-text">数据下载绿色通道</div>
                </div>

                <!-- 图文 -->
                <div class="picture-txt">
                    <div class="picture-box" v-for="item in dataList" :key="item.id">
                        <div class="picture-img">
                            <img :src='imgUrl + item.imagePath' alt="">
                        </div>
                        <div class="picture-h">
                            <h3><span>数据集</span> <span>{{ item.title }}</span></h3>
                        </div>
                        <div class="picture-p">
                            <p>访问量：{{ item.visit }} <span style="margin-left: .25rem;">下载量：{{ item.download }}</span>
                            </p>
                        </div>
                        <div class="picture-btn">
                            <a :href="Looking + item.id">查看数据</a>
                            <el-button @click="onLineSubmit">在线申请</el-button>
                            <el-dialog v-model="dialogVisible" title="noda.ac.cn 显示" width="20%"
                                :before-close="handleClose" top="2vh">
                                <span>您尚未登录，请登录</span>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogVisible = false" class="login-btn">取消</el-button>
                                        <el-button type="primary" @click="loginSubmit" class="login-btn">
                                            确定
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </div>
                    </div>
                    <div class="picture-box"></div>
                    <div class="picture-box"></div>
                </div>
            </div>
        </div>

        <!-- 底部 	https://noda.ac.cn/static/images/icon/ftIco01.png-->
        <div class="footer">
            <div class="foo-top">
                <div class="foo-top-center">
                    <div class="foo-text"><i></i>单位地址：北京市海淀区邓庄南路9号</div>
                    <div class="foo-text"><i></i>联系电话：010-82178171 (周一至周五 08:00-17:00)</div>
                    <div class="foo-text"><i></i>邮 箱：chinageoss_office@aircas.ac.cn</div>
                    <div class="foo-text"><i></i> 微信客服：15330081682 (24小时可留言)</div>
                </div>


            </div>
            <div class="foo-down">
                <div>京ICP备20021838号-15 | Copyright©2020-2021  | 使用帮助 </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getPictureData } from '@/api/floodata'
import { ref, onMounted } from 'vue'

const imgUrl = "https://noda.ac.cn/"
const Looking = 'https://noda.ac.cn/datasharing/datasetDetails/'

const dataList = ref([])
const dialogVisible = ref(false)

onMounted(() => {
    List()
})
const List = () => {
    getPictureData({
        id: 'ChinaSummerFloodData',
        pageNum: 0,
        pageSize: 8
    }).then(res => {
        dataList.value = res.data.responseBody
        console.log(res.data.responseBody, '数据');

    })
}
const onLineSubmit = () => {
    dialogVisible.value = true
}

const loginSubmit = () => {
    window.location.href = 'https://noda.ac.cn/login?jumpUrl=/datasharing/theme/viewThemeById'
}

</script>

<style lang="scss" scoped>
.contair {
    width: 100%;
    height: 100%;
    max-width: 24rem;
    min-width: 15rem;
    // background: #fff;
}

.hea-top {
    height: .5rem;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .h-l-img {
        padding: 0 0 0 .5rem;

        img {
            height: .5rem;
        }
    }

    .h-r-text {
        width: 2.55rem;
        font-size: .225rem;
        color: #6c6c6c;
        line-height: .5rem;
    }
}

.hea-down {
    background: #fff;
    display: flex;
    justify-content: space-between;

    .h-d-l {
        img {
            width: 7.95rem;
            height: .8125rem;
            padding: 0 0 0 .5rem;
        }
    }

    .h-d-r {
        display: flex;
        align-items: center;
        width: 2.55rem;

        button {
            width: 1.05rem;
            height: .5rem;
            border-radius: .25rem;
            font-size: .175rem;
            color: #4c91e4;
            border-color: #3571BA;

            &:hover {
                background: #3571BA;
                color: #FFF;
            }
        }

    }
}

.nav {
    // width: 24rem;
    height: .875rem;
    background: #257FD6;
    margin-top: .15rem;

    .nav-center {
        width: 15rem;
        height: .875rem;

        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .nav-c-l {
            // height: .875rem;
            display: flex;
            align-items: center;

            img {
                width: 2.6375rem;
                height: .6rem;
                line-height: .875rem;
            }
        }

        .nav-c-r {
            width: 8.75rem;

            ul {
                width: 100%;
                display: flex;
                justify-content: space-around;

                li {
                    color: #fff;
                    font-size: .2rem;
                    height: .75rem;
                    line-height: .875rem;
                    cursor: pointer;

                    &:hover {
                        border-bottom: 1px solid #fff;
                        transition: li .2;
                    }
                }
            }
        }
    }
}

.content {
    width: 100%;

    .cont-nav {
        width: 15rem;
        height: .8125rem;
        font-size: .275rem;

        margin: 0 auto;
        line-height: .8125rem;

        span {
            cursor: pointer;
            color: #303133;
            opacity: 0.5;

            &:hover {
                color: #303133;
                ;
                opacity: 1;
            }
        }

        span:nth-child(2) {
            padding: .125rem;
        }

    }

    .cont-view {
        width: 14.25rem;
        margin: 0 auto;
        padding: .375rem;
        background: #fff;

        .services {
            display: flex;
            justify-content: space-between;

            .services-img {
                width: 5.625rem;
                height: 4.125rem;

                img {
                    width: 5.625rem;
                    height: 4.125rem;
                }
            }

            .services-text {
                width: 7.75rem;
                height: 4.125rem;

                h3 {
                    width: 7.75rem;
                    font-size: .275rem;
                    color: #303133;
                }

                P {
                    font-size: .175rem;
                    color: #B3B3B3;
                }

                p:nth-child(3) {
                    text-indent: .25rem;
                    padding: .125rem 0;
                }

                p:nth-child(4) {
                    text-indent: .25rem;
                }
            }

        }

        .green {
            display: flex;
            align-items: center;
            background: #257FD6;
            height: .75rem;
            margin: 0 auto;
            margin-top: .375rem;
            padding: 0 .1875rem;

            img {
                width: .3rem;
                height: .3rem;
            }

            .green-text {
                width: 1.8rem;
                height: .375rem;
                font-size: .225rem;
                color: #fff;
                padding-left: .125rem;
            }
        }

        .picture-txt {
            padding: .25rem 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .picture-box {
                width: 3.4375rem;
                height: 4.4rem;
                display: flex;
                flex-direction: column;
                margin-bottom: .125rem;
            }

            .picture-img {
                height: 2.6125rem;
                margin: .125rem 0;

                img {
                    width: 3.4375rem;
                    height: 2.6125rem;
                }
            }

            .picture-h {
                h3 {
                    height: .625rem;
                    font-size: .175rem;
                    color: #303133;
                    font-weight: 400;

                    // display: flex;
                    // flex-wrap: nowrap;
                    span:nth-child(1) {
                        line-height: 23px;
                        border-radius: 13px 13px 13px 0px;
                        border: 1px solid #257FD6;
                        color: #257FD6;
                        font-size: .15rem;
                        padding: 0 .125rem;
                        margin-right: .0625rem;
                    }
                }
            }

            .picture-p {
                font-size: .15rem;
                color: #8a9199;
                margin: .125rem 0;
            }

            .picture-btn {
                display: flex;

                a {
                    width: 1.125rem;
                    height: .4rem;
                    display: block;
                    font-size: .175rem;
                    line-height: .4rem;
                    text-align: center;
                    margin-right: .0625rem;
                    border-radius: .0625rem;
                    text-decoration: none;
                    cursor: pointer;
                }

                a:nth-child(1) {
                    color: #257fd6 !important;
                    border: 1px solid #257FD6 !important;
                    background: rgba(37, 127, 214, 0.09) !important;
                }

                button:nth-child(2) {
                    border: 1px solid #2FAD7F;
                    width: 1.125rem;
                    height: .4375rem;
                    font-size: .175rem;
                    background: rgba(47, 173, 127, 0.09);
                    color: #2FAD7F;
                    margin-left: .125rem;
                }
            }
        }
    }
}

.login-btn {
    border-radius: .25rem;
    height: .4rem !important;
}

.footer {
    width: 100%;
    height: 3.25rem;
    background-color: #1b2541;
        background-image: url(https://noda.ac.cn/static/images/pic/footB.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;

    .foo-top {
        // width: 24rem;
        height: 2.55rem;
        color: #FFF;


        .foo-top-center {
            width: 15rem;
            height: .75rem;
            margin: 0px auto;
            padding: .675rem .375rem;
            display: flex;
            flex-wrap: wrap;
         .foo-text{
            display: flex;
            align-items: center;
         }
            div {
                width: 7.5rem;
                font-size: .175rem;
                color: #ffffffcc;
            }
            div:nth-child(1) i {
                  display: block;
                  width: .325rem;
                  height: .325rem;
                  background-image: url(https://noda.ac.cn/static/images/icon/ftIco01.png);
                  background-position: 0 0px;
                  background-size:.325rem;
                  background-repeat: no-repeat;
                  margin-right:.125rem;
            }
            div:nth-child(2) i {
                  display: block;
                  width: .325rem;
                  height: .325rem;
                  background-image: url(https://noda.ac.cn/static/images/icon/ftIco01.png);
                  background-position: 0 -0.325rem;
                  background-size: .325rem;
                  background-repeat: no-repeat;
                  margin-right:.125rem;
            }
            div:nth-child(3) i {
                  display: block;
                  width: .325rem;
                  height: .325rem;
                  background-image: url(https://noda.ac.cn/static/images/icon/ftIco01.png);
                  background-position: 0 -0.65rem;
                  background-size: .325rem;
                  background-repeat: no-repeat;
                  margin-right:.125rem;
            }
            div:nth-child(4) i {
                  display: block;
                  width: .325rem;
                  height: .325rem;
                  background-image: url(https://noda.ac.cn/static/images/icon/ftIco01.png);
                  background-position: 0 -0.975rem;
                  background-size: .325rem;
                  background-repeat: no-repeat;
                  margin-right:.125rem;
            }

        }

    }

    .foo-down {
        background:rgb(30 90 154);
        height: .7rem;
        line-height: .5rem;
        text-align: center;
        font-size: .175rem;
        color: rgba(255, 255, 255, 0.6);
        div{
            width: 15rem;
            line-height: .7rem;
            margin: 0 auto;
            
        }
    }
}
</style>
<style>
.el-overlay {
    opacity: .08;
}
</style>
