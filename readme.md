

## 開發流程
w3
- 準備模板
- 登入功能
- 產品列表
- 新增產品 tempProduct 預先準備欄位存放
  - 開啟 Modal
  - 新增品項
- 更新產品
- 刪除產品

---
w4
- 拆分 Pagination
- 拆分 Product Modal

---

都是空值的差異
null       由開發者加入
undefined  由系統產生

助教寫法    let productModal = null; 空值
卡斯伯寫法  let productModal = {}; 空物件空字串
兩者最後結果相同