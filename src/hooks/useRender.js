import { useCallback, useState } from "react";
const useRender = () => {
    const [, setState] = useState(0); 
    const forceUpdate = useCallback(() => {
        setState(prevState => prevState + 1); 
    }, []);
    return forceUpdate;
}

export default useRender;