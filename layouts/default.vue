<template>
    <div class="flex flex-col h-screen">
        <div class="">
            <headerC />
        </div>

        <div class="mt-12 p-3 flex-1 bg-slate-300 flex flex-col min-w-full">
            <div class="p-3 bg-white flex flex-col w-2/3 mx-auto">
                <nuxt />
            </div>
        </div>

        <div class="footer-wrapper">
            <footerC />
        </div>
    </div>
</template>