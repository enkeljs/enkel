<template>
  <div class="contents_container">
    <div class="target"
         @click="animate">
      <svg version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           x="0px"
           y="0px"
           width="1024px"
           height="512px"
           viewBox="0 0 1024 512"
           style="enable-background:new 0 0 1024 512;"
           xml:space="preserve">
        <!-- <g> -->
        <path id="path"
              d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
              style="visibility: visible; stroke-dashoffset: -20; stroke-dasharray: 330px, 633.874px;"></path>
        <!-- <path id="target"
              d="M271.23,310.22c-24.4,28.4-68.4,66-108,66c-29.2,0-42.8-26-43.6-52.4c-1.6-52.4,56.4-106,108.4-105.6c12.8,0,28.8,3.2,28.8,19.2c0,19.6-19.6,49.2-96.4,74.4l-0.8,8.8c-1.2,15.2,12,20.4,24.8,20.4c28.4,0,62-29.2,83.2-46L271.23,310.22z M221.63,245.83c0-2.8-2-5.2-4.8-4.4c-20,5.2-43.2,24.4-54,50.8C198.03,280.23,222.03,252.63,221.63,245.83z" /> -->
        <!-- <path d="M452.82,290.62l3.2,17.6c-21.2,18.8-62.4,68-91.6,68c-15.2,0-22.4-12.8-22.4-26.4c0-24,21.6-50.4,34.4-68.8l-0.8-0.8
		c-23.2,17.2-43.6,38-61.6,61.2c-6,7.6-20.8,27.2-31.6,27.2c-17.6,0-22-25.2-22.4-38.8c-1.2-27.6,24-68,47.2-87.6
		c5.2-4.4,8.8-4.8,15.6-4.8c24,0.8,22,6.4,22,8.8c0,15.6-50.4,56-50.4,65.6c0,2.4,2,4.4,4.4,4.4c2.8,0,6.4-3.6,8-5.6
		c32-40.8,105.6-90,117.2-90c1.6,0,4,2,6.4,7.6c2.4,6,4.8,13.2,6,21.6c0,15.6-49.2,46-49.2,73.6c0,3.6,3.2,7.2,7.2,7.2
		c9.6,0,27.2-14,34.4-20L452.82,290.62z" />
          <path d="M473.62,305.43l-0.8,10.8c21.6-19.6,106.4-92.8,133.6-92.8c13.6,0,20.8,17.2,20.8,28.8c0,37.2-54,57.6-80.8,73.6
		c7.6,10.4,12,16.8,26,17.6c7.6,0.4,23.2-5.2,72.8-44.8l4,16.4c-20,17.6-68,63.6-94.8,63.6c-26.4,0-44.8-30.4-57.2-49.6
		c-8.8,8-15.2,17.2-21.2,27.2c-3.2,6-6.8,12-14.4,12c-14,0-17.6-38.8-17.6-48.4c0-25.6,16-46.4,29.6-67.6
		c43.2-68,139.2-144.8,156.8-143.6c5.6,0.4,10,4.8,10,10.4C640.42,146.63,497.62,279.03,473.62,305.43z M572.82,288.23
		c6-4.4,19.2-12.8,19.2-21.2c0-2.4-3.2-3.2-5.2-3.2c-14.8,0-56.8,28-66.8,41.6c5.6,2,10.8,4.8,15.2,8.8L572.82,288.23z" />
          <path d="M792.01,310.22c-24.4,28.4-68.4,66-108,66c-29.2,0-42.8-26-43.6-52.4c-1.6-52.4,56.4-106,108.4-105.6
		c12.8,0,28.8,3.2,28.8,19.2c0,19.6-19.6,49.2-96.4,74.4l-0.8,8.8c-1.2,15.2,12,20.4,24.8,20.4c28.4,0,62-29.2,83.2-46
		L792.01,310.22z M742.42,245.83c0-2.8-2-5.2-4.8-4.4c-20,5.2-43.2,24.4-54,50.8C718.82,280.23,742.81,252.63,742.42,245.83z" />
          <path d="M913.61,310.62c-22,22.8-59.6,63.2-94,63.2c-29.2,0-35.6-28.4-35.6-52c0-42,18-87.2,44-119.2c35.2-43.6,73.2-80.8,86-80.8
		c6.8,0,8.4,9.6,8,14.8c-2.8,38-13.2,73.2-100,157.2c-3.6,6.8-4.8,18-2.8,27.6c3.6,9.2,9.2,17.2,20,17.2c22,0,52.8-25.6,68.8-40
		L913.61,310.62z M830.81,257.03c28.4-26.4,53.2-64.8,60.4-87.6c-19.6,9.6-42.4,45.6-61.2,86.8L830.81,257.03z" /> -->
        <!-- </g> -->
      </svg>
    </div>

  </div>
</template>
<style scoped>
  .contents_container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #dadada;
  }
  .target {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 400px;
    height: 400px;
    background-color: lightgray;
  }
  .target svg {
    width: 400px;
    height: 400px;
  }
  .target path {
    stroke-width: 10px;
    stroke: red;
    fill: none;
  }
  #path {
    stroke: #88ce02;
    stroke-width: 20px;
    visibility: hidden;
  }
</style>
<script>
  // import { TweenMax } from 'gsap/all'
  export default {
    name: 'contents',
    data () {
      return {
      }
    },
    mounted () {
      this.$nextTick(() => {

      })
    },
    methods: {
      animate () {
        // let ref = this.$refs.target
        // TweenMax.to(ref, 2, {
        //   backgroundColor: '#ff0000',
        //   borderRadius: '20px',
        //   left: '100px',
        //   top: '80px'
        // })
        console.log('........')
        TweenMax.to('#path', 1, { drawSVG: '100%', delay: 0.5 })
      }
    }
  }
</script>
