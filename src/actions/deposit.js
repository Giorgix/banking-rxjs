// Action factory that creates an action object
export default function deposit(payload){
    return {
        type: 'DEPOSIT',
        ...payload
    }
}