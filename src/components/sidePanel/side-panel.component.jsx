import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Icon from "@material-ui/core/Icon";

const SidePanel = () => {
  /// Hooks
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  //// Handlers
  const toggleDrawer = (open) => {
    setIsPanelOpen(open);
  };

  /// Return
  return (
    <div>
      <Icon
        onClick={() => toggleDrawer(true)}
        color="secondary"
        fontSize="large"
      >
        menu
      </Icon>
      <Drawer
        anchor={"left"}
        open={isPanelOpen}
        onClose={() => toggleDrawer(false)}
      >
        <div
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SidePanel;
