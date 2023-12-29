import React, { useState, useEffect, useRef } from "react"
import Header from "./Header"
import { saveNotes, getRef } from "./Firebase"
import { useHistory } from "react-router-dom"

const SavedNotePage: React.FC<{ match: { params: { id: string } } }> = (props) => {
  const [text, setText] = useState("Loading...")
  const [fontFamily, setFontFamily] = useState("Comic Sans MS")
  const [paper, setPaper] = useState("https://i.imgur.com/QyKroGy.png")
  const [displayLinks, setDisplayLinks] = useState(false)
  const hasDisplayedLinks = useRef(false)

  let id = props.match.params.id
  let history = useHistory()

  useEffect(() => {
    // Fetch preferences from cookies
    let font = localStorage.getItem("font")
    font !== null && setFontFamily(font)
    let paperColor = localStorage.getItem("paper")
    paperColor !== null && setPaper(paperColor)
    let display_links = localStorage.getItem("links")
    display_links !== null && setDisplayLinks(!!display_links)
  }, [])

  useEffect(() => {
    localStorage.setItem("font", fontFamily)
    localStorage.setItem("paper", paper)
    localStorage.setItem("links", displayLinks ? "true" : "")

  }, [fontFamily, paper, displayLinks])

  // Fetch text, change site title and load Links
  useEffect(() => {
    const fetchNote = async () => {
      return new Promise<string>((resolve, reject) => {
        getRef(id).once("value", (snapshot) => {
          resolve(snapshot.val())
        })
      })
    }
    //Anonymous function to run async code inside useEffect
    (async () => {
      let _text = await fetchNote()
      // Update website title with first line of text limited to 40 characters
      document.title = _text.split("\n")[0].slice(0, 40)

      //Find links in text and display them in the box below
      let links = findLinks(_text)
      let linkDivArea = document.getElementById("linkBox")!
      linkDivArea.innerHTML = ""  //Empty the LinkArea
      links.forEach((link) => linkDivArea.innerHTML += `<a id="link" href=//${link}>${link}</a> `)

      setText(_text)
    })()
  }, [id])



  useEffect(() => {
    // Whenever the Links box is opened load all the links in the text
    if (displayLinks && !hasDisplayedLinks.current) {
      let links = findLinks(text);
      let linkDivArea = document.getElementById("linkBox")!
      linkDivArea.innerHTML = ""  //Empty the LinkArea
      links.forEach((link) => linkDivArea.innerHTML += `<a id="link" href=//${link}>${link}</a> `)
      hasDisplayedLinks.current = true
    }
    else if (!displayLinks) {
      hasDisplayedLinks.current = false
    }
  }, [displayLinks, text])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const setFont = (s: string) => {
    setFontFamily(s)
  }

  const saveNote = async () => {
    await saveNotes(id, text)
    return id
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
      await saveNote()
      history.push(`/${id}`)
    }
    //For Windows only using the ctrl key
    if (navigator.platform.indexOf("Win") === 0 && e.ctrlKey  && e.key === "s") {
      e.preventDefault()
      await saveNote()
      history.push(`/${id}`)
    }
  }

  const findLinks = (text: string) => {
    var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@%_+.~#?&//=]*)/gi;
    var regex = new RegExp(expression);
    let iter = text.matchAll(regex)
    let array = []
    for (let match of iter) {
      let string = match[0].startsWith('http') ? match[0].split('//')[1] : match[0]
      array.push(string)
    }
    return array
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
    height: displayLinks ? "80%" : "90%",
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
          setDisplayLinks={() => setDisplayLinks(!displayLinks)}
          newPage = {false}
        />
        <textarea
          style={textStyle}
          value={text}
          onChange={handleChange}
          onKeyDown={keybinds}
        />

        <div
          className="Links"
          id="linkBox"
          style={{
            ...textStyle,
            height: "10%",
            borderRadius: 20,
            marginTop: 5,
            fontSize: 18,
            overflowY: "scroll",
            backgroundImage: `url(${paper})`,
            display: (displayLinks ? "inline-block" : "none"),
          }}
        //onKeyDown={handleChange}
        //contentEditable="true"
        ></div>

      </div>
    </div>
  )
}

export default SavedNotePage 
