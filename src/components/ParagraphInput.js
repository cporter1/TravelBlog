import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// use ReactQuill for text editor. 
// on change saves value to post array object at the index

export default function ParagraphInput({className, index, defaultValue , onChange}) {

    let modules = {'toolbar': false}

    return <ReactQuill className={className} defaultValue={defaultValue} modules={modules} 
        onChange={(value) => {onChange(value,index)}} preserveWhitespace={true}/>
 
}