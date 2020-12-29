
import React from 'react';
import Menu from './Menu'

interface Props {
  setFont: (s: string) => void
  saveNote: () => string
}

const Header = (props: Props) => {



  return (
    <div style={{ height: '8vh', width: "96vw",borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "rgb(167, 167, 167)", alignItems: 'center', display: "flex",}}>
        
        <a style = {{color: "inherit", textDecoration: "none"}} href = "/">
        <text style={{fontFamily: "Comic Sans MS", fontSize: "xx-large", fontWeight: "bold",  verticalAlign: "middle", paddingLeft: 20,WebkitTextStroke:  "1px rgba(237, 237, 131, 0.797)"}}> 
            EZ Notes
        </text>
        </a>
        <Menu setFont= {props.setFont} saveNote = {props.saveNote}/>
    </div>
  );
}

export default Header;
