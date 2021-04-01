/**
 * LICENSED UNDER THE GPLv3 LICENSE, SEE MORE INFORMATION AT THE LICENSE.TXT FILE
 * (begone, "the neo enviorenment" of big tech companies or just shady people)
 * 
 * Open source project for exposing a simple case of providing a simple service
 * by simple means.
 * 
 * If you see any errors, bugs, recommendations on anything please open an issue
 * or mail me on github.
 */


var textGen = null;
const textBox = document.getElementById("text-rw");
const form = document.getElementById("search-form");
const button = document.getElementById("search-button");

// definition of events
textBox.addEventListener("focusin",(event)=>{
    textBox.style.backgroundColor = "orange";
})

textBox.addEventListener("focusout",(event)=>{
    textBox.style.backgroundColor = "red";
})

// Take in mind the origin=?
form.addEventListener("submit",async (event)=>{
    const query = textBox.value;
    const req = new APIManager('action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30',"search",query);
    const data = await req.handle_query(event);
    if(data){
        const reqContent = new APIManager('action=query&prop=extracts&explaintext=&format=json&&origin=*&exintro=1&titles='+data.title,"content");
        const dataCont = await reqContent.handle_query(event);
        if(dataCont){
            textGen = new textGenManager(dataCont, button, textBox);
            textGen.show_content();
            console.log(dataCont);
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!");
    }
});

// this is how a spyware starts
window.onkeydown = (e)=>{
    if(textGen)
        if(textGen.content.length >0){
            text_writing_process(e.key);
            if(textGen.content.length == 0){
                end_writing_process();
            }
        }
}

function text_writing_process(char){
    //console.log(char);
    //console.log(textGen.contentArray[0]);
    char = char==="Enter"? "\n" : char;
    if(char === textGen.contentArray[0]){
        textGen.hide_character();
    }
}

function end_writing_process(){
    console.info("Writting finished");
    textGen = null;
}


