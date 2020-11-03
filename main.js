var textGen = null;

const form = document.getElementById("search-form").addEventListener("submit",async (event)=>{
    const query = document.getElementById("search-input").value; 
    const req = new APIManager('action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30',"search",query);
    const data = await req.handle_query(event);
    
    if(data){
        const reqContent = new APIManager('action=query&prop=extracts&explaintext=&format=json&&origin=*&exintro=1&titles='+data.title,"content");
        const dataCont = await reqContent.handle_query(event);
        if(dataCont){
            textGen = new textGenManager(dataCont);
            textGen.show_content();
            console.log(dataCont);
            
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!");
    }
});

function text_writing_process(char, ctrl, shift){
    // textGen array needs to at least have 1 char!

    let character = "";
    
    // normal
    if(ctrl){
        
    }else if(shift){
        switch(char){
            case "0":
                character = "=";
                break;
            case "1":
                character = "!";
                break;
            case "2":
                character = '"';
                break;
            case "3":
                character = "·";
                break;
            case "4":
                character = "$";
                break;
            case "5":
                character = "%";
                break;
            case "6":
                character ="&";
                break;
            case "7":
                character = "/";
                break;
            case "8":
                character ="(";
                break;
            case "9":
                character = ")";
                break;
            default: 
                character = char.toUpperCase();
                break;
        }
    }else{
        character = char;
    }

    console.log(character);
    console.log(textGen.contentArray[0]);
    if(character === textGen.contentArray[0]){
        textGen.hide_character();
    }
    // ending
}

window.onkeydown = (e)=>{
    let ctrl = e.ctrlKey ? true : false;
    let shift = e.shiftKey ? true : false; 
    if(textGen.content.length >0){text_writing_process(e.key, ctrl, shift);}
}
