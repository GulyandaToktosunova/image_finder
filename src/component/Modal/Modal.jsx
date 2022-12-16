import React, { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
const myModal = document.getElementById("modal-root");
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onCloseModal);
  }
  onCloseModal = (e) => {
    if (e.currentTarget.classList.contains(styles.backdrop)) {
      this.props.closeModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.backdrop} onClick={this.onCloseModal}>
        <div className={styles.modalContent}>{children}</div>
      </div>,
      myModal
    );
  }
}
