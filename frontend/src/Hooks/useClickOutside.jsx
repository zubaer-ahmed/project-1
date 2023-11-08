import React from "react";
const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handleClick);
        }, 0);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);

    return ref;
};

export { useOutsideClick };