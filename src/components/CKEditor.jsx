import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Alignment, ClassicEditor, FontColor, FontFamily, Heading } from "ckeditor5";
import { Essentials, Paragraph, Bold, Italic } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { Field } from "formik";
import { useState } from "react";

const CKeditor = ({name}) => {
    const [placeholder ,setPlaceholder] =useState("توضیحات مربوط به این محصول" )
    return (
        <Field>
            {(props) => {
                return <CKEditor
                    editor={ClassicEditor}
                    config={{
                        licenseKey: "GPL",
                        plugins: [Essentials, Paragraph, Bold, Italic, FontColor, Alignment, Heading, FontFamily],
                        toolbar: ["undo", "redo", "|", "bold", "italic", "fontColor", "Alignment", "Heading", "fontFamily"],
                        fontFamily: { options: ["BYekan"] },
                        alignment :{options :["right"]}
                    }}
                    data={props.form.values[name] || placeholder}

                    onChange={(event, editor) => {
                        const data = editor.getData()
                        props.form.setFieldValue(name,data)
                    }}
                    
                    onFocus={(event,editor)=>{
                      editor.getData()== `<p>${placeholder}</p>` ? editor.setData("") : null ;
                    }}
                />
            }}
            
        </Field>
    );
}

export default CKeditor;
