import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TinyEditor({ value, onChange }) {
  return (
    <Editor
      apiKey="u68okfjg95p7tf20uwqe2quir4xdo7rgk8cj08bogec3dkta"
      value={value}
      onEditorChange={(newContent) => {
        onChange(newContent);
      }}
      init={{
        height: 450,
        menubar: false,
        placeholder: "Enter your content here...",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
      }}
    />
  );
}

export default TinyEditor;
