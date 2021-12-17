import React, { useEffect, useRef, useState } from 'react';

function useIncrementNumber(delay) {
    const [count, setCount] = useState(0);

    const savedCallback = useRef(() => setCount(c => c +1));

    useEffect(() => {
        function tick(){
            savedCallback.current();
        }
        if (delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    return count;
}

export default useIncrementNumber;