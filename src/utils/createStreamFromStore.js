import { from } from 'rxjs';
import { map, publishBehavior, refCount } from 'rxjs/operators';

// Turn the from observable into a ConnectableObservable (hot)
export default function createStreamFromStore(store) {
    console.log('store from utils: ', store);
    
    return from(store).pipe(

        // store.getState() is called twice, so that subscribers always receive
        // the latest state changes.
        map(() => store.getState()),

        // publishBehavior() is a flavor of a multicast (hot) operator that emits
        // the latest value to all subscribers.
        publishBehavior(store.getState()),

        // Makes this stream go live as soon as the first observer subscribes
        refCount()
    );
}