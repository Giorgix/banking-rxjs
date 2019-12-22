// Action factory that creates an action object
export default function withdraw(payload){
    return {
        type: 'WITHDRAW',
        ...payload
    }
}