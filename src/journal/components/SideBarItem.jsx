import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ body, title, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onListItemButtonClick = () => {
    //it is not neccesary to create a thunk because the task is synchronic
    dispatch(setActiveNote({ body, title, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onListItemButtonClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle}></ListItemText>
          <ListItemText secondary={body}></ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
