```jsx
import React, { useEffect } from 'react';
import { fromEvent, interval } from 'rxjs';
import { buffer, map, filter, debounce } from 'rxjs/operators';

const Demo = () => {
  const buttonEl = React.useRef(null);

  useEffect(() => {
    const clickStream = fromEvent(buttonEl.current, 'click');
    clickStream.subscribe((clickety) => console.log({ clickety }));
    return () => clickStream.unsubscribe();
  }, []);

  return (
    <button ref={buttonEl} type="button">
      Click Me
    </button>
  );
};

export default Demo;
```
