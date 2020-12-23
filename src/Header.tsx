
import React, {useState,} from 'react';
import Menu from './Menu'
import {Redirect, Link, NavLink} from 'react-router-dom'

//var Touchable = require('react-touchable')

interface Props {
  setFont: (s: string) => void
  saveNote: () => string
}

const Header = (props: Props) => {

  const [redir, setRedir] = useState(false)

  const renderRedir = () => {
    if (redir) {
      return <Link to = "/" />
    }
  }

  const onTap = () => {
    setRedir(true)
  }

  return (
    <div style={{ marginLeft: "2%",height: '8%', width:"96%", borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "rgb(167, 167, 167)", alignItems: 'center', display: "flex",}}>
        {renderRedir()}
        

        <a style = {{color: "inherit", textDecoration: "none"}} href = "/">
        <text style={{fontFamily: "Comic Sans MS", fontSize:45, fontWeight: "bold",  verticalAlign: "middle", paddingLeft: 20,WebkitTextStroke:  "1px rgba(237, 237, 131, 0.797)"}}> 
            EZ Notes
        </text>
        </a>
        <Menu setFont= {props.setFont} saveNote = {props.saveNote}/>
    </div>
  );
}

export default Header;


//<button style = {{backgroundColor: "transparent", border: "none"}} onClick = {onTap}>