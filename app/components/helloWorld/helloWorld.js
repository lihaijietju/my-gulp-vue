import tpl from '../../tpl/templates';

export default {

    data() {
        return {
            name: "jakii321"
        }
    },
    template: tpl.helloWrld,
        
    methods:{
        increment:function(){
            //console.log(this.$root.$options.store);
            console.log(this);
        }
    }
}