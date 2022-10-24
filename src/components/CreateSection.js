
export default function CreateSection({addImage}) {



    return (
        <div> 
            <input type='file' accept="image/*"
                onChange={ event => addImage(event.target.files[0]) } 
            />
            <button>Add Textbox</button>
        </div>
    )
}