<template>
  <div class="home">
    <nav-bar>
      <template #left>
        <van-icon name="scan" />
      </template>
      <template #center>
        <div class="search">
          <van-icon name="search" size="16" />
          <span>搜索</span>
        </div>
      </template>
      <template #right>
        <van-icon name="chat-o" />
      </template>
    </nav-bar>
    <div class="swipe-container">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="#00bfc0">
        <template v-for="item in banner">
          <van-swipe-item :key="item.id">
            <img :src="item.image" />
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
    <recommend :recommend="recommend" />
    <featured />
    <tab>
      <template v-for="item in tabs">
        <tab-item
          :key="item.type"
          :class="{ active: item.type === currentGoodsType }"
          @click.native="handleToggleTab(item.type)"
        >
          <span class="title">
            {{ item.title }}
          </span>
        </tab-item>
      </template>
    </tab>
  </div>
</template>

<script>
import { queryBanner, queryRecommend } from '@/api';
import NavBar from '@/components/nav-bar';
import Recommend from '@/components/recommend';
import Featured from '@/components/featured';
import Tab from '@/components/tab';
import TabItem from '@/components/tab-item';
export default {
  components: { NavBar, Recommend, Featured, Tab, TabItem },
  data: () => ({
    // 轮播
    banner: [],
    // 热门推荐
    recommend: [],
    tabs: [
      {
        title: '最新',
        type: 'new',
      },
      {
        title: '流行',
        type: 'pop',
      },
      {
        title: '精选',
        type: 'sell',
      },
    ],
    currentGoodsType: 'new',
  }),
  mounted() {
    this.queryBanner();
    this.queryRecommend();
  },
  methods: {
    /** 查询轮播 */
    async queryBanner() {
      this.banner = await queryBanner();
    },
    /** 查询热门推荐 */
    async queryRecommend() {
      this.recommend = await queryRecommend();
    },
    /** 切换商品类型 */
    handleToggleTab(type) {
      this.currentGoodsType = type;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  background: @theme-light-gray;
  min-height: 100vh;
}
.search {
  height: 50px;
  background: @theme-light-gray;
  border-radius: 50px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
  color: @theme-dark-gray;
  span {
    margin-left: 4px;
  }
}
.swipe-container {
  padding: 16px;
  .swipe {
    height: 370px;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.active {
  color: @theme-primary;
  font-weight: 600;
  .title {
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: @theme-primary;
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translate(-50%, 0);
    }
  }
}
</style>
