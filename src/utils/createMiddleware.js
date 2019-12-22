import { from, Subject } from 'rxjs';
import { merge, refCount, publish } from 'rxjs/operators';

// At the top level, the middleware accepts a store and a set of epics
export default function createMiddleware (store, epics) {

    // Creates a new private Subject instance used to
    // emit actions to both the store and the epics
    const input$ = new Subject();

    // Invokes all the factories and stores their outputs as your middleware streams
    const actions = epics.map(epic =>

        // Each factory takes the actions (input$) and state (store) to create a new stream.
        epic(input$, store));

    const combidenActions$ = from(...actions).pipe(
        // Converts that stream into a hot observable, so it’s shared
        publish()
    );


    // Feeds the output of the epic functions (action streams) so that they can get handled
    // by subsequent middleware in the chain
    combidenActions$.subscribe(input$);

    // Simultaneously sends all events to the store as well, in case it can handle them
    combidenActions$.subscribe(action => store.dispatch(action));

    // Connects the stream (makes it hot); this prevents the stream from emitting
    // before both subscribers are subscribed
    const sub = combidenActions$.pipe(refCount());

    return {
        // Returns a proxied version of dispatch that invokes
        // next on the subject (thus sending actions to the middleware)
        dispatch: (action) => input$.next(action),

        // Puts the user in control of disposing the observable middleware
        unsubscribe: () => combidenActions$.unsubscribe()
    }
}