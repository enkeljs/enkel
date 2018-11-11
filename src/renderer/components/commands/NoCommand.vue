<template>
  <div class="no_command_container">
    <div class="avatar_container">
      <img :src="currentUser.headIcon"/>
    </div>
    <div class="user_info_container">
      <p>
        Username: <span class="" v-text="currentUser.robot.username"></span>
      </p>
      <p>
        Password: <span class="" v-text="currentUser.robot.password"></span>
      </p>
    </div>
    <div class="loading_container">
      <img src="http://www.sucaijishi.com/uploadfile/2013/0527/20130527034917143.gif" alt=""/>
    </div>
  </div>
</template>
<style scoped>
  .no_command_container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .avatar_container {
    width: 84px;
    height: 84px;
    border-radius: 42px;
    overflow: hidden;
    border: 2px solid #f5f5f5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_container img {
    width: 80px;
  }
  .loading_container {
    max-width: 70px;
  }
  .loading_container img {
    max-width: 70px;
  }
  .user_info_container {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .user_info_container p {
    line-height: 40px;
  }
</style>
<script>
  export default {
    name: 'NoCommand',
    props: {
      currentUser: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
      }
    },
    components: {}
  }
</script>
