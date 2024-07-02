import React from 'react'
import SweetAlert from "react-bootstrap-sweetalert" 
const Alert = ({confirm, cancle, title, subtitle, type}) => {
  return (
    <>
    <SweetAlert
  warning
  style={{ borderRadius:"20%", boxShadow:"-1rem -1rem gray" }}
  showCancel={true}
  confirmBtnText="Yes, delete it!"
  confirmBtnBsStyle="danger"
  title="Are you sure?"
  onConfirm={confirm}
  onCancel={cancle}
  focusCancelBtn
>
  You will not be able to recover this item !
</SweetAlert>

    </>
  )
}

export default Alert
