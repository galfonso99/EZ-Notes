
import React from 'react';
import Menu from './Menu'

interface Props {
  setFont: (s: string) => void
  saveNote: () => string
}

const Header = (props: Props) => {
  return (
    <div style={{ marginLeft: "2%",height: '10%', width:"96%", borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "rgba(111, 110, 110)", alignItems: 'center', display: "flex",}}>
        <text style={{fontFamily: "Comic Sans MS", fontSize:45, fontWeight: "bold",  verticalAlign: "middle", paddingLeft: 20,WebkitTextStroke:  "1px rgba(237, 237, 131, 0.797)"}}> 
            EZ Notes
        </text>
        <Menu setFont= {props.setFont} saveNote = {props.saveNote}/>
    </div>
  );
}

export default Header;
