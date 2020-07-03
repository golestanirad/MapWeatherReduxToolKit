import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AgreeDialog = (props) => {
  /// Props
  const { showDialog, handleAgree, handleDisagree, title, content } = props;
  ///  Hooks
  /// Return
  return (
    <div>
      <Dialog
        open={showDialog}
        aria-labelledby="popup dialog"
        aria-describedby="you need to agree to be able to continue"
      >
        <DialogTitle id="alert-dialog-title"> 
         {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AgreeDialog;
