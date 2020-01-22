<template>
  <div class="home">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { ContactList, Toast, ContactEdit, Popup } from "vant";// Toast因为在组件里没有用到，所以不用注册
export default {
  name: "contactList",
  components: {
    //  组件库的按需引用
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup,
  },
  data() {
    return {
      // {
      //  id:1,
      //  name:'',
      //  tel:''
      // }
      list: [],
      instance: null, //axios实例
      showEdit:false, //编辑弹窗的显隐
      editingContact:{}, //正在编辑的联系人数据
      isEdit:false, //新建(false)或者编辑(true)
    };
  },
  created() {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000
    });
    this.instance
      .get("/contactList")
      .then(res => {
        // console.log(res)
        this.list = res.data.data;
      })
      .catch(err => {
        console.log(err);
        Toast("请求失败，请稍后重试");
      });
  },
  methods: {
    // 添加（新建）联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
    },
    // 编辑联系人
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      this.editingContact = info;
    },
    // 保存联系人
    onSave() {

    },
    // 删除联系人
    onDelete() {

    },
  }
};
</script>

<style scoped>
  .van-popup{
    height: 100%;
  }
</style>