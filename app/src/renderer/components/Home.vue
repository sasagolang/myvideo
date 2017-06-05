<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <img src="20170530195030.jpg" height="60px" width="100%">
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    
                <el-menu :default-active="video.url" @select="handleselect">
                    <template v-for="item in playlist">
    
                        <el-menu-item :index="item.url"> {{item.name}}</el-menu-item>
                    </template>
                </el-menu>
            </aside>
    
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <!--<strong class="title">{{$route.name}}   </strong>
                                        
                						<el-breadcrumb separator="/" class="breadcrumb-inner">
                							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                								{{ item.name }}
                							</el-breadcrumb-item>
                						</el-breadcrumb>-->
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <d-player :video="video" :autoplay="autoplay" @play="play" ref="player">
                        </d-player>
                    </el-col>
                    <el-col>
                        <el-button type="text" :disabled="false" @click="openfile">播放本地文件</el-button>
                        <input type='file' accept="video/*" id='chooseVideo' class='chooseVideo hide' @change="loadVideo" style="display:none" />
                    </el-col>
    
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import path from 'path'
import fs from 'fs'
import storage from 'electron-storage'
import { app, remote } from 'electron'
var playlists = [{
    name: 'wat',
    url: 'wat.mp4',
    ptype: 1,
}];
var _path = path.join(remote.app.getPath('userData'), 'playList');


// console.info(JSON.stringify(playlists));
export default {
    data() {
        var contenttext=  fs.readFileSync(_path, 'utf8')
        if(contenttext&&contenttext!=""){
         playlists=JSON.parse(contenttext)
        }
        return {
              video: {
                 url: 'wat.mp4',
                 pic: ''
              },
            collapsed: false,
            autoplay: false,
            playlist: playlists
        }
    },
    mounted() {
        // const player = this.$refs.player.dp
        // player.play()
        // setTimeout(() => {
        //   player.pause()
        // }, 2000)
    },
    methods: {
        play() {
            console.log('play callback')
        },
        savePlayList: function () {


            fs.writeFile(_path, JSON.stringify(playlists), function (err) {

                if (err)
                    console.info(err);
            });
            // storage.set(_path, JSON.stringify(playlists), (err) => {
            //     if (err) {
            //         console.info(err)
            //     }
            // });
            // console.info(playlists);
        },
        switchVideo: function (name, path) {
            const player = this.$refs.player.dp;
            player.switchVideo({
                url: path,
                pic: ''
            });
        },
        loadVideo: function (e) {


            playlists.push({
                name: e.target.files[0].name,
                url: e.target.files[0].path,
                ptype: 2,
            });
            this.switchVideo(e.target.files[0].name, e.target.files[0].path)
            this.savePlayList();
        },
        handleselect: function (a, b) {

            this.switchVideo("", b);

        },
        openfile() {
            document.querySelector('#chooseVideo').click();
            return;



        },
    },
    components: {
        'd-player': VueDPlayer,

    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    text-align: center;
}

a {
    color: #42b983;
    text-decoration: none;
}

.dplayer {
    width: 100%;
    margin: 2px auto;
}

.dplayer-menu-show {
    display: block
}

h1 {
    font-size: 54px;
    color: #42b983;
    margin: 30px 0 10px;
}

h2 {
    font-size: 22px;
    color: #555;
}

@media (max-width: 768px) {
    .dplayer {
        width: 90%;
    }
    h1 {
        font-size: 30px;
    }
    h2 {
        font-size: 16px;
    }
}

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}

.container .header {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
}

.container .header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
}

.container .header .userinfo .userinfo-inner {
    cursor: pointer;
    color: #fff;
}

.container .header .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}

.container .header .logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
}

.container .header .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
}

.container .header .logo .txt {
    color: #fff;
}

.container .header .logo-width {
    width: 230px;
}

.container .header .logo-collapse-width {
    width: 60px;
}

.container .header .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}

.container .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
}

.container .main aside {
    flex: 0 0 230px;
    width: 230px;
}

.container .main aside .el-menu {
    height: 100%;
}

.container .main aside .collapsed {
    width: 60px;
}

.container .main aside .collapsed .item {
    position: relative;
}

.container .main aside .collapsed .submenu {
    position: absolute;
    top: 0px;
    left: 60px;
    z-index: 99999;
    height: auto;
    display: none;
}

.container .main .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
}

.container .main .menu-expanded {
    flex: 0 0 230px;
    width: 230px;
}

.container .main .content-container {
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
}

.container .main .content-container .breadcrumb-container .title {
    width: 200px;
    float: left;
    color: #475669;
}

.container .main .content-container .breadcrumb-container .breadcrumb-inner {
    float: right;
}

.container .main .content-container .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    height: 100%
}
</style>