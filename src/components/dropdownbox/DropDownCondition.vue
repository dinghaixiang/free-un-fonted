<template>
  <div class="drop-down">
    <label class="drop-down-label">{{title}}</label>
    <span  class="drop-down-span">:</span>
    <div class="drop-down-box">
      <div class="drop-down-box-view" @click="changeIsShow">{{selectedName}}
        <i class="icon iconfont drop-icon">&#xe7ac;</i>
      </div>
      <div class="drop-down-box-drop" v-show="isShow">
        <ul>
          <li @click="selectOption('', '-请选择-')" :class="{ selected:isSelected('')}">-请选择-</li>
          <li v-for="option in options" @click="selectOption(option.code, option.name)" :class="{ selected:isSelected(option.code)}">{{option.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedCode: '',
        selectedName: '-请选择-'
      };
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      showIndex: {
        required: true
      },
      showFlags: {
        required: true
      }
    },
    computed: {
      isShow () {
        return this.showFlags[this.showIndex];
      }
    },
    methods: {
      changeIsShow () {
        event.stopPropagation();
        this.$emit('changeShow', this.showIndex);
      },
      isSelected  (code) {
        return this.selectedCode === code;
      },
      selectOption (code, name) {
        this.isShow = false;
        this.selectedCode = code;
        this.selectedName = name;
        this.$emit('selectOption', code);
      }
    },
    watch: {
      options: function (val, oldVal) {
        console.log('测试联动');
        if (val !== oldVal) {
          this.selectedCode = '';
          this.selectedName = '-请选择-';
        }
      }
    }
  };

</script>

<style lang="less">
  @import '../../assets/styles/base.less';
  .drop-down{width: 300px;height: 32px;display: flex;    cursor: pointer;}
  .drop-down-label{text-align: justify;color:#303030;height: 100%; text-align-last: justify;vertical-align: middle;  display: inline-block;  width: 20%; }
  .drop-down-label:before{content: '';  display: inline-block;  height: 100%;  vertical-align: middle;}
  .drop-down-span{display: inline-block;color:#303030;height: 100%;text-align: left;width: 3%; vertical-align: middle;}
  .drop-down-span:before{content: '';  display: inline-block;  height: 100%;  vertical-align: middle;}
  .drop-down-box{ position: relative;width: 77%;height: 100%; color: @input-font-color;display: inline-block}
  .drop-down-box::after{clear: both}
  .drop-down-box-view{border: 1px solid gainsboro;border-radius: 4px;height: 100%;width: 100%;display:inline-block;vertical-align:middle;box-sizing: border-box;padding: 0px 5px;font-size: 12px}
  .drop-down-box-view:before{content: '';  display: inline-block;  height: 100%;  vertical-align: middle;}
  .drop-icon{position: absolute;font-size: 12px!important; left: 90%;  top: 0px;font-size: 12px;height:100%;margin-top:3%;display: inline-block;vertical-align: middle;}
  .drop-down-box-drop{position: absolute; z-index: 1111;font-size:12px;  background-color: rgba(255, 255, 255,0.95 );  width: 100%; box-sizing: border-box;border: 1px solid gainsboro;border-radius: 4px;top: 0px;}
  .drop-down-box-drop ul{max-height: 150px;overflow: auto}
  .drop-down-box-drop li{height: 30px;  line-height: 30px;font-size:12px;padding: 0px 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
  .drop-down-box-drop li:hover{background-color: gainsboro}

  .selected{color:#303030}

</style>
