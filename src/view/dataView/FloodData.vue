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
        <div class="content"></div>

        <!-- 底部 -->
        <div class="footer"></div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.contair {
    width: 100%;
    height: 100%;
    background: #fff;
}

.hea-top {
    height: .5rem;
    width: 100%;
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
            color: #4c91e4;
            border-color: #3571BA;

            &:hover {
                background: #3571BA;
                color: #FFF;
            }
        }

    }
}

.nav{
    width: 100%;
    height: .875rem;
    background: #257FD6;
    .nav-center{
        width: 15rem;
        height: .875rem;
        background: #4c91e4;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .nav-c-l{
            height: .0875rem;
            img{
                width: 2.6375rem;
                height: .6rem;
                line-height: .875rem;
            }
        }
        .nav-c-r{
            width: 8.75rem;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-around;
                li{
                  color: #fff;
                  font-size: .2rem;
                  line-height: .875rem;
                  cursor: pointer;
                  &:hover{
                    border-bottom: 1px solid #fff;
                  }
                }
            }
        }
    }
}
</style>