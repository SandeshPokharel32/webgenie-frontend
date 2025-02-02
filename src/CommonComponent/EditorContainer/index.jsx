import React, { useRef } from "react";
import "./style.scss";
import { BiCopy, BiDownload } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Icon } from "../../assests/images/constant";
import { toast } from "react-toastify";
import Editor from '@monaco-editor/react';

const HeaderContainer = ({title, ext, codeText, action}) => {
  const handleGenerateError = () => {
    toast.info("Code Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onHandleCopy = () => {
    navigator.clipboard.writeText(codeText);
    handleGenerateError();
  };

  const onHandleDownload = (ext) => {
    const element = document.createElement("a");
    const file = new Blob([codeText], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `code.${ext}`;
    document.body.appendChild(element);
    element.click();
  };


  return (
    <div className="editorHeaderContainer">
      <p className="headerText">{title}</p>
      <div className="actionConatiner">
        <div className="actionSelectionContainer">
          <div>
            <img src={Icon.ReactColorVector} alt="react icon"/>
          </div>

          <p className="actionText"> React</p>
          <div>
            <MdKeyboardArrowDown
              size={24}
              color="white"
              style={{ marginTop: "2px" }}
            />
          </div>
        </div>

        <div className="headerItem" onClick={() => onHandleDownload(ext)}>
          <BiDownload size={18} color="#939393" />
        </div>
        <div className="headerItem" onClick={() => onHandleCopy()}>
          <BiCopy size={18} color="#939393" />
        </div>
      </div>
    </div>
  );
};

function CodeEditor({ parentId, value, ...props }) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (<Editor
    width="100%"
    height="100%"
    defaultLanguage="javascript"
    value={value}
    onMount={handleEditorDidMount}
    theme="vs-dark"
    options={{
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      automaticLayout: true
    }}
    {...props}
  />)
}

const EditorContainer = ({ solution }) => {
  const htmlCode = solution?.html || ''
  const cssCode = solution?.css || ''
  return (
    <div className="editorContainer">
      <div className="CodePathContainer code-container">
        <HeaderContainer title="HTML Code" ext="jsx" codeText={htmlCode} action="code" />
        <div id="editor-parent-1" className="editor-parent">
          <CodeEditor parentId="editor-parent-1" value={htmlCode} defaultLanguage="html" />
        </div>
      </div>
      <div className="CSSPathContainer code-container">
        <HeaderContainer title="CSS Code" ext="css" codeText={cssCode} action="css" />
        <div id="editor-parent-2" className="editor-parent">
          <CodeEditor parentId="editor-parent-2" value={cssCode} defaultLanguage="css" />
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
