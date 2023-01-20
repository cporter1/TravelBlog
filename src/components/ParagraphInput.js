import { useEffect } from "react";

export default function ParagraphInput({className, defaultValue , onKeyDown}) {

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const id = makeid(7)

    function enableTab(id) {
        let comp = document.getElementById(id)
        
        comp.onkeydown = function(e) {
            if(e.key === 'Tab') {
                let val = this.value
                let start = this.selectionStart
                let end = this.selectionEnd

                this.value = val.substring(0, start) + '\t' + val.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;

                return false;
            }
            if(e.key === '') {
                let val = this.value
                let start = this.selectionStart
                let end = this.selectionEnd

                this.value = val.substring(0, start) + ' ' + val.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;

                return false;
            }
        }
    }

    useEffect(()=> {
        enableTab(id)
    })
    
    return (
        <textarea id={id} className={className} defaultValue={defaultValue} onKeyDown={onKeyDown}/>
    )
}