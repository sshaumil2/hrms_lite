import { CKEditor } from "ckeditor4-react";
import { useEffect, useRef } from "react";


const DynamicCKEditor = ({ data = "", onChange, config = {} }) => {
  const editorRef = useRef(null);

  // When `data` prop changes, update editor content if editor instance exists.
  useEffect(() => {
    if (editorRef.current) {
      const current = editorRef.current.getData();
      // only update when different to avoid resetting cursor
      if (data != null && current !== data) {
        editorRef.current.setData(data);
      }
    }
  }, [data]);

  return (
    <div>
      <CKEditor
      initData={data || ""}
      onInstanceReady={(evt) => {
        editorRef.current = evt.editor;
        // Immediately notify parent with (evt, editor)
        if (onChange) onChange(evt, evt.editor);
      }}
      onChange={(evt) => {
        // forward both event and editor so parent can use either signature
        if (onChange) onChange(evt, evt.editor);
      }}
      config={{
        toolbar: [
          [
            "Source",
            "Format",
            "-",
            "Bold",
            "Italic",
            "Underline",
            "-",
            "NumberedList",
            "BulletedList",
            "-",
            "Link",
            "Unlink",
          ],
        ],
        format_tags: "p;h1;h2;h3;pre",
        ...config,
      }}
    />
    </div>
  );
};

export default DynamicCKEditor;
