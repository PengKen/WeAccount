/*
    noShow:隐藏主菜单modal

    show:显示主菜单modal
 */

function toggleMask(type) {
  if(type)
    return {type:'noShow'}
  else
    return {type:'show'}
}



export default toggleMask