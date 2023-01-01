export default function Post() {

    this.addTextbox = function(stateFunction , array) {

        stateFunction([...array, 
            {
                type: 'text',
                text: ''
            }
        ])
    }

    this.addImage = function(file , stateFunction , array) {
        if (file == null) return;

        stateFunction([...array,  
            {   
                type: 'image',
                text: '',
                data: file,
                url: URL.createObjectURL(file) 
            } ]
        )
    }

    this.encodePostArray = function(inputArray) {
        if (inputArray == null) return;

        const formData = new FormData();

        inputArray.forEach( (element , index) => {
            if(element.type === 'image') {
                formData.append('array' , element.data)
                formData.append('caption' , element.text)
                formData.append('array' , '$image$')
            }
            else if (element.type === 'text' && element.text !== '') {
                formData.append('array' , element.text)
            }
        })
        return formData
    }

}