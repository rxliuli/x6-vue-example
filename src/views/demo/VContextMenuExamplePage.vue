<template>
  <div>
    <button type="button" @click="show">显示</button>
    <button type="button" @click="hide" :style="{ marginLeft: '6px' }">
      隐藏
    </button>
  </div>

  <div ref="box" class="wrapper" style="margin-top: 8px">
    <code>显示区域</code>
  </div>

  <VContextmenu ref="contextmenu">
    <VContextmenuItem>菜单 1</VContextmenuItem>
    <VContextmenuItem>菜单 2</VContextmenuItem>
  </VContextmenu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  version,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup,
} from 'v-contextmenu'

console.log('VContextmenu version:', version)

export default defineComponent({
  name: 'ExampleCustomTrigger',

  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    [ContextmenuDivider.name]: ContextmenuDivider,
    [ContextmenuSubmenu.name]: ContextmenuSubmenu,
    [ContextmenuGroup.name]: ContextmenuGroup,
  },

  setup() {
    const box = ref<HTMLDivElement>()
    const contextmenu = ref<HTMLDivElement>()
    return {
      box,
      contextmenu,
      show() {
        const targetDimensions = box.value.getBoundingClientRect()
        const postition = {
          top:
            Math.random() * targetDimensions.height +
            targetDimensions.top +
            window.scrollY,
          left:
            Math.random() * targetDimensions.width +
            targetDimensions.left +
            window.scrollX,
        }
        console.log('show: ', box, contextmenu, postition)
        contextmenu.value.show(postition)
      },

      hide() {
        contextmenu.value.hide()
      },
    }
  },
})
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  border: 3px dashed rgba(90, 167, 164, 0.9);
  border-radius: 8px;
  background-color: rgba(90, 167, 164, 0.2);
}

button {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  background-color: #4fa8b6;
  font-size: inherit;
  color: #fff;
  cursor: pointer;
  opacity: 0.9;
}

button:hover {
  opacity: 0.8;
}

button:active {
  opacity: 1;
}

button:focus {
  outline: none;
}
</style>
