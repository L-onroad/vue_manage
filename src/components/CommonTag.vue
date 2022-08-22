<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'Home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      size="small"
      @click="tagChange(tag)"
      @close="tagDelete(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.changeAside.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      closeTag: "closeTag",
    }),
    tagChange(item) {
      this.$router.push({ name: item.name });
    },
    tagDelete(tag, index) {
      const length = this.tags.length - 1
      this.closeTag(tag)
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  background-color: #e9eef3;
  padding: 10px;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>