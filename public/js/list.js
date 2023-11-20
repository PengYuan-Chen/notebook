var content=document.getElementsByClassName('con')
var span=document.getElementsByTagName('span')

for(var i=0;i<content.length;i++){
    content[i].onmouseover=function(){
        this.childNodes[5].firstChild.style.display='block'
        this.childNodes[7].firstChild.style.display='block'
    }
    content[i].onmouseout=function(){
        this.childNodes[5].firstChild.style.display='none'
        this.childNodes[7].lastChild.style.display='none'
    }
}





