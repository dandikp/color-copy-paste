import * as React from "react"

declare function require(path: string): any

const { Tip, Button } = require("react-figma-plugin-ds")
const { AnimatePresence, motion } = require("framer-motion")

function copyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea")
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    var successful = document.execCommand("copy")
    var msg = successful ? "successful" : "unsuccessful"
    console.log("Fallback: Copying text command was " + msg)
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err)
  }

  document.body.removeChild(textArea)
}

const Pallete = (props: any) => {
  return (
    <div className="content">
      <Tip iconName="import">Click color to copy to clipboard</Tip>

      <div className="grid">
        <AnimatePresence>
          {props.colors.map((item: any, i: number) => {
            return (
              <motion.div
                key={i}
                className="color"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ backgroundColor: item.color }}
                onClick={() => {
                  copyTextToClipboard(item.color)
                }}
              >
                <div
                  className="remove"
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newColors = props.colors.filter(
                      (filterItem: any) => filterItem.color !== item.color
                    )
                    props.setColors(newColors)
                    localStorage.setItem("colors", JSON.stringify(newColors))
                  }}
                >
                  x
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="actions">
        <div className="action-row">
          <Button
            isSecondary={true}
            className="button"
            onClick={async () => {
              props.setCurrentPage("home")
            }}
          >
            Open Camera
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pallete
