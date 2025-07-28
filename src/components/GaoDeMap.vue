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
        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.HawkEye"],//需要使用的的插件列表
    }).then((AMap) => {
        // const layer = new AMap.createDefaultLayer({
        //     zooms: [3, 20], //可见级别
        //     visible: true, //是否可见
        //     opacity: 1, //透明度
        //     zIndex: 0, //叠加层级
        // });

        map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
        });
        const controlBar = new AMap.controlBar({
            position: {
                right: "10px",
                top: "10px",
            },
            showControlButton: true,
        })
        map.addControl(controlBar);

        // 添加工具条
        const toolBar = new AMap.ToolBar({
            position: {
                right: "40px",
                top: "105px",
            },
        });
        map.addControl(toolBar);
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
    position: relative;
}
</style>