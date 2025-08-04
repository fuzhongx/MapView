<template>
    <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from '@amap/amap-jsapi-loader';

let map = null

onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: "2f495e08ccbc4b87c816b194ff306f9e",
    };
    AMapLoader.load({
        key: "fbab019ea5fbb0afcb3b07dd9ac9bc00", //申请好的Web端开发者key，调用 load 时必填
        version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.HawkEye","AMap.MapType","AMap.InfoWindow"],//需要使用的的插件列表
    }).then((AMap) => {
        map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
        });

        // 控制罗盘控件
        const controlBar = new AMap.ControlBar({
            visible: true, //显示与隐藏
            position: {
                left: "10px",
                top: "10px",
            },
            showControlButton: true,
        })
        map.addControl(controlBar);

        // 添加工具条
        const toolBar = new AMap.ToolBar({
            position: {
                left: "40px",
                top: "105px",
            },
        });
        map.addControl(toolBar);
     
        // 图层切换控件
        const MapType=new AMap.MapType({
            position: {
                left: "100px",
                bottom: "200px",
            },
        })
        map.addControl(MapType)

        //展示信息窗体
        const  openInfo=()=> {
        //构建信息窗体中显示的内容
        var info = [];
        info.push("<div class='input-card content-window-card'><div><img style=\"float:left;width:67px;height:16px;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
        info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
        info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

        const infoWindow = new AMap.infoWindow({
            content: info.join("")  //使用默认信息窗体框样式，显示信息内容
        });

        infoWindow.open(map, map.getCenter());
    }
    openInfo()
    })
        .catch((e) => {
            console.log(e);
        });


})


onUnmounted(() => {
    map?.destroy();
})
</script>

<style lang="scss" scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 8.38rem;
    border-radius: .125rem;
    // position: relative;
}
.custom-input-card{
            width: 18rem;
        }

        .custom-input-card .btn:last-child{
            margin-left: 1rem;
        }

        .content-window-card{
            position: relative;
            width: 23rem;
            padding: 0.75rem 0 0 1.25rem;
            box-shadow: none;
            bottom: 0;
            left: 0;
        }

        .content-window-card p{
            height: 2rem;
        }
</style>