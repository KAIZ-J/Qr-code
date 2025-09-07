 const analysis =  document.getElementById("analysis")
        const outputDiv = document.getElementById("output-div")
        const form = document.getElementById("form")
        const input = document.getElementById("input");
        const size = document.getElementById("size");
        const format = document.getElementById("format");
        const color = document.getElementById("color");
        const bgcolor = document.getElementById("bgcolor")
        const container = document.getElementById("image-holder");
        const fileInput = document.getElementById("file-input");
        const formScan = document.getElementById("form-scan");
        const scanOutput = document.getElementById("scanOutput")
     function getImage(){
        outputDiv.style.transform="translateX(0)";
     container.innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size.value}&data=${input.value}&color=${color.value.split("#")[1]}&bgcolor=${bgcolor.value.split("#")[1]}" class="img" onload="loaded(this)">`
     input.value="";
     let text = document.createElement("span");
     text.textContent="Generating";
     text.id="dots";
     container.append(text);
        }
        function loaded(elem){
            elem.parentElement.querySelector("span").remove();
            analysis.textContent="Your Qr code is ready"
        }
        form.addEventListener("submit",(e)=>{
            if(input.value===""){
                alert("input empty");
                return;
            }
        e.preventDefault();
        getImage()
                }
        )
       async function downloadFile(){
            try{
  let response = await fetch(document.querySelector("img").src);
  let data = await response.blob();
  let url = URL.createObjectURL(data);
 let link = document.createElement("a");
    link.href = url; 
    link.download = `qr-code_${Date.now()}.${format.value}`;
    link.click();
   setTimeout(()=> URL.revokeObjectURL(url),1000)
            }
            catch(err){
console.log("couldn't fecth",err)
            }
        }
        document.getElementById("genNew").addEventListener("click",()=>{
              outputDiv.style.transform="translateX(-100%)";
              analysis.textContent="Your Qr code is being generated"
        })
function switchPage(elem){
    document.querySelectorAll(`.nav-item`).forEach(el=>el.classList.remove("active"));
    elem.classList.add("active");
    elem.children[0].classList.toggle("fa-shake");
    document.getElementById(`${elem.id.split("-")[0]}-page`).scrollIntoView({behavior:"instant"})
    setTimeout(()=> elem.children[0].classList.toggle("fa-shake"),100)
}
  formScan.addEventListener("submit",async (e)=>{
    e.preventDefault();
    if(fileInput.value===""){
        alert("No File Uploaded");
        return;
    }
    let formData = new FormData();
formData.append("file", fileInput.files[0]);
    try{
        let response = await fetch("http://api.qrserver.com/v1/read-qr-code/",{
            method:"POST",
            body:formData,
        });
        let data = await response.json();
        scanOutput.value=data[0].symbol[0].data;
        fileInput.value=""
    }
    catch(err){
        console.log("failed fetching",err);
        alert("Choose a valid file type,Try Again!")
    }
  })