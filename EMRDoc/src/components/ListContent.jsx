import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AuthContext } from "./AuthContext";

export default function ListContent() {
  const { isLogin, logout } = useContext(AuthContext);

  return (
    <List>
      <ListItem key={"Add"} disablePadding>
        <ListItemButton>
          <ListItemText primary={"Add Record"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"Search"} disablePadding>
        <ListItemButton>
          <ListItemText primary={"Search"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"Settings"} disablePadding>
        <ListItemButton>
          <ListItemText primary={"Settings"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"Logout"} disablePadding>
        <ListItemButton onClick={() => logout()}>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
