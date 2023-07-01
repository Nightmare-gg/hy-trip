import dayjs from "dayjs";
// 格式化日期
export function formatMonthDay(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr)
}
// 计算日期差
export function getDiffDays(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day")
}