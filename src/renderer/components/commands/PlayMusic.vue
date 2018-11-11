<template>
  <div class="play_music_container">
    <div class="play_music_container_bg" :style="{backgroundImage: 'url(' + playOptions.album.picUrl + ')'}"></div>
    <div class="play_music_content">
      <div class="album_container">
        <div class="album_pic_container" :style="{animationPlayState: (!audio.isWaiting && audio.play ? 'running' : 'paused')}">
          <!--<img class="album_pic" :src="playOptions.album.picUrl">-->
          <div class="album_pic" :style="{backgroundImage: 'url(' + playOptions.album.picUrl + ')'}"></div>
        </div>
      </div>
      <p class="music_name" v-text="playOptions.name"></p>
      <p class="music_author" v-text="playOptions.author.name"></p>
    </div>
    <div class="music_lyric_container">
      <div class="music_lyric_inner">
        <div class="music_lyric_header_container">
          <p class="music_lyric_header_text" v-text="playOptions.name"></p>
          <p class="music_lyric_header_subtext">
            专辑：<a href="javascript: void(0)" v-text="playOptions.album.name" :title="playOptions.album.name"></a>
            歌手：<a href="javascript: void(0)" v-text="playOptions.author.name" :title="playOptions.author.name"></a>
          </p>
        </div>
        <div class="music_lyric_body_container">
          <ls-lyric :lyric="playOptions.lyric" :current-time="audio.currentTime"></ls-lyric>
        </div>
      </div>
    </div>
    <div class="play_music_control_container">
      <div class="play_music_control_bg"></div>
      <div class="play_music_control_content">
        <div class="play_btns">
          <a href="javascript: void(0)" class="prev disabled"></a>
          <a href="javascript: void(0)" class="play" v-if="!audio.play" @click="play"></a>
          <a href="javascript: void(0)" class="pause" v-else @click="pause"></a>
          <a href="javascript: void(0)" class="next disabled"></a>
        </div>
        <div class="play_main_container">
          <div class="play_main_container_top">
            <p class="bottom_music_name" v-text="playOptions.name"></p>
            <p class="bottom_music_author" v-text="playOptions.author.name"></p>
            <img src="/static/images/loading.gif" class="loading_img" v-if="audio.isWaiting">
          </div>
          <div class="play_main_container_bottom">
            <vue-slider class="music_progress_slider" width="90%" v-model="audioSlider.value"
                        :tooltip="audioSlider.tooltip"
                        :bgStyle="audioSlider.bgStyle"
                        :processStyle="audioSlider.processStyle"
                        :min="audioSlider.min"
                        :max="audioSlider.max"
                        @drag-start="progressDragStart"
                        @drag-end="changeProgressByDrag"
                        @callback="changeProgressByClick"
            ></vue-slider>
            <div class="play_ts_container">
              <p class="current_time">{{audio.currentTime | timeStr}}</p>
              <span style="margin-left: 5px; margin-right: 5px;">/</span>
              <p>{{audio.duration | timeStr}}</p>
            </div>
          </div>
        </div>
        <div class="play_operation_container"></div>
      </div>
    </div>
    <audio :ref="audioRef" autoplay loop :src="playOptions.url"></audio>
    <!--<aplayer autoplay :music="music" style="position: absolute; left: 100px; top: 100px; width: 100%; height: 48px;"></aplayer>-->
  </div>
