
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

}