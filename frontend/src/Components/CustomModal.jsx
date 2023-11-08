import ReactDOM from "react-dom";
import React from "react";

const CustomModal = ({ open, onClose, children }) => {

    let show, setShow;
    show = open;
    setShow = (show) => {
        onClose(show);
    }

    const toggle = () => onClose(!show);
    const [domReady, setDomReady] = React.useState(false)

    React.useEffect(() => {
        setDomReady(true);
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "";
        };
    }, [])
    React.useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = getScrollBarWidth() + "px";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "";
        }
    }, [show])
    function getScrollBarWidth() {
        let el = document.createElement("div");
        el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
        document.body.appendChild(el);
        let width = el.offsetWidth - el.clientWidth;
        el.remove();
        return width;
    }


    return <>
        {(
            domReady ? ReactDOM.createPortal(
                show ?
                    <div
                        className={`${show ? 'block' : 'hidden'} grid place-items-center fixed top-0 left-0 z-50 h-screen w-screen bg-black/25 overscroll-none overflow-auto `} onClick={toggle}>
                        {Array.isArray(children) ? children.map((item, index) => {
                            return <item.type {...item.props} key={index} onClick={(e) => e.stopPropagation()} />
                        }) : <children.type {...children.props} onClick={(e) => e.stopPropagation()} />}
                    </div >
                    : null
                , document.body) : null)}
    </>

}

const CustomModalClose = ({ children }) => {

    return children;

}
export default CustomModal;
