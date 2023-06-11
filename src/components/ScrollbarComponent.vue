<script setup lang="ts">
</script>

<script lang="ts">
export default {
    data() {
        return {
            windowTop: 0,
            display: false,
            pos: {
                top: 0,
                y: 0
            },
            pageScrollHeight: 0, 
        }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);  
        const resizeObserver = new ResizeObserver(entries => {
            console.log('New Height: ' + entries[0].target.clientHeight);
            this.pageScrollHeight = entries[0].target.clientHeight;
            this.onScroll();

            this.display = (entries[0].target.clientHeight - window.innerHeight) > 0;
        });

        resizeObserver.observe(document.body);
    },
    methods: {
        onScroll() {
            if (window.top == null) return;
            this.windowTop = (window.top.scrollY / (this.pageScrollHeight - window.innerHeight)) * 100;
        },
        onMouseDown(e: any) {
            e.preventDefault();
            e.stopPropagation();

            if (window.top == null) return;

            this.pos = {
                top: window.top.scrollY,
                y: e.clientY
            }
            document.addEventListener('mousemove', this.onDrag);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseUp() {
            document.removeEventListener('mousemove', this.onDrag);
            document.removeEventListener('mouseup', this.onMouseUp);
        },
        onDrag(e: any) {
            
            const dy = (e.clientY - this.pos.y) * (this.pageScrollHeight / (window.innerWidth - 200));

            e.preventDefault();
            e.stopPropagation();

            console.log(e);

            window.scrollTo(0, dy);
        },
    }
}
</script>

<template>
    <div class="scrollbar-container transition-all" :class="{'opacity-0': !display}">
        <div class="scrollbar-track">
            <div class="scrollbar-handle-container" :style="{ top: `${windowTop}%` }" ref="handle">
                <div class="scrollbar-handle transition-all">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.scrollbar-container {
    z-index: 50;

    padding-bottom: 20px;
    padding-top: 105px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    width: 32px;
    height: 100%;
    right: 0;
    background-color: transparent;

    .scrollbar-track {
        width: 4px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;

        .scrollbar-handle-container {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            height: 0;
            width: inherit;

            .scrollbar-handle {
                position: absolute;
                width: 16px;
                height: 16px;
                background-color: rgba(255, 255, 255, 1);
                transform: rotate(45deg);

                /*
                &:hover {
                    transform: scale(1.25);
                }
                */
            }
        }
    }
}

@media (max-width: 64rem) {
    .scrollbar-container {
        padding-top: 80px;
    }
}

</style>