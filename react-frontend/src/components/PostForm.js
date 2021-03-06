import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, TextareaAutosize, Button } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PollIcon from "@mui/icons-material/Poll";
import NotesIcon from "@mui/icons-material/Notes";
import CommunityBar from "./CommunityBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';

const { gql, useQuery, useMutation } = require("@apollo/client");

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $community: String!) {
    createPost(title: $title, content: $content, community: $community) {
      content
    }
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

let setCommunity = undefined;

const PostForm = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [community, setCommunityLocal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  setCommunity = setCommunityLocal;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const createPostOnClick = () => {
    createPost({ variables: { content, title, community } }).then(response => setSubmitted(true));
  };
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let navigate = useNavigate() 
  useEffect(() => {
    if(submitted === true){
       navigate('../') 
    }
  }, [submitted])

  return (
    <div>
      <Box sx={{ width: 1 / 3 }}>
        <CommunityBar />
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          width: 700,
          position: "relative",
          minHeight: 200,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab
              icon={<NotesIcon />}
              iconPosition="start"
              label="Post"
              {...a11yProps(0)}
            />
            <Tab
              icon={<ImageIcon />}
              iconPosition="start"
              label="Images & Video"
              {...a11yProps(1)}
            />
            <Tab
              icon={<AttachFileIcon />}
              iconPosition="start"
              label="Link"
              {...a11yProps(2)}
            />
            <Tab
              icon={<PollIcon />}
              iconPosition="start"
              label="Poll"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={2}
              placeholder="Title"
              style={{ width: 600 }}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Box sx={{ m: 4 }} />

            <TextareaAutosize
              aria-label="minimum height"
              minRows={9}
              placeholder="Text(optional)"
              style={{ width: 600 }}
              onChange={(e) => setContent(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}></TabPanel>
        </SwipeableViews>
      </Box>
      <Button onClick={createPostOnClick}>Submit</Button>
    </div>
  );
};

export { PostForm, setCommunity };
