<template>
  <div class="home_container">
    <div class="home_header_container">
      <div class="back" @click="back" v-if="currentCommand !== 'NoCommand'">
        < 返回
      </div>
      <div class="logout" @click="logout">退出</div>
    </div>
    <div class="home_body_container">
      <transition name="fade">
        <component :is="currentCommand" :options="commandOptions" :current-user="currentUser"></component>
      </transition>
    </div>
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .home_header_container {
    position: relative;
    width: 100%;
    height: 36px;
    font-size: 13px;
    color: #333;
  }
  .back {
    position: absolute;
    top: 0;
    left: 10px;
    padding: 0 10px 0 0;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .logout {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 0 10px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .home_body_container {
    width: 100%;
    height: calc(100% - 36px);
  }
</style>
<script>
  const electron = require('electron')
  export default {
    name: 'Home',
    data () {
      return {
        currentUser: {},
        currentCommand: 'NoCommand',
        commandOptions: {},
        commands: this.$store.state.Main.commands,
        sseUrl: this.$store.state.Main.sseUrl
      }
    },
    created () {
      this.$nextTick(() => {
        this.syncCurrentUser()

        electron.remote.ipcMain.on('login-status', res => {
          if (res.status === 200) {
            // 登录成功
            this.syncCurrentUser()
          }
        })
        this.connect({
          id: this.currentUser.robot.uuid
        })
      })
    },
    methods: {
      logout () {
        electron.remote.ipcMain.emit('logout', {})
      },
      syncCurrentUser () {
        let currentUser = electron.remote.getGlobal('currentUser')
        if (currentUser && currentUser.username) {
          this.currentUser = currentUser
        }
      },
      back () {
        this.currentCommand = 'NoCommand'
      },
      connect (args) {
        let sse = new EventSource(`${this.sseUrl}?id=${args.id}&mt=command`)
        sse.addEventListener('command', this.getNewCommand)
      },
      getNewCommand (evt) {
        let _message = JSON.parse(evt.data)
        this.currentCommand = _message.message.action
        switch (this.currentCommand) {
          case this.commands.playMusic:
            this.commandOptions = _message.message.audio
            break
          default:
            break
        }
      }
    },
    components: {
      NoCommand: () => import('./commands/NoCommand.vue'),
      PlayMusic: () => import('./commands/PlayMusic.vue')
    }
  }
</script>
