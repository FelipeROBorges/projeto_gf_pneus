import {  memo } from "react";
import useAuth from "../../hooks/useAuth";
import Topbar from "./Topbar";

const TopbarWrapper = () => {
    const { signed} = useAuth();
    if (!(signed > 0)) return null;
    
    return <Topbar />;
  };
  
  export default memo(TopbarWrapper);