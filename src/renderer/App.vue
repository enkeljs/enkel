<template>
  <div id="app">
    <headers class="headers"></headers>
    <div class="main">
      <!-- <router-view></router-view> -->
      <input v-model="messageBox.title" type="text" placeholder="title" />
      <input v-model="messageBox.body" type="text" placeholder="body" />

      <button class="btn" @click="notificate">通知</button>
    </div>
  </div>
</template>

<script>
import Headers from './components/parts/headers.vue'
// const { ipcRenderer } = require('electron')

export default {
  name: 'enkel',
  data () {
    return {
      messageBox: {
        title: '这是标题',
        body: '这是内容',
        icon: ''
      }
    }
  },
  components: {
    Headers
  },
  mounted () {
  },
  methods: {
    notificate () {
      // ipcRenderer.send('notificate', this.messageBox)
      let notificate1 = new Notification(this.messageBox.title + '.....', {
        body: this.messageBox.body
      })
      notificate1.onclick = () => {
        alert('notificate clicked')
      }
    }
  }
}
</script>

<style>
/* CSS */
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-user-select: none;
}
.headers {
  position: absolute;
  width: 100%;
  height: 64px;
  left: 0;
  top: 0;
  overflow: hidden;
}
.main {
  position: absolute;
  left: 0;
  top: 64px;
  width: 100%;
  height: calc(100% - 64px);
  overflow: auto;
}

.btn {
  padding: 4px 10px;
}
</style>
