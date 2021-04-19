import React, {useState} from 'react';
import Button from './Button';
import SimpleMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'


interface Props {
    setFont: (s: string) => void
    saveNote: () => Promise<string>
  }

const Menu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [id, setId] = useState("")
  const [redir, setRedir] = useState(false)



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (font: string) => {
    props.setFont(font)
    setAnchorEl(null);
  };

  const saveButton = async () => {
    let _id = await props.saveNote()
    setId(_id)
    setRedir(true)
  }

  const renderRedir = () => {
    if (redir) {
      return <Redirect to = {id} />
    }
  }

  // const Button = withStyles({
  //   root: {
  //     height: 'clamp(7px, min(4.5vh, 6vw), 35px)',
  //     width: 'clamp(9px, 8vw, 70px)', 
  //     minWidth: '9px'
  //   },
  //   label: {
  //     textTransform: 'capitalize',
  //     fontSize: "clamp(5px, 2.5vw, 17px)"
  //   }
  // })(MaterialButton);

  return (
    <div style= {{  width: "clamp(90px, 20%, 300px", position: "absolute",  right: "2%"}}>
      {renderRedir()}
      <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color = "primary" onClick={handleClick}>
        Font
      </Button>
      <SimpleMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleClose("Impact")}>Impact</MenuItem>
        <MenuItem onClick={()=>handleClose("Helvetica")}>Helvetica</MenuItem>
        <MenuItem onClick={()=>handleClose("Monospace")}>Monospace</MenuItem>
        <MenuItem onClick={()=>handleClose("Sans-serif")}>Sans-serif</MenuItem>
        <MenuItem onClick={()=>handleClose("Comic Sans MS")}>Comic Sans MS</MenuItem>
        <MenuItem onClick={()=>handleClose("Apple Chancery")}>Apple Chancery</MenuItem>
        <MenuItem onClick={()=>handleClose("Bradley Hand")}>Bradley Hand</MenuItem>
        <MenuItem onClick={()=>handleClose("Brush Script MT")}>Brush Script MT</MenuItem>
      </SimpleMenu>
      <Button style = {{marginLeft: "10px"}} variant="contained" color = "primary" onClick={saveButton}>
        Save
      </Button>
    </div>
  );
}

export default Menu