import React, { useRef } from 'react'
import Navbar from './Navbar'
import tranDg from './img/tdg.png'

function App() {
  const editableDivRef = useRef(null)

  const colorNumbers = () => {
    const div = editableDivRef.current
    if (!div) return

    let text = div.innerHTML
      .replace(/<\/?span[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .replace(/<div[^>]*>/g, '')
      .replace(/<\/div[^>]*>/g, '<br>')

    text = text.split('<br>')
    let str = ''

    let line = 0,
      state = 0,
      spanLen = `<span style="color: blue;"></span>`.length

    for (let s of text) {
      line++
      let i = 0,
        cntNum = 0,
        pos = 0
      s += '$'
      while (i < s.length) {
        switch (state) {
          case 0: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 2
              pos = i
            }
            i++
            break
          }
          case 2: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 2
            } else if (s[i] === '.') {
              state = 3
            } else if (s[i] === 'E') {
              state = 5
            } else {
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )
              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          case 3: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 4
            } else {
              i = i - 1
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )
              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          case 4: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 4
            } else if (s[i] === 'E') {
              state = 5
            } else {
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )

              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          case 5: {
            if ('+-'.indexOf(s[i]) !== -1) {
              state = 6
            } else if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 7
            } else {
              i = i - 1
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )
              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          case 6: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 7
            } else {
              i = i - 2
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )
              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          case 7: {
            if ('0123456789'.indexOf(s[i]) !== -1) {
              state = 7
            } else {
              let num = ''
              for (let j = pos; j < i; j++) {
                num += s[j]
              }
              s =
                s.slice(0, pos) +
                `<span style="color: blue;">${num}</span>` +
                s.slice(i)
              console.log(
                'Line ',
                line,
                ' Column ',
                pos + 1 - cntNum * spanLen,
                ': ',
                num,
              )
              i = i + spanLen
              pos = i
              cntNum++
              state = 0
            }
            i++
            break
          }
          default: {
            state = 0
            pos = i
          }
        }
      }

      str += '<div>' + s.slice(0, s.length - 1) + '</div>'
    }

    div.innerHTML = str
  }

  return (
    <div className="App">
      <Navbar />
      <img
        src={tranDg}
        alt="Transition Diagram"
      />
      <div
        ref={editableDivRef}
        contentEditable="true"
        className="textbox"
      >
        <div>Sample Case: </div>
        <div>10djfkjd2434.34rkjf33</div>
        <div>24kjdf343 394E23kjf 3.45E12</div>
        <div>242. 35E 23.56E-</div>
      </div>
      <br />
      <button onClick={colorNumbers}>Get Numbers</button>
      <br />
    </div>
  )
}

export default App
