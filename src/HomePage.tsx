import React, {useState, useEffect} from 'react';
import Header from './Header'
import {saveNotes, generateId} from './Firebase'


const HomePage: React.FC = () => {
    const [text,setText] = useState("")
    const [fontFamily, setFontFamily] = useState("Comic Sans MS")

    useEffect(() => {
        let font = localStorage.getItem('font')
        font !== null && setFontFamily(font)
        // let Text = localStorage.getItem('text')
        // Text !== null && setText(Text)
    }, [])

    useEffect(() => {
        localStorage.setItem('font', fontFamily)
    }, [fontFamily])

    // useEffect(() => {
    //     localStorage.setItem('text', text)
    // }, [text])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const setFont = (s:string) => {
        setFontFamily(s)
    }

    const saveNote = () => {
        let id = generateId()
        saveNotes(id, text)
        return id
    }

    

    const textStyle:React.CSSProperties = {fontFamily: fontFamily, fontSize:25, fontWeight: "bold", border : "none", outline: 'none', resize: "none", marginLeft: "2%", lineHeight: 1.6, width: "95.74%", height: "88%",borderBottomLeftRadius: 20,  borderBottomRightRadius: 20,backgroundImage: "url(https://i.imgur.com/QyKroGy.png)"}


    return (
        <div style={{ height: "98.2vh", paddingTop: "1%", display: "block", backgroundImage: "url(https://cdn.wallpapersafari.com/29/47/wsCP4d.jpg)"}}>
            <Header setFont= {setFont} saveNote = {saveNote} />
            <textarea
                style= {textStyle}
                value={text}
                onChange={handleChange}
            />
        </div>
    );
    };



export default HomePage;