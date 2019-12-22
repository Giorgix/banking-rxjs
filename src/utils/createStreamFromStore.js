import { from } from 'rxjs';
import { map, publishBehavior, refCount } from 'rxjs/operators';

// Turn the from observable into a ConnectableObservable (hot)
export default function createStreamFromStore(store) {
    return from(store).pipe(
        map(() => store.getState()),
        publishBehavior(store.getState()),
        refCount()
    );
}