import {
    ref,
    onMounted
} from 'vue';


export default function (tables, offNum) {
    const tableHeight = ref(0)
    onMounted(() => {
        console.log(tables);
        tableHeight.value = window.innerHeight - tables.value.$el.offsetTop - 200
        window.onresize = function () {
            tableHeight.value = window.innerHeight - tables.value.$el.offsetTop - 200
        }
    })

    return {
        tableHeight,
        onMounted
    }
}