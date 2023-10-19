import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
    const {pathname} = useLocation();
    useEffect(()=>{
        window.scroll(0,0);
    },[pathname])
  return <Fragment>{props.children}</Fragment>;
};

export default ScrollToTop;