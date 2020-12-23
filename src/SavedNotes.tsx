import React, {useState, useEffect} from 'react';
import Header from './Header'
import {saveNotes, generateId, getRef} from './Firebase'


const HomePage: React.FC<{match: {params: {id: string}}}> = (props) => {
    const [text,setText] = useState("Loading...")
    const [fontFamily, setFontFamily] = useState("Comic Sans MS")

    useEffect(() => {
        setNote()
        let stored = localStorage.getItem('font')
        stored !== null && setFontFamily(stored)
    },[])

    useEffect(() => {
        localStorage.setItem('font', fontFamily)
    }, [fontFamily])

    let fetchNote = async () => {
        return new Promise<string>((resolve, reject) => {
          getRef(props.match.params.id).once('value', (snapshot) => {
            resolve(snapshot.val())
          })
        })
      }

    let setNote = async () => {
        setText(await fetchNote())
    }

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