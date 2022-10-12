<script setup lang="ts">

</script>
        
<template>
    <div class="container">
        <QTimeline color="secondary" class="tl">
            <QTimelineEntry subtitle="10月1日" title="食費">
                <p>メモを記入メモを記入メモを記入メモを記入メモを記入メモを記入</p>
            </QTimelineEntry>
            <QTimelineEntry subtitle="9月30日" title="交通費">
                <p>メモを記入メモを記入メモを記入メモを記入メモを記入メモを記入</p>
            </QTimelineEntry>
        </QTimeline>
    </div>
</template>
        
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    padding: 24px;
}
.tl {
    width: fit-content;

    p {
        width: 300px;
        max-width: 100%;
    }
}
</style>