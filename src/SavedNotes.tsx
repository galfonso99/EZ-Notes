import React, {useState, useEffect} from 'react';
import Header from './Header'
import {saveNotes, getRef} from './Firebase'


const HomePage: React.FC<{match: {params: {id: string}}}> = (props) => {
    const [text,setText] = useState("Loading...")
    const [fontFamily, setFontFamily] = useState("Comic Sans MS")

    useEffect(() => {
        const setNote = async () => {
            setText(await fetchNote())
        }
        const fetchNote = async () => {
            return new Promise<string>((resolve, reject) => {
              getRef(props.match.params.id).once('value', (snapshot) => {
                resolve(snapshot.val())
              })
            })
        }
        setNote()
        let stored = localStorage.getItem('font')
        stored !== null && setFontFamily(stored)
    },[props.match.params.id])

    useEffect(() => {
        localStorage.setItem('font', fontFamily)
    }, [fontFamily])

    

    

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const setFont = (s:string) => {
        setFontFamily(s)
    }

    const saveNote = () => {
        let id = props.match.params.id
        saveNotes(id, text)
        return id
    }

    const textStyle:React.CSSProperties = {fontFamily: fontFamily, fontSize:25, fontWeight: "bold", border : "none", outline: 'none', resize: "none", width: "100%",WebkitBoxSizing: "border-box", MozBoxSizing: "border-box", boxSizing: "border-box"  ,lineHeight: 1.6, height: "88%",borderBottomLeftRadius: 20,  borderBottomRightRadius: 20,backgroundImage: "url(https://i.imgur.com/QyKroGy.png)", paddingLeft: 20}


    return (
        <div style={{ backgroundImage: "url(https://cdn.wallpapersafari.com/29/47/wsCP4d.jpg)", paddingTop: "1vh"}}>
            <div style = {{height: "99vh", display: "block", marginLeft: "2vw", width:"96vw"}}>
            <Header setFont= {setFont} saveNote = {saveNote} />
            <textarea
                style= {textStyle}
                value={text}
                onChange={handleChange}
            />
            </div>
        </div>
    );
    };



export default HomePage;