import { onMounted, onUnmounted, ref } from "vue"

// 方法一：
// export default function useScroll(reachBottomCB) {
//     const scrollListenerHandler = () => {
//         const clientHeight = document.documentElement.clientHeight
//         const scrollTop = document.documentElement.scrollTop
//         const scrollHeight = document.documentElement.scrollHeight
//         if (clientHeight + scrollTop >= scrollHeight) {
//             console.log("滚动到底部了");
//             if (reachBottomCB) reachBottomCB()
//         }
//     }

//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })

//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })
// }
// 方法二：
export default function useScroll() {
    const isReachBottom = ref(false)

    const scrollListenerHandler = () => {
        const clientHeight = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        if (clientHeight + scrollTop >= scrollHeight) {
            console.log("滚动到底部了");
            isReachBottom.value = true
        }
    }
    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler)
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
    })

    return { isReachBottom }
}