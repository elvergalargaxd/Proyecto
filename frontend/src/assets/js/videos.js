let listVideo =document.querySelectorAll('.video-list .vid');
let mainVideo =document.querySelectorAll('.main-video .video');
let title =document.querySelectorAll('.main-video .title');




listVideo.forEach(video=>{
    video.onclick =()=>{
        listVideo.forEach(vid=> vid.classList.remove('active'));
        video.classList.add('active');
        if(video.classList.contains('active')){
            let src =video.children[0].getAttribute('src');
            //mainVideo.src=src;
            //console.log(mainVideo.src);
            document.getElementById('video').setAttribute('src',src);
            let text=video.children[1].innerHTML;
            document.getElementById('titulo').innerHTML=text;
            //title.innerHTML=text;
            //console.log(title.innerHTML);
            let desc=video.children[2].innerHTML;
            document.getElementById('descripcion').innerHTML=desc;
        };
    };
});

$(document).ready(function(){
    $('video').bind('contextmenu',function() { return false; });
 });