</template>
<style scoped>
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .play_music_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    /*flex-direction: column;*/
    align-items: flex-start;
    justify-content: center;
  }

  .play_music_container_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;
    filter: blur(150px) brightness(0.5);
  }

  .play_music_content {
    width: 100%;
    height: 100%;
    color: #ffffff;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .album_container {
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .album_pic_container {
    width: 220px;
    height: 220px;
    border-radius: 110px;
    overflow: hidden;
    -webkit-animation: rotate 20s infinite linear;
    -o-animation: rotate 20s infinite linear;
    animation: rotate 20s infinite linear;
    -webkit-box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  }

  .album_pic {
    width: 220px;
    height: 220px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .music_name {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 200;
    padding: 0 10px;
    color: #c8c8c8;
  }

  .music_author {
    font-size: 14px;
    margin-top: 15px;
    color: #a8a8a8;
    font-weight: 200;
  }

  .music_lyric_container {
    width: 100%;
    height: calc(100% - 48px);
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }

  .music_lyric_inner {
    width: 80%;
    height: 100%;
    padding: 20px 0 40px 0;
    box-sizing: border-box;
  }

  .music_lyric_header_container {
    width: 100%;
    /*height: 70px;*/
    padding-bottom: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
  }

  .music_lyric_header_text {
    font-size: 22px;
    color: #444;
  }

  .music_lyric_header_subtext {
    width: 100%;
    font-size: 13px;
    color: #333;
    font-weight: 100;
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .music_lyric_header_subtext a {
    color: #c8c8c8;
    margin-right: 8px;
    text-decoration: none;
    display: inline-block;
    max-width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .music_lyric_body_container {
    width: 100%;
    height: calc(100% - 70px);
    background-color: transparent;
    min-height: 400px;
  }

  .play_music_control_container {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 53px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .play_music_control_bg {
    position: absolute;
    width: 100%;
    height: 53px;
    z-index: 0;
    background: url('http://static.dei2.com/experience/playbar.png') no-repeat 0 9999px;
    background-position: 0 0;
    background-repeat: repeat-x;
  }

  .play_music_control_content {
    z-index: 1;
    width: 90%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .play_btns {
    width: 137px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }

  .play_btns a {
    display: block;
    margin-right: 8px;
    width: 28px;
    height: 28px;
    background: url('http://static.dei2.com/experience/playbar.png') no-repeat 0 9999px;
  }

  .play_btns a.disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }

  .play_btns a.disabled:hover {
    opacity: 0.1;
  }

  .play_btns .prev {
    background-position: 0 -130px;
  }

  .play_btns .prev:hover {
    background-position: -30px -130px;
  }

  .play_btns .prev.disabled:hover {
    background-position: 0 -130px;
  }

  .play_btns .play {
    width: 36px;
    height: 36px;
    background-position: 0 -204px;
  }

  .play_btns .play:hover {
    background-position: -40px -204px;
  }

  .play_btns .play.disabled:hover {
    background-position: 0 -204px;
  }

  .play_btns .pause {
    width: 36px;
    height: 36px;
    background-position: 0 -165px;
  }

  .play_btns .pause:hover {
    background-position: -40px -165px;
  }

  .play_btns .pause.disabled:hover {
    background-position: 0 -165px;
  }

  .play_btns .next {
    background-position: -80px -130px;
  }

  .play_btns .next:hover {
    background-position: -110px -130px;
  }

  .play_btns .next.disabled:hover {
    background-position: -80px -130px;
  }

  .play_main_container {
    width: calc(100% - 137px - 126px);
    height: 48px;
  }

  .play_main_container_top {
    width: 100%;
    height: 50%;
    font-size: 12px;
    padding-left: 8px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }

  .play_main_container_top .bottom_music_name {
    max-width: 300px;
    color: #e8e8e8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .play_main_container_top .bottom_music_author {
    margin-left: 15px;
    max-width: 220px;
    color: #9b9b9b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .play_main_container_top .loading_img {
    width: 15px;
    height: 15px;
    margin-left: 8px;
    margin-top: 3px;
  }

  .play_main_container_bottom {
    width: 100%;
    height: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  .play_ts_container {
    width: 100px;
    height: 24px;
    font-size: 13px;
    color: #797979;
    text-shadow: 0 1px 0 #121212;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .current_time {
    color: #a1a1a1;
  }

  .play_operation_container {
    width: 126px;
    height: 48px;
  }
</style>
<script>
  // const electron = require('electron')
  import VueSlider from 'vue-slider-component'
  export default {
    name: 'PlayMusic',
    props: {
      options: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        audioRef: 'audio-ref',
        playOptions: {
          author: {},
          album: {}
        },
        audio: {
          play: true,
          ele: null,
          currentTime: 0,
          duration: 0,
          isWaiting: false // 等待加载音频资源
        },
        audioSlider: {
          value: 0,
          min: 0,
          max: 100,
          tooltip: false,
          bgStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: 'inset 0.5px 0.5px 3px 1px #444'
          },
          processStyle: {
            backgroundImage: '-webkit-linear-gradient(left, #f05b72, #3498db)'
          },
          isDrag: false
        }
      }
    },
    computed: {
      music () {
        let _options = this.playOptions
        return {
          title: _options.name,
          artist: _options.author.name,
          src: _options.url,
          pic: _options.album.picUrl
        }
      }
    },
    created () {
      this.playOptions = Object.assign({}, this.options)
      this.audioSlider.max = Math.floor(this.playOptions.dt / 1000)
      this.audio.duration = this.playOptions.dt
      this.$nextTick(() => {
        this.audio.ele = this.$refs[this.audioRef]
        this.audio.currentTime = this.audio.ele.currentTime * 1000
        this.play()
        this.addEventListener()
        /**
         electron.remote.ipcMain.emit('download', {
            url: 'http://m10.music.126.net/20180428175535/ceb19a975b93df269aedac8f2cd4dcab/ymusic/67a7/1920/cad6/a19f11f01c2fc0c7ead033b2ace15eb7.mp3',
            path: './'
          })
         */
      })
    },
    methods: {
      play () {
        if (this.audio.ele.paused) {
          this.audio.ele.play()
          this.audio.play = true
        }
      },
      pause () {
        if (!this.audio.ele.paused) {
          this.audio.ele.pause()
          this.audio.play = false
        }
      },
      _currentTime () {
        this.audio.currentTime = this.audio.ele.currentTime * 1000
        this.audioSlider.value = Math.floor(this.audio.ele.currentTime)
      },
      _waiting () {
        this.audio.isWaiting = true
      },
      _playing () {
        this.audio.isWaiting = false
      },
      _ended () {
        // 音频播放完毕
      },
      _loadedmetadata (e) {
        console.log('>>>>>>', e.target.buffered.end(0) / e.target.duration * 100 + '%')
      },
      addEventListener () {
        this.audio.ele.addEventListener('timeupdate', this._currentTime)
        this.audio.ele.addEventListener('waiting', this._waiting)
        this.audio.ele.addEventListener('playing', this._playing)
        this.audio.ele.addEventListener('ended', this._ended)
        this.audio.ele.addEventListener('progress', this._loadedmetadata)
      },
      progressDragStart () {
        this.audioSlider.isDrag = true
      },
      changeProgressByDrag (e) {
        this.audio.ele.currentTime = parseInt(e.getValue())
        this.audioSlider.isDrag = false
      },
      changeProgressByClick (val) {
        if (!this.audioSlider.isDrag) {
          // 点击 切换歌曲进度
          this.audio.ele.currentTime = parseInt(val)
        }
      }
    },
    watch: {
      'options.id': function (val) {
        this.playOptions = Object.assign({}, this.options)
        this.audioSlider.max = Math.floor(this.playOptions.dt / 1000)
        this.play()
      }
    },
    components: {
      VueSlider,
      LsLyric: () => import('../coms/LsLyric.vue')
    }
  }
</script>
