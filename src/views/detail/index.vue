<template>
  <div class="detail">
    <nav-bar class="nav-bar" right-width="70px" bg-color="rgba(0,0,0,0)" is-back>
      <template #left>
        <van-icon name="arrow-left" size="12" class="icon" color="#ffffff" />
      </template>
      <template #right>
        <span class="right">
          <van-icon name="share-o" size="12" class="icon" color="#ffffff" />
          <van-icon name="ellipsis" size="12" class="icon" color="#ffffff" />
        </span>
      </template>
    </nav-bar>

    <van-swipe :autoplay="3000" height="400" @change="handleSwipeChange">
      <van-swipe-item v-for="image in goodsDetail.itemInfo.topImages" :key="image">
        <img v-lazy="image" width="100%" height="100%" />
      </van-swipe-item>

      <template #indicator>
        <div class="indicator">
          {{ currentIndex + 1 }}/{{ goodsDetail.itemInfo.topImages.length }}
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
import { queryGoodsDetail } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    goodsDetail: {},
    currentIndex: 0,
  }),
  mounted() {
    const { iid } = this.$route.query;
    this.queryGoodsDetail(iid);
  },
  methods: {
    /** 查询商品详情 */
    async queryGoodsDetail(iid) {
      const goodsDetail = await queryGoodsDetail(iid);
      goodsDetail.detailInfo = JSON.parse(goodsDetail.detailInfo);
      goodsDetail.itemInfo = JSON.parse(goodsDetail.itemInfo);
      goodsDetail.itemParams = JSON.parse(goodsDetail.itemParams);
      goodsDetail.shopInfo = JSON.parse(goodsDetail.shopInfo);
      this.goodsDetail = goodsDetail;
    },
    handleSwipeChange(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  .icon {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 8px;
  }
  .right {
    display: flex;
    justify-content: space-evenly;
  }
}

.indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 10px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border-radius: 3px;
}
</style>
