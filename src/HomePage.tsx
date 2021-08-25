import React, { useState, useEffect } from "react"
import Header from "./Header"
import { saveNotes, generateId, getRef } from "./Firebase"
import { Redirect } from "react-router-dom"

const HomePage: React.FC<{ match: { params: { id: string } } }> = (props) => {
  const [text, setText] = useState("")
  const [fontFamily, setFontFamily] = useState("Comic Sans MS")
  const [paper, setPaper] = useState("https://i.imgur.com/QyKroGy.png")
  const [id, setId] = useState(props.match.params.id)
  const [redir, setRedir] = useState(false)

  const isNewNote = !props.match.params.id

  useEffect(() => {
    !isNewNote && setText("Loading...")
    let font = localStorage.getItem("font")
    font !== null && setFontFamily(font)
    let paperColor = localStorage.getItem("paper")
    paperColor !== null && setPaper(paperColor)
  }, [isNewNote])

  useEffect(() => {
    if (isNewNote) return
    const fetchNote = async () => {
      return new Promise<string>((resolve, reject) => {
        getRef(props.match.params.id).once("value", (snapshot) => {
          resolve(snapshot.val())
        })
      })
    }
    // setText state and change site title
    ;(async () => {
      let _text = await fetchNote()
      setText(_text)
      // Update website title with first line of text limited to 20 characters
      document.title = _text.split("\n")[0].slice(0, 20)
    })()
    console.log(document.title)
  }, [props.match.params.id, isNewNote])

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
    let _id = isNewNote ? generateId() : id
    await saveNotes(_id, text)
    setId(_id)
    return _id
  }

  const redirect = () => {
    if (redir) {
      return <Redirect to={id} />
    }
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
    if (e.metaKey && e.key === "s") {
      e.preventDefault()
      await saveNote()
      isNewNote && setRedir(true)
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
    height: "88%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundImage: `url(${paper})`,
    paddingLeft: 20,
    marginTop: 0
  }

  return (
    <div
      style={{
        backgroundImage: "url(https://i.imgur.com/DgyfVBa.jpeg)",
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        paddingTop: "1vh",
      }}
    >
      {redirect()}
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
