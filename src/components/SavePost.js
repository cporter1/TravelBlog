import {savePostFormData} from '../api-calls/axios-requests'

export default function SavePost({postArray}) {

    function pushPostArray(inputArray) {
        if (inputArray == null) return;

        const formData = new FormData();

        inputArray.forEach( (element , index) => {
            if(element.type === 'image') {
                formData.append('array' , element.data)
                formData.append('array' , '$image$')
            }
            else if (element.type === 'text' && element.text !== '') {
                formData.append('array' , element.text)
            }
        })
        
        savePostFormData(formData)
    }

    return (
        <div>
            <button onClick={ () => {pushPostArray(postArray) }}>
                Save Post
            </button>
        </div>
    )
}