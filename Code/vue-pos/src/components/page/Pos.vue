<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="140" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  <el-button type="text" size="small" @click="reduceOrderList(scope.row)">减少</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">数量：{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; 金额：{{totalMoney}}元</div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="15">
        <!-- 14+8=22 剩下的2是被leftNav占了，占了5%，即1.2，应该算成2了-->
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="good in oftenGoods" :key="good.goodsId" @click="addOrderList(good)">
                <span>{{good.goodsName}}</span>
                <span class="often-price">￥{{good.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="good in type0Goods" :key="good.goodsId" @click="addOrderList(good)">
                    <span class="foodImg">
                      <img :src="good.goodsImg" width="100%" height="60px" />
                    </span>
                    <span class="foodName">{{good.goodsName}}</span>
                    <span class="foodPrice">￥{{good.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="good in type1Goods" :key="good.goodsId" @click="addOrderList(good)">
                    <span class="foodImg">
                      <img :src="good.goodsImg" width="100%" height="60px" />
                    </span>
                    <span class="foodName">{{good.goodsName}}</span>
                    <span class="foodPrice">￥{{good.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="good in type2Goods" :key="good.goodsId" @click="addOrderList(good)">
                    <span class="foodImg">
                      <img :src="good.goodsImg" width="100%" height="60px" />
                    </span>
                    <span class="foodName">{{good.goodsName}}</span>
                    <span class="foodPrice">￥{{good.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="good in type3Goods" :key="good.goodsId" @click="addOrderList(good)">
                    <span class="foodImg">
                      <img :src="good.goodsImg" width="100%" height="60px" />
                    </span>
                    <span class="foodName">{{good.goodsName}}</span>
                    <span class="foodPrice">￥{{good.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      tmoney: 0,
      tcount: 0
    };
  },
  created: function() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5e1abb7d7f109b0caa4d2e32/vue-pos/oftenGoods"
      )
      .then(response => {
        // console.log(response);
        this.oftenGoods = response.data.oftenGoods;
      })
      .catch(error => {
        // console.log(error);
        alert("网络错误，外部数据库不能访问");
      });

    axios
      .get(
        "https://www.easy-mock.com/mock/5e1abb7d7f109b0caa4d2e32/vue-pos/typeGoods"
      )
      .then(response => {
        console.log(response);
        this.type0Goods = response.data.data[0];
        this.type1Goods = response.data.data[1];
        this.type2Goods = response.data.data[2];
        this.type3Goods = response.data.data[3];
      })
      .catch(error => {
        alert("网络错误，外部数据库不能访问");
      });
  },
  mounted: function() {
    //当所有的虚拟dom加载完成之后再进行的。el元素全部算是虚拟dom
    var orderHeight = document.body.clientHeight;
    // console.log(orderHeight);
    document.getElementById("order-list").style.height = orderHeight + "px";
  },

  // 想用computed来弄totalMoney和totalCount（和课程里的有点不同）
  computed: {
    totalMoney: function() {
      this.tmoney = 0;
      this.tableData.forEach(element => {
        this.tmoney += element.count * element.price;
      });
      console.log(this.tmoney);
      return this.tmoney;
    },
    totalCount: function() {
      this.tcount = 0;
      this.tableData.forEach(element => {
        this.tcount += element.count;
      });
      return this.tcount;
    }
  },
  methods: {
    addOrderList(goods) {
      // 商品是否已经存在于订单列表中
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true;
          // break;
        }
      }

      // 根据判断编写业务逻辑
      if (isHave) {
        // 改变列表中商品的数量
        let arr = this.tableData.filter(g => g.goodsId === goods.goodsId); //filter返回的是所有满足条件的g
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }

      // 在函数里实现tcount和tmoney的计数。注意，每次都要先把两个数据清零数据
      // tmoney = 0;
      // tcount = 0;
      // this.tableData.forEach((element)=>{
      //   this.tcount += element.count;
      //   this.tmoney = this.tmoney + (element.count * element.price);
      // })
    },
    reduceOrderList(goods){
      if(goods.count == 1){
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
      }else{
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId);
        arr[0].count--;
      }
    },
    // 删除单一商品
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
    },
    // 全部删除
    delAllGoods(){
      this.tableData = [];
      this.totalMoney = 0;
      this.totalCount = 0;
    },
    // 模拟结账
    checkout(){
      if(this.totalCount != 0){
        this.tableData = [];
        this.$message({
          message:'结账成功',
          type:'success'
        })
      }else{
        this.$message.error('没有需要结账的账单哟')
      }
    }

  }
};
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  padding-left: 10px;
  padding-right: 10px;
}
.div-btn {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}
.often-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
  margin-left: 10px;
  height: auto;
  overflow: hidden;
  border-top: 1px solid #d3dce6;
}
.cookList li {
  list-style: none;
  width: 25%;
  border: 1px solid #e5e9f2;
  height: auto;
  /* height: 50%; */
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 16px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.totalDiv {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #d3dce6;
}
</style>