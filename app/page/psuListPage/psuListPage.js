import tpl from '../../tpl/templates';
import klBanner from '../../components/klBanner/klBanner'
export default {
    template: tpl.psuListPage,  
    components:{
        klBanner
    },
    computed:{
        images () {
            return this.$store.state.bannerImages;
        }
    }
}