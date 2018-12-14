
function images(
    state={images:[]},action) {

    switch (action.type){
        case 'addImage':
            const { images } = state
           images.push(action.image)
            return {
                ...state,
                images
            };

        case 'deleteImage':{
            state.images.splice(action.index,1)
            return {
                ...state,
                images:state.images
            }
        }

        // default:
        //   console.warn("No_type error")

    }

    return state
}

export  default images