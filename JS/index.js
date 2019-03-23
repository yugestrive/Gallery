// 翻面控制
function turn(e){
    console.log(e);
    var cls = e.className;
    console.log(cls);
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/,'photo_back');
    }else{
        cls = cls.replace(/photo_back/,'photo_front');
    }
    return e.className = cls;
}
//通用函数
function g(selector){
    var method = selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById'
    return document [method](selector.substr(1));
}
//输出所有的海报
var data = data;

function addphotos(){
    var template = g('#wrap').innerHTML;
    var html = [];
    for(s in data){
        var _html = template
        .replace('{{index}}',s)
        .replace('{{img}}',data[s].img)
        .replace('{{caption}}',data[s].caption)
        .replace('{{desc}}',data[s].desc);
        html.push(_html);
        console.log(data.length)
    }
    g('#wrap').innerHTML = html.join('');
    rsort( random([0,data.length]) );
    
}
addphotos();

//排序海报
function rsort(n){
    var _phone = g('.photo');
    var photo = [];
    for(s=0;s<_phone.length;s++){
        _phone[s].className = _phone[s].className.replace(/\s*photo_center\s*/,'');
        photo.push(_phone[s]);
    }
    var photo_center = g('#photo_' + n);
    photo_center.className += " photo_center";
    photo_center = photo.splice(n,1)[0];
    console.log(photo.length)

    var photo_left = photo.splice(0, Math.ceil(photo.length/2) );
    var photo_right = photo;

    var ranges = an();
    for(s in photo_left){
        var pic = photo_left[s];

        pic.style.left = random(ranges.left.x)+ 'px';
        pic.style.top = random(ranges.left.y)+ 'px';

        pic.style['transform'] = 'rotate('+random([-150,150])+'deg)';
        pic.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
        pic.style['-moz-transform'] = 'rotate('+random([-150,150])+'deg)';
    }
    for(s in photo_right){
        var pic = photo_right[s];

        pic.style.left = random(ranges.right.x)+ 'px';
        pic.style.top = random(ranges.right.y)+ 'px';

        pic.style['transform'] = 'rotate('+random([-150,150])+'deg)';
        pic.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
        pic.style['-moz-transform'] = 'rotate('+random([-150,150])+'deg)';
    }
}

//随机生成一个数,支持取值范围；random( [min,max] );
function random(range){
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    var dif = max - min;
    var number = Math.ceil( Math.random()*dif+min);
    return number;
}

//计算左右分区的范围
function an(){
    var an = { left:{ x:[] , y:[] } ,right:{ x:[] , y:[] } };

    var wrap = {
        w:g('#wrap').clientWidth,
        h:g('#wrap').clientHeight,
    }
    var photo = {
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight,
    }
    an.wrap = wrap;
    an.photo = photo;

    an.left.x = [0-photo.w,wrap.w/2-photo.w/2];
    an.left.y = [0-photo.h,wrap.h];

    an.right.x = [wrap.w/2+photo.w/2 , wrap.w+photo.w ];
    an.right.y = an.left.y;

    return an;
}
