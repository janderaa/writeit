var textGen = null;
const textBox = document.getElementById("text-rw");
const form = document.getElementById("search-form");
// definition of events

form.addEventListener("submit",async (event)=>{
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

/*
Is this necessary?
textBox.addEventListener("mouseleave",(element)=>{
    textBox.style.backgroundColor = "red";
})
*/
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

function activate_focus(element){
    element.style.backgroundColor = 'orange';
}

function deactivate_focus(element){
    element.style.backgroundColor = 'red';
}

window.onkeydown = (e)=>{
    if(textGen)
        if(textGen.content.length >0){
            text_writing_process(e.key);
            if(textGen.content.length == 0){
                end_writing_process();
            }
        }
}
