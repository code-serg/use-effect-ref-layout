// Import necessary React hooks and React itself.
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// A custom hook that keeps a stable reference to a callback.
// This is useful when you want to keep a reference to the latest version of a callback without re-creating some effects or other hooks.
const useCallbackRef = (callback) => {
  // Create a ref to hold the callback.
  const callbackRef = useRef(callback);

  // Use the useLayoutEffect hook to update the ref's current value with the latest version of the callback whenever the callback changes.
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Return the ref so the caller can access the latest callback via callbackRef.current.
  return callbackRef;
};

// The main custom hook to fetch data.
export const useFetch = (options) => {
  // State to hold the fetched data.
  const [data, setData] = useState(null);

  // Use the useCallbackRef hook to keep a stable reference to the onSuccess callback.
  const savedOnSuccess = useCallbackRef(options.onSuccess);

  // This effect hook is responsible for fetching data when the URL changes.
  useEffect(() => {
    console.log('useFetch useEffect rendering');

    // Check if a URL is provided.
    if (options.url) {
      // A flag to know if the fetch operation should be considered cancelled.
      let isCancelled = false;

      // Make a fetch request to the provided URL.
      fetch(options.url)
        .then((res) => res.json())
        .then((json) => {
          // If the operation isn't cancelled, call the onSuccess callback and set the data.
          if (!isCancelled) {
            savedOnSuccess.current?.(json);
            setData(json);
          }
        });

      // This function is returned from the effect and will run if the component using the hook is unmounted or if the URL changes.
      return () => {
        // Set the flag to true, indicating any ongoing fetch operation should be considered cancelled.
        isCancelled = true;
      };
    }
  }, [options.url, savedOnSuccess]); // This effect runs whenever the URL changes.

  // Return the fetched data.
  return { data };
};

// LESSONS
// for useEffect, the second argument is an array of dependencies
// if the dependencies change, the effect is run again
// if the dependencies are [], the effect is run only once
// if the dependencies are not provided, the effect is run every time the component renders
// #### Constrain the dependency array to only the values that are being used...
// #### Use primitive values (strings, numbers ,booleans) in the dependencies array whenever possible - bc they are compared by value

// So what about functions?, like the savedOnSuccess callback
// use the useCallbackRef hook to keep a stable reference to the onSuccess callback.
// This is useful when you want to keep a reference to the latest version of a callback without re-creating some effects or other hooks.
// useRef and useLayoutEffect
