export default function Post() {

    this.addTextbox = function(stateFunction , array) {

        stateFunction({ 
            body: [...array, 
                {
                    type: 'text',
                    text: '',
                    id: Math.random()
                }],
            changeBodyArray: true
        })
    }

    this.addImage = function(file , stateFunction , array) {
        if (file == null) return;

        stateFunction({
            body: [...array,  
                {   
                    type: 'image',
                    text: '',
                    data: file,
                    url: URL.createObjectURL(file),
                    id: Math.random() 
                }],
            changeBodyArray: true
        })
    }

    this.encodePostArray = function(inputArray) {
        if (inputArray == null) return;

        const formData = new FormData();

        inputArray.forEach( (element , index) => {
            if(element.type === 'image' && element.url) {
                formData.append('array' , element.data) // main array
                formData.append('text' , element.text) // caption array
                formData.append('array' , '$image$')}
            else if(element.type === 'image') { // file already in s3
                formData.append('array' , '$oldimage$' 
                    + element.filename )
                formData.append('text' , element.text)
            }
            else if (element.type === 'text' && element.text !== '') {
                formData.append('array' , element.text)
            }
        })
        return formData
    }

}