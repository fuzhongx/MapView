const today = new Date();
const startDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
); // 获取今天的日期
const times = `${String(startDate.getFullYear()).padStart(2, "0")}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;

export default times;
