<template>
    <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from '@amap/amap-jsapi-loader';
import bus from '@/uilt/bus'



let map = null
const adCode = ref([511802]);
const depth = ref(2);




const fun = () => {
    window._AMapSecurityConfig = {
        securityJsCode: "2f495e08ccbc4b87c816b194ff306f9e",
    };
    AMapLoader.load({
        key: "fbab019ea5fbb0afcb3b07dd9ac9bc00", //申请好的Web端开发者key，调用 load 时必填
        version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.HawkEye", "AMap.MapType", "AMap.DistrictLayer", "AMap.InfoWindow"],//需要使用的的插件列表
    }).then((AMap) => {
        map = new AMap.Map("container", {
            resizeEnable: true,//监控地图容器大小
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom:4.5, // 初始化地图级别
            // zooms:[9],//缩放范围[3,18]
            pitch: 0,//俯仰角度，默认0，[0,83]，2D地图下无效 。
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
        const MapType = new AMap.MapType({
            position: {
                left: "100px",
                bottom: "200px",
            },
        })
        map.addControl(MapType)

        // 容器坐标，原点为左上角
        // var px = 1407;
        // var py = 356;

        // // 构造成 Pixel 对象后传入
        // var pixel = new AMap.Pixel(px, py);
        // var lnglat = map.containerToLngLat(pixel);  // 获得 LngLat 对象
        // console.log(lnglat.lng, lnglat.lat);


        // // 展示信息窗体
        // const openInfo = () => {
        //     //构建信息窗体中显示的内容
        //     var info = [];
        //     info.push("<div class='input-card content-window-card'><div><img style=\"float:left;width:67px;height:16px;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        //     info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
        //     info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
        //     info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

        //     const infoWindow = new AMap.InfoWindow({
        //         content: info.join(""), //使用默认信息窗体框样式，显示信息内容
        //         offset: new AMap.Pixel(0, -30)
        //     });

        //     infoWindow.open(map, new AMap.LngLat(lnglat.lng, lnglat.lat));

        // }
        // openInfo()


        //创建省份图层
        var disProvince
        const initPro = (code, dep) => {
            dep = typeof dep == 'undefined' ? 2 : dep;
            adCode.value = code;
            depth.value = dep;

            disProvince && disProvince.setMap(null)
            disProvince = new AMap.DistrictLayer.Province({
                zIndex: 12,
                adcode: code,
                depth: dep,
                styles: {
                    'fill': function (properties) {
                        // properties为可用于做样式映射的字段，包含
                        // NAME_CHN:中文名称
                        // adcode_pro
                        // adcode_cit
                        // adcode
                        let adcode = properties.adcode;
                        return getColorByAdcode(adcode);
                    },
                    'province-stroke': 'cornflowerblue',//省界颜色
                    'city-stroke': 'white', // 中国地级市边界
                    'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
                }
            })
            disProvince.setMap(map);//将disProvince图层设置到地图上
        }
        // 颜色辅助方法
        var colors = {};
        const rank = ref('')
        //获取表格上城市的adcode
        bus.on('color', item => {
            rank.value = item
            console.log(item, 'color');

        })
     
        var getColorByAdcode = function (adcode) {
           
            if (!colors[adcode]) {
                switch (rank.value) {
                    case '黄色预警': colors[adCode, rank.value] = 'agb(255, 255, 0)'; break
                    case '蓝色预警': colors[adCode, rank.value] = 'agb(0, 0, 255)'; break
                    case '红色预警': colors[adCode, rank.value] = 'agb(255, 0, 0)'; break
                    case '橙色预警': colors[adCode, rank.value] = 'agb(255, 0, 0)'; break
                }

            }
            if (!colors[adcode]) {
                var gb = Math.random() * 155 + 50;
                colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
            }
            // else if (!colors[adcode] && rank.value == '蓝色预警') {
            //     colors[adCode] = 'agb(0, 0, 255)'
            // }
            // else if (!colors[adcode] && rank.value == '红色预警') {
            //     colors[adCode] = 'agb(255, 0, 0)'
            // }
            // else (!colors[adcode] && rank.value == '橙色预警') {
            //     colors[adCode] = 'agb(255, 0, 0)'
            // }

            return colors[adcode];
        };


        initPro(adCode.value, depth.value);

        //获取表格上城市的adcode
        bus.on('code', item => {
            adCode.value = item.split(';').map(Number)
            initPro(adCode.value, depth.value);

        })


    })
        .catch((e) => {
            console.log(e);
        });


}
onMounted(() => {
    fun()
})


onUnmounted(() => {
    map?.destroy();
})
</script>

<style lang="scss" scoped>
#container {
    padding: 0;
    margin: 0px;
    width: 100%;
    height: 8.38rem;
    border-radius: .125rem;
    position: relative;
}

.custom-input-card {
    width: 18rem;
}

.custom-input-card .btn:last-child {
    margin-left: 1rem;
}

.content-window-card {
    position: relative;
    width: 23rem;
    padding: 0.75rem 0 0 1.25rem;
    box-shadow: none;
    bottom: 0;
    left: 0;
}

.content-window-card p {
    height: 2rem;
}
</style>