import  {loadCart, clearCarts}  from "../../reducers/cart";

export function pushCart(date){

    return function(dispatch){
        try{
        return dispatch(loadCart(date))
        }catch(error){}
    }
}

export function clearCart(){
    
    const vacio = []
    return function(dispatch){
        try{
        return dispatch(clearCarts(vacio))
        }catch(error){}
    }

}
