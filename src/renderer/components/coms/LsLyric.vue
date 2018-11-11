<template>
  <div class="ls_lyric_container" ref="lyricContainerRef">
    <ls-scroll :data="lyricArr" :options="scrollOptions" class="lyric_scroll" @initialed="initialedScroll"
               :listenBeforeScroll="true"
               @beforeScrollStart="beforeScrollStart"
               :listenTouchEnd="true"
               @touchEnd="touchEnd"
               v-if="lyricType === 0"
    >
      <div class="ls_lyric_wrapper">
        <p class="item_lyric" v-for="(lrc, index) in lyricArr" :key="index" :ref="'itemLyric-' + index" :class="{active: index == activeIndex}">
          <span v-text="lrc.text"></span>
          <br>
          <span v-text="lrc.tText"></span>
        </p>
        <br>
      </div>
    </ls-scroll>
    <div class="ls_lyric_empty" v-else>
      <p v-if="lyricType === 1">纯音乐</p>
      <p v-if="lyricType === 2">未找到歌词</p>
    </div>
  </div>
</template>
<style scoped>
  .ls_lyric_container {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .lyric_scroll {
    width: 100%;
    height: 100%;
  }
  .item_lyric {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.3);
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 100;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -ms-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }
  .item_lyric.active {
    /*font-size: 16px;*/
    /*line-height: 2;*/
    color: #FFFFFF;
  }
  .ls_lyric_empty {
    width: 100%;
    height: 100%;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9b9b9b;
  }
</style>
<script>
  /**
   * 歌词组件 v0.0.1
   * 网易云音乐歌词
   * 支持 同时显示中英文歌词
   */
  export default {
    name: 'LsLyric',
    props: {
      lyric: {
        type: Object,
        default: function () {
          return {}
        }
      },
      currentTime: {
        type: Number
      }
    },
    data () {
      return {
        scrollOptions: {},
        lyricScroll: null,
        lyricContainerHeight: 0,
        beforeScroll: false
      }
    },
    computed: {
      activeIndex () {
        let _index = 0
        let _lyricArr = Object.assign([], this.lyricArr)
        let _currentTime = parseFloat(this.currentTime)
        for (let i = 0; i < _lyricArr.length - 1; i++) {
          if (parseFloat(_lyricArr[_lyricArr.length - 1].ts) <= _currentTime) {
            _index = _lyricArr.length - 1
            i = _lyricArr.length - 1
          } else {
            if (parseFloat(_lyricArr[i].ts) <= _currentTime && parseFloat(_lyricArr[i + 1].ts) >= _currentTime) {
              _index = i
              i = _lyricArr.length - 1
            }
          }
        }
        !this.beforeScroll && this.lyricScroll && this.$refs['itemLyric-' + _index] && this.lyricScroll.scrollToElement(this.$refs['itemLyric-' + _index][0], 800, 0, -(this.lyricContainerHeight / 2 - 50))
        return _index
      },
      lyricType () {
        // 歌词类型。 0：正常有歌词，1：无歌词 纯音乐，2：无歌词 未搜集到
        let _lyricType = 2
        let _lyricData = Object.assign({}, this.lyric)
        if (_lyricData.status === 200) {
          if (_lyricData.data.uncollected) {
            // 未搜集到歌词
            _lyricType = 2
          } else if (_lyricData.data.nolyric) {
            // 纯音乐
            _lyricType = 1
          } else if (_lyricData.data.lrc && _lyricData.data.lrc.lyric) {
            _lyricType = 0
          } else {
            _lyricType = 2
          }
        } else {
          _lyricType = 2
        }
        return _lyricType
      },
      lyricArr () {
        if (this.lyricType !== 0) {
          return []
        }
        let _lyric = this.lyric.data.lrc.lyric
        _lyric = _lyric.replace(/\[.*\]\s*\n/g, '').replace(/\n$/g, '').split('\n')
        let outArr = []
        let _key = ''
        // 是否有 翻译后的歌词
        let _hasTransferLyric = false
        let _tlyric = []
        if (this.lyric.data.tlyric && this.lyric.data.tlyric.lyric) {
          _hasTransferLyric = true
          _tlyric = this.formatTLyric(this.lyric.data.tlyric.lyric.replace(/\[.*\]\s*\n/g, '').replace(/\n$/g, '').split('\n'))
        }
        for (let i = 0; i < _lyric.length; i++) {
          _key = _lyric[i].replace(/\[(.*)\].*/, function (itm, itm2) {
            return itm2.replace(/(\d+):(\d+)\.(\d+)/, function (i, j, k, l) {
              return parseInt(j) * 60 * 1000 + parseInt(k) * 1000 + parseInt(l)
            })
          })
          if (_hasTransferLyric) {
            outArr.push({
              ts: Number(_key),
              text: _lyric[i] ? _lyric[i].replace(/\[.*\](.*)/, '$1') : '',
              tText: _tlyric[_key] || ''
            })
          } else {
            outArr.push({
              ts: Number(_key),
              text: _lyric[i] ? _lyric[i].replace(/\[.*\](.*)/, '$1') : ''
            })
          }
        }
        return Object.assign([], outArr)
      }
    },
    created () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.lyricContainerHeight = this.$refs.lyricContainerRef.getBoundingClientRect().height
        }, 10)
      })
    },
    mounted () {
      const that = this
      window.onresize = function () {
        that.lyricContainerHeight = that.$refs.lyricContainerRef.getBoundingClientRect().height
        that.lyricScroll && that.lyricScroll.refresh()
      }
    },
    methods: {
      beforeScrollStart () {
        this.beforeScroll = true
      },
      touchEnd () {
        setTimeout(() => {
          // 6s后恢复歌词自动滚动
          this.beforeScroll = false
        }, 6000)
      },
      initialedScroll (scroll) {
        this.lyricScroll = scroll
      },
      formatTLyric (tlyric) {
        let outObj = {}
        if (tlyric) {
          let _key = ''
          for (let i = 0; i < tlyric.length; i++) {
            if (tlyric[i]) {
              _key = tlyric[i].replace(/\[(.*)\].*/, function (itm, itm2) {
                return itm2.replace(/(\d+):(\d+)\.(\d+)/, function (i, j, k, l) {
                  return parseInt(j) * 60 * 1000 + parseInt(k) * 1000 + parseInt(l)
                })
              })
              outObj[_key] = tlyric[i].replace(/\[.*\](.*)/, '$1')
            }
          }
        }
        return outObj
      }
    },
    components: {
      LsScroll: () => import('./LsScroll/LsScroll.vue')
    }
  }
</script>
