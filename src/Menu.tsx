import React, { useState } from 'react';
import Button from './Button';
import SimpleMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import { Redirect } from 'react-router-dom'


type Props = {
  setFont: (s: string) => void
  setHeader: (header: string) => void
  setPaper: (paper: string) => void
  setDisplayLinks: () => void
  saveNote: () => Promise<string>
}

const Menu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorTheme, setAnchorTheme] = React.useState<EventTarget & SVGSVGElement | null>(null);
  const [id, setId] = useState("")
  const [redir, setRedir] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  window.onresize = () => setWidth(window.innerWidth)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (font: string) => {
    props.setFont(font)
    setAnchorEl(null);
  };

  const handlePageClose = (theme: string) => {
    props.setPaper(theme)
    setAnchorTheme(null);
  };

  const handleHeaderClose = (theme: string) => {
    props.setHeader(theme)
    setAnchorTheme(null);
  };

  const handleDisplayClose = () => {
    props.setDisplayLinks()
    setAnchorTheme(null);
  }

  const saveButton = async () => {
    let _id = await props.saveNote()
    setId(_id)
    setRedir(true)
  }

  const renderRedir = () => {
    if (redir) {
      return <Redirect to={id} />
    }
  }

  const changeCursor = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    (e.target as HTMLButtonElement).style.cursor = 'pointer';
  }

  return (
    <div style={{ width: "clamp(130px, 20%, 300px", position: "absolute", right: "2%", display: "flex" }}>
      {renderRedir()}
      <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick}>
        Font
      </Button>
      <SimpleMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("Impact")}>Impact</MenuItem>
        <MenuItem onClick={() => handleClose("Helvetica")}>Helvetica</MenuItem>
        <MenuItem onClick={() => handleClose("Monospace")}>Monospace</MenuItem>
        <MenuItem onClick={() => handleClose("Sans-serif")}>Sans-serif</MenuItem>
        <MenuItem onClick={() => handleClose("Comic Sans MS")}>Comic Sans MS</MenuItem>
        <MenuItem onClick={() => handleClose("Apple Chancery")}>Apple Chancery</MenuItem>
        <MenuItem onClick={() => handleClose("Bradley Hand")}>Bradley Hand</MenuItem>
        <MenuItem onClick={() => handleClose("Brush Script MT")}>Brush Script MT</MenuItem>
      </SimpleMenu>
      <Button style={{ marginLeft: "10px" }} variant="contained" color="primary" onClick={saveButton}>
        Save
      </Button>
      <SettingsIcon
        fontSize={width >= 565 ? "large" : "default"}
        color="primary"
        style={{ position: 'relative', top: '0px', left: '5px' }}
        aria-controls="color-theme" aria-haspopup="true"
        onClick={event => setAnchorTheme(event.currentTarget)}
        onMouseOver={changeCursor}
      />
      <SimpleMenu
        id="color-theme"
        anchorEl={anchorTheme}
        keepMounted
        open={Boolean(anchorTheme)}
        onClose={handlePageClose}
      >
        <MenuItem onClick={() => handleHeaderClose("rgb(249,98,243)")}>Pink Header</MenuItem>
        <MenuItem onClick={() => handleHeaderClose("rgb(61,247,244)")}>Aqua Header</MenuItem>
        <MenuItem onClick={() => handleHeaderClose("rgb(121,68,34)")}>Brown Header</MenuItem>
        <MenuItem onClick={() => handleHeaderClose("rgb(168,169,173)")}>Gray Header</MenuItem>
        <MenuItem onClick={() => handlePageClose("https://i.imgur.com/b7A8HkO.png")}>Blue Page</MenuItem>
        <MenuItem onClick={() => handlePageClose("https://i.imgur.com/BwRfQkw.png")}>Red Page</MenuItem>
        <MenuItem onClick={() => handlePageClose("https://i.imgur.com/TqFhJMh.png")}>Green Page</MenuItem>
        <MenuItem onClick={() => handlePageClose('https://i.imgur.com/QyKroGy.png')}>Yellow Page</MenuItem>
        <MenuItem onClick={handleDisplayClose}>Display Links</MenuItem>

      </SimpleMenu>
    </div>
  );
}


export default Menu