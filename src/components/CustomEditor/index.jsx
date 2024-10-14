import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = ({ defaultValue, showTextEditorData }) => {
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
    console.log("ON Blur callback => ", contentState);
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
      toolbarClassName="absolute w-[500px] h-[100px] top-[-110px] left-[-5px]"
      toolbar={{
        options: [
          "inline",
          "blockType",
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
