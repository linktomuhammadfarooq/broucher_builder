import { ContentState, convertToRaw } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = ({ defaultValue }) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const _contentState = ContentState.createFromText(defaultValue);
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  return (
    <Editor
      defaultContentState={contentState}
      onChange={setContentState}
      toolbarOnFocus
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
