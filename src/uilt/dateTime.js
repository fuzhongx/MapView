const times = [];

const today = new Date();
const startDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
); // 获取今天的日期
const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0); // 获取两周后的前一天

for (let i = 0; i < 14; i++) {
  // 因为我们想要两周内的每一天，所以循环14次
  startDate.setDate(startDate.getDate() - 1); // 增加一天
  times.push(
      `${String(startDate.getMonth() + 1).padStart(2, "0")}月${
        String(startDate.getDate()).padStart(2, "0") + "日"
      }`
    )
}

export default times;
