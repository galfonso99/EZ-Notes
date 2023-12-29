
import React, {useState, useEffect} from 'react';
import Menu from './Menu'

interface Props {
  setFont: (s: string) => void
  setPaper: (paper: string) => void
  setDisplayLinks?: () => void
  saveNote: () => Promise<string>
  newPage: boolean
}

const Header = (props: Props) => {

  const [header, setHeader] = useState("rgb(168,169,173)")

  useEffect(() => {
    let _header = localStorage.getItem('header')
    _header !== null && setHeader(_header)
  }, [])

  useEffect(() => {
    localStorage.setItem('header', header)
}, [header])

  return (
    <div style={{ height: '8vh', width: "96vw",borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: header, alignItems: 'center', display: "flex",}}>
        
        <a style = {{color: "inherit", textDecoration: "none"}} href = "/">
        <text style={{fontFamily: "Comic Sans MS", fontSize: "clamp(15px, min(4vh, 6vw), 130px)", fontWeight: "bold",  verticalAlign: "middle", paddingLeft: 20,WebkitTextStroke:  "1px rgba(237, 237, 131, 0.797)"}}> 
            EZ Notes
        </text>
        </a>
        <Menu 
        setFont= {props.setFont} 
        saveNote = {props.saveNote} 
        setHeader = {(header: string) => setHeader(header)} 
        setPaper = {props.setPaper} 
        setDisplayLinks = {props.setDisplayLinks} 
        newPage = {props.newPage}
      />
    </div>
  );
}

export default Header;
