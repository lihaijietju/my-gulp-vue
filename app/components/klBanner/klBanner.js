import tpl from '../../tpl/templates';

export default {
    template: tpl.klBanner,
    data: function() {
        return {
            itemWidth: 100,
            imageWidth: 100,
            index: 0
        }
    },
    props: {
        images: {
            required: true,
            type: Array
        }
    },
    destroyed: function() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    mounted: function() {
        var len = this.images.length;
        this.itemWidth = 100 * len;
        this.imageWidth = 100 / len;
        var vm = this;
        if (len > 1) {
            vm.timer = setInterval(function() {
                vm.index = vm.index === len - 1 ? 0 : ++vm.index;
            }, 2000);
        }
    }
}