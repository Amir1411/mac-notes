import React from "react";
import styles from "./Button.module.scss";

const CollapseBtn = (props) => {
  const handleCollapse = () => {
    props.collapseFn(!props.activeSidebar);
  };
  return (
    <button className={styles.btn} onClick={handleCollapse}>
      {props.activeSidebar ? (
        <i className="fa fa-caret-square-o-right" />
      ) : (
        <i className="fa fa-caret-square-o-left" />
      )}
    </button>
  );
};

export default CollapseBtn;
