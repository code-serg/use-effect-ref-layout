<div style="background-color: #083344d9; display: flex; justify-content: center; align-items: center; padding: 10px; margin-bottom: 10px">
  <p align="center">
    <img src="https://img.shields.io/github/package-json/dependency-version/code-serg/use-effect-ref-layout/react?color=blue" alt="react-js-version">
  </p>
</div>

# useEffect(), useRef(), and useLayoutEffect()

## useEffect

### Purpose:

Allows you to perform side effects in function components. <br>

### How it works:

- Executes the provided function after the component renders. <br>
- Can be used for various purposes like data fetching, setting up subscriptions, manually changing the DOM, etc.

```
useEffect(() => {
  // code to run after component renders

  return () => {
    // cleanup code (optional)
  };
}, [dependency1, dependency2]); // runs when values in dependency list change
```

- If the dependency list is omitted, the effect runs after every render.
- If the dependency list is empty ([]), the effect runs once after the initial render

## useRef, useEffectLayout, and an example of a callback

### Purpose:

- useRef: Provides a way to access the DOM directly and persist values without triggering a re-render.
- useLayoutEffect: Similar to useEffect, but it fires synchronously after all DOM mutations, making it suitable for reading layout from the DOM and synchronously re-rendering

### How it works:

- useRef: Returns a mutable ref object with a current property. Changes to a ref don't cause the component to re-render.
- useLayoutEffect: Runs synchronously immediately after React has performed all DOM updates.

```
const useCallbackRef = (callback) => {
  // code to run after the DOM updates but before the browser paints
  // Create a ref to hold the callback.
  const callbackRef = useRef(callback);

  // Use the useLayoutEffect hook to update the ref's current value with the latest version of the callback whenever the callback changes.
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Return the ref so the caller can access the latest callback via callbackRef.current.
  return callbackRef;
};
```

## When to use useLayoutEffect over useEffect?

In most cases, useEffect is what you'll need.
useLayoutEffect is beneficial when you need to make DOM measurements (like getting the position of an element) and then make DOM mutations based on that (like setting an element's position). Using useEffect in such cases might lead to flickering effects since it runs after the browser paint.

## In summary:

- useEffect: Side effects, asynchronous, non-blocking.
- useRef: Access DOM or keep a mutable reference without causing re-renders.
- useLayoutEffect: Synchronous side effects, useful when you need to measure and then modify the DOM.
