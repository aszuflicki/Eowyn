export const UPDATE_PRICE = "UPDATE_PRICE";
export const updatePrice = (price) => {
    
    return {
        type: UPDATE_PRICE,
        payload: price
    }
}