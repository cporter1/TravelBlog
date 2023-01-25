import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// className 'ql-container' impacts the textbox

export default function ParagraphInput({className, index, defaultValue , onChange}) {

    let modules = {'toolbar': false}

    return <ReactQuill className={className} defaultValue={defaultValue} modules={modules} 
        onChange={(value) => {onChange(value,index)}} preserveWhitespace={true}/>
 
}