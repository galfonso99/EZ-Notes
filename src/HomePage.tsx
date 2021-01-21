import React, {useState, useEffect} from 'react';
import Header from './Header'
import {saveNotes, generateId} from './Firebase'

const HomePage = () => {
    const [text,setText] = useState("")
    const [fontFamily, setFontFamily] = useState("Comic Sans MS")

    useEffect(() => {
        let font = localStorage.getItem('font')
        font !== null && setFontFamily(font)
        // let Text = localStorage.getItem('text')
        // Text !== null && setText(Text)

        /*
        const textarea = document.querySelector('textarea')!
        textarea.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault()

            textarea.setRangeText(
            '    ',
            textarea.selectionStart,
            textarea.selectionStart,
            'end'
            )
        }
        }) */
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

    const tab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            e.currentTarget.setRangeText(
                '    ',
                e.currentTarget.selectionStart,
                e.currentTarget.selectionStart,
                'end'
            )
        }
    }      

    const textStyle:React.CSSProperties = {fontFamily: fontFamily, fontSize:25, fontWeight: "bold", border : "none", outline: 'none', resize: "none", width: "100%",WebkitBoxSizing: "border-box", MozBoxSizing: "border-box", boxSizing: "border-box"  ,lineHeight: 1.6, height: "88%",borderBottomLeftRadius: 20,  borderBottomRightRadius: 20,backgroundImage: "url(https://i.imgur.com/QyKroGy.png)", paddingLeft: 20}


    return (
        <div style={{ backgroundImage: "url(https://cdn.wallpapersafari.com/29/47/wsCP4d.jpg)", paddingTop: "1vh", width: "100vw"}}>
            <div style = {{height: "99vh", display: "block", marginLeft: "2vw", width:"96vw"}}>
            <Header setFont= {setFont} saveNote = {saveNote} />
            <textarea
                style= {textStyle}
                value={text}
                onChange={handleChange}
                onKeyDown = {tab}
            />
            </div>
        </div>
    );
};

export default HomePage;