import { useState } from "react"
import styled from "styled-components"
import { TagInput } from "../Pages/Askquestion"

const TagEditorBox = styled.div`
  width: calc((97.2307692rem/12)*2);
  position: relative;
  margin: 8px 0 0 24px;
  display: block;
  input{
    -webkit-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0.6em 0.7em;
    border: 1px solid var(--bc-darker);
    border-radius: 3px;
    background-color: var(--white);
    color: var(--fc-dark);
    font-size: 13px;
  }
`
const TagEditorInput = styled.div`
  padding: 2px 9.1px 2px 2px;
  padding-left: 2px;
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
  cursor: text;
  background-color: var(--white);
  position: relative;
  overflow: hidden;
  white-space: normal;
  height: auto ;
  min-height: 37px ;
  -webkit-appearance: none;
  margin: 0;
  border: 1px solid var(--bc-darker);
  border-radius: 3px;
  color: var(--fc-dark);
  font-size: 13px;
  input {
    width: 19px;
    min-width: 100%;
    padding: 0;
    padding-left: calc(0.7em - 2px) ;
    height: 29px;
    box-sizing: content-box;
    border: none;
    box-shadow: none;
    outline: 0;
    background-color: transparent;
  }
  >input::placeholder{
    color: var(--black-200)
  }
`
const TagsinEditor = styled.span`
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: 6px;
  cursor: text;
  >span{
    margin: 2px;
    font-size: 12px;
    background-color: var(--powder-100);
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--powder-700);
    font-size: 12px;
    line-height: 1.84615385;
    padding-left: 4px;
    padding-right: 4px;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    min-width: 0;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button{
    align-self: center;
    background-color: transparent;
    border-width: 0;
    color: inherit;
    cursor: pointer;
    display: flex;
    height: 16px;
    justify-content: center;
    margin-left: 4px;
    padding: clamp(var(--su-static1), calc(var(--su-static1) * var(--su-base)), calc(var(--su-static1) * var(--su-base)));
    width: 16px;
  }
  svg{
    width: 14px;
    height: 14px;
    vertical-align: bottom;
    pointer-events: none;
  }
  path{
    fill: currentColor;
  }
`



function TagEditor ({tags, setTags, setTagsChecked, customOption, setCustomOption}) {
  const removeTags = (indexToRemove) => {
    let removed = tags.filter((ele, index) => index !== indexToRemove)
    setTags(removed);
    setCustomOption({...customOption,tags:removed})
  };
  const addTags = (e) => {
    const filtered = tags.filter((el) => el === e.target.value);
    if (e.target.value !== '' && filtered.length === 0) {
      setTagsChecked(true)
      setTags([...tags, e.target.value]);
      setCustomOption({...customOption,tags:[...tags, e.target.value]})
      e.target.value = '';
    } 
  };

  return(

    <TagEditorBox>
      <TagEditorInput>
       <TagsinEditor>
         {tags.map((tag, index) => (
            <span key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <button className='tag-close-icon' onClick={() => removeTags(index)}>
                <svg viewBox="0 0 14 14">
                  <path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"/>
                </svg>
              </button>
            </span>
          ))}
        </TagsinEditor>
        <input type="text" placeholder={ !tags.length ?"e.g. javascript or python" :null} 
          // value={inputValue}
          onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTags(e)
          }
        }}
        />
        <span />
      </TagEditorInput>
    </TagEditorBox>



    // <TagInput>
    //     <ul>
    //       {tags.map((tag, index) => (
    //         <li key={index}>
    //           <span>{tag}
    //             <button onClick={() => {removeTags(index)}}>&times;</button>
    //           </span>
    //         </li>
    //       ))}
    //     </ul>
    //     <input type="text" id="tags" placeholder={ !tags.length ?"e.g. javascript or python" :null}
    //       onKeyUp={(event) => {
    //         if (event.key === "Enter") {
    //           addTags(event)
    //         }
    //       }} 
    //       />
    //   </TagInput>
  )

}

export default TagEditor