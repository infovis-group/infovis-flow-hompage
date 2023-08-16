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

    console.log(tables);
    console.log(tableHeight.value);


    })


    onUnmounted(() => {
        window.onresize = null
    })

    return {
        tableHeight,
        onMounted
    }
}