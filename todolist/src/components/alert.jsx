import React from 'react';

function Alert(props) {

  const show = props.show;

  if(show) {
    return (
      <div class="alert">
        <span class="closebtn" onclick={props.setShow}></span> 
        <strong>Danger!</strong> Please, don't add a task without a description. You're not going to remember that task later.
      </div>
    );
  }
  return null;
}

export default Alert