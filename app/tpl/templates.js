export default { 
    "helloWrld": "<div><h1>hello world {{name}}</h1><button @click=\"increment\">点我</button></div>",
    "klBanner": "<div class=\"kl-banner\"><div class=\"banner-wrap\"><div class=\"banner-item\" :style=\"{width: itemWidth+'%',marginLeft:(-100*index)+'%'}\"><a v-for=\"image in images\" :style=\"{width: imageWidth+'%'}\" href=\"javascript:;\"><img :src=\"image\" alt=\"\"></a></div><div class=\"banner-index\" v-if=\"images.length>1\"><ul><li v-for=\"(image,index1) in images\" :class=\"{active:index===index1}\" class=\"banner-index-item\"></li></ul></div></div></div>",
    "psuListPage": "<klBanner :images=\"images\"></klBanner>",
    "testPage": "<link rel=\"stylesheet\" href=\"https://unpkg.com/mint-ui/lib/style.css\"><hello-world></hello-world>"
};