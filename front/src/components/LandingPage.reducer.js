
import { UPDATE_PRICE } from './LandingPage.actions'
export default function (state = { price: 0.0 }, action) {
    switch (action.type) {
        case UPDATE_PRICE:
        return {...state, price: action.payload}
        
        default: return state;
    }
}