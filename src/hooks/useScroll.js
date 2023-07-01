import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from "underscore"

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
    const scrollTop = ref(0)
    const clientHeight = ref(0)
    const scrollHeight = ref(0)

    const scrollListenerHandler = throttle(() => {
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        console.log("监听滚动");
        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            console.log("滚动到底部了");
            isReachBottom.value = true
        }
    }, 100)
    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler)
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
    })

    return { isReachBottom, clientHeight, scrollHeight, scrollTop }
}