import {
    ref,
    onMounted,
    onUnmounted
} from 'vue';


export default function (tables, offNum) {
    const tableHeight = ref(0)
    onMounted(() => {
        tableHeight.value = window.innerHeight - tables.value.$el.offsetTop - offNum
        window.onresize = function () {
            tableHeight.value = window.innerHeight - tables.value.$el.offsetTop - offNum
        }
    })


    onUnmounted(() => {
        window.onresize = null
    })

    return {
        tableHeight,
        onMounted
    }
}