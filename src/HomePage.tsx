import React, { useState, useEffect, useRef } from "react"
import Header from "./Header"
import { saveNotes, generateId } from "./Firebase"
import { useHistory } from "react-router-dom"

const HomePage: React.FC = () => {
  const [text, setText] = useState("")
  const [fontFamily, setFontFamily] = useState("Comic Sans MS")
  const [paper, setPaper] = useState("https://i.imgur.com/QyKroGy.png")

  let history = useHistory()

  const textRef = useRef(text);

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
  
  // Update the ref whenever text changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

	// Add keydown listener to the body of the document
	// This seems ugly but is the only way I know how in React
	useEffect(() => {
	  const saveKeybindListener = async (e: any) => {
		if ((navigator.platform.startsWith("Mac") && e.metaKey && e.key === "s")
			|| (navigator.platform.startsWith("Win") && e.ctrlKey  && e.key === "s")
			|| (navigator.platform.startsWith("Linux") && e.ctrlKey  && e.key === "s")) {

		  e.preventDefault()
		  let id = await generateId()
		  await saveNotes(id, textRef.current)
		  history.push(`/${id}`)
		}
	  }
	  document.addEventListener('keydown', saveKeybindListener);
	  
	  // Clean up with the same reference
	  return () => {
		document.removeEventListener('keydown', saveKeybindListener);
	  };
	}, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const setFont = (s: string) => {
    setFontFamily(s)
  }

  const saveNote = async () => {
    let _id = await generateId()
    await saveNotes(_id, text)
    return _id
  }

  const keybinds = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
	if (e.key === 'Tab') {
		e.preventDefault();
		let curr = e.currentTarget;
		var start = curr.selectionStart;
		var end = curr.selectionEnd;

		// set textarea value to: text before caret + tab + text after caret
		curr.value = curr.value.substring(0, start) +
			"\t" + curr.value.substring(end);

		// put caret at right position again
		curr.selectionStart =
		curr.selectionEnd = start + 1;
	}
    if ((navigator.platform.startsWith("Mac") && e.metaKey && e.key === "s")
		|| (navigator.platform.startsWith("Win") && e.ctrlKey  && e.key === "s")
		|| (navigator.platform.startsWith("Linux") && e.ctrlKey  && e.key === "s")) {

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
	tabSize: 4,
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
