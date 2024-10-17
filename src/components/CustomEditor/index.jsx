import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = ({ defaultValue, showTextEditorData, toolbarPosition }) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const _contentState = ContentState.createFromText("Ad Text");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  // console.log("defaultValue ", defaultValue);
  // console.log("raw ", JSON.stringify(raw));

  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleOnBlur = (event, editorState) => {
    showTextEditorData(contentState);
  };

  useEffect(() => {
    if (defaultValue != "") {
      const contentState = convertFromRaw(defaultValue);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  return (
    <Editor
      defaultContentState={contentState}
      editorState={editorState}
      onChange={setContentState}
      onEditorStateChange={setEditorState}
      toolbarOnFocus
      onBlur={handleOnBlur}
      toolbarClassName={`absolute z-[100] w-[500px] h-[110px] rounded-lg bg-gray-200 ${
        toolbarPosition === "top" ? "top-[-112px] left-[-5px]" : "bottom-[-112px] left-[-5px]"
      }`}
      toolbar={{
        options: [
          "inline",
          // "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
        ],
      }}
    />
  );
};

export default CustomEditor;
