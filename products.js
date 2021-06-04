// 使用 CDN ES module 引入
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

// 定義接近全域變數，任何元件下都可以使用，全域都可呼叫

// 都是空值的差異
// null       由開發者加入
// undefined  由系統產生

// 助教寫法    let productModal = null; 空值
// 卡斯伯寫法  let productModal = {}; 空物件空字串
// 兩者最後結果相同

// 所以也可改用Ray助教寫法 let productModal = null;
// 為何是用空物件呢？因為 new bootstrap.Modal(document.getElementById('productModal')); 回傳的結果是物件
let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/api',
      apiPath: 'jiangsvue3',
      products: [], // 產品列表
      isNew: false, //判斷點到哪個按鈕 編輯或是建立新的資料
      tempProduct: { // 稍後調整資料使用的結構
        // imagesUrl: [], //額外的結構 第二層
      },
    }
  },
  mounted() {
    //取得產品列表要先取得 token ，要驗證 （此段程式碼在）MDN 有
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token; // token 會加到 headers 裡面

    // Bootstrap 實體 modal 元件
    // https://bootstrap5.hexschool.com/docs/5.0/components/modal/
    // 把 new bootstrap 加到 productModal 變數裡面（變數是跨域的方式調用 ）
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

    this.getProducts();
  },
  methods: {
    //取得產品列表，要取得產品列表要先取得 token
    getProducts() {
      const url = `${this.apiUrl}/${this.apiPath}/admin/products`;
      axios.get(url) // 發出取得產品列表的請求
        .then((res) => { //接收回應
          console.log(res);
          if (res.data.success) { //如果資料狀態成功
            this.products = res.data.products // 第11行 products = 回傳回來的 products 結果
          } else {
            alert('失敗'); // 帶入錯誤訊息
          }
        })
    },
    openModal(isNew, item) {
      // this.isNew = isNew; //“新增” 這件事情先存起來，如果是新的就走isNew的方法
      if (isNew === 'new') {
        //暫存，清空的手法
        this.tempProduct = {
          // imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    //新增圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');

    },
    //新增產品 商品建立的 api
    //會有兩種狀態作切換

    updateProduct() {
      let url = `${this.apiUrl}/${this.apiPath}/admin/product`;

      let method = 'post';
      if (!this.isNew) {//如果不是新增，是編輯，則套用 put 
        url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'; //如果不是新增，是編輯，則套用 put 
      }
      // 套用method這個變數（陣列取值）
      axios[method](url, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) { //資料成功

            productModal.hide(); //關閉 modal
            this.getProducts(); //重新取得產品列表
          } else {
            alert(res.data.success);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    // 刪除產品方法
    delProduct() {
      const url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
        .then((response) => {
          if (response.data.success) {
            alert('成功!', '產品刪除成功', 'success');
            delProductModal.hide();
            this.getData();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },

  }
});


app.mount('#app');