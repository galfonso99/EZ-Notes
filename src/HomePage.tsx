import React, { useState, useEffect } from "react"
import Header from "./Header"
import { saveNotes, generateId } from "./Firebase"
import { useHistory } from "react-router-dom"

const HomePage: React.FC = () => {
  const [text, setText] = useState("")
  const [fontFamily, setFontFamily] = useState("Comic Sans MS")
  const [paper, setPaper] = useState("https://i.imgur.com/QyKroGy.png")

  let history = useHistory()

  useEffect(() => {
    // Fetch preferences from cookies
    let font = localStorage.getItem("font")
    font !== null && setFontFamily(font)
    let paperColor = localStorage.getItem("paper")
    paperColor !== null && setPaper(paperColor)
  }, [])

  useEffect(() => {
    localStorage.setItem("font", fontFamily)
    localStorage.setItem("paper", paper)
  }, [fontFamily, paper])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const setFont = (s: string) => {
    setFontFamily(s)
  }

  const saveNote = async () => {
    let _id = generateId()
    await saveNotes(_id, text)
    return _id
  }

  const keybinds = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      e.currentTarget.setRangeText(
        "    ",
        e.currentTarget.selectionStart,
        e.currentTarget.selectionStart,
        "end"
      )
    }
    //For Mac only using the meta (Command key)
    if (navigator.platform.indexOf("Mac") === 0 && e.metaKey && e.key === "s") {
      e.preventDefault()
      let id = await saveNote()
      history.push(`/${id}`)
    }
    //For Windows only using the ctrl key
    if (navigator.platform.indexOf("Win") === 0 && e.ctrlKey  && e.key === "s") {
      e.preventDefault()
      let id = await saveNote()
      history.push(`/${id}`)
    }
  }

  const textStyle: React.CSSProperties = {
    fontFamily: fontFamily,
    fontSize: 25,
    fontWeight: "bold",
    border: "none",
    outline: "none",
    resize: "none",
    width: "100%",
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box",
    lineHeight: 1.6,
    height: "90%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundImage: `url(${paper})`,
    paddingLeft: 20,
    marginTop: 0,
  }

  return (
    <div
      style={{
        backgroundImage: "url(https://i.imgur.com/DgyfVBa.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        paddingTop: "1vh",
      }}
    >
      <div
        style={{
          height: "99vh",
          display: "block",
          marginLeft: "2vw",
          width: "96vw",
        }}
      >
        <Header
          setFont={setFont}
          saveNote={saveNote}
          setPaper={(paper: string) => setPaper(paper)}
          newPage = {true}
        />
        <textarea
          style={textStyle}
          value={text}
          onChange={handleChange}
          onKeyDown={keybinds}
        />

      </div>
    </div>
  )
}

export default HomePage
