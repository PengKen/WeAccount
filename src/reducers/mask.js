/**
 *
 * @param isShowMask 是否展示菜单浮层
 */

function mask(state={isShowMask:false},action) {
  switch (action.type){
    case 'show':
      return {
        ...state,
        isShowMask:true,
      };

    case 'noShow':{
      return {
        ...state,
        isShowMask:false
      }
    }

    // default:
    //   console.warn("No_type error")

  }

  return state
}

export  default mask