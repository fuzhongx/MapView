import { createI18n } from 'vue-i18n';
 
const messages = {
  zh: {
    el: {
      pagination: {
        goto: '跳至',
        pagesize: '每页显示条数',
        total: '共 {total} 条',
        pageClassifier: '页'
      }
    }
  }
};
 
const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  messages, // 设置地区信息
});
 
export default i18n;