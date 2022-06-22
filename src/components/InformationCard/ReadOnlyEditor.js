import React from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";

export default function ReadOnlyEditor({ storedState }) {
  console.log(storedState)
  const currContent = convertFromRaw(JSON.parse(storedState));
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(currContent)
  );
  return (
    <div className="readonly-editor">
      <Editor editorState={editorState} readOnly={true} />
    </div>
  );
}
