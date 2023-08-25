let qr_text;
let qr_code_url;
let is_qr_genrate=false;
let qr_code_img=document.querySelector('#qr_code_img');
let qr_code_view_area=document.querySelector('.qr_code_view_area');
let input_qr_text=document.querySelector('#input_qr_text');

let generate_qr_btn=document.querySelector('.generate_qr_btn');
let downloud_qr_btn=document.querySelector('.downloud_qr_btn');



generate_qr_btn.addEventListener("click",()=>{
    if(is_qr_genrate==false){
        qr_text=input_qr_text.value;
        if(qr_text==''){
            alert('Please Enter the URL or Text');
        }else if(window.navigator.onLine!=true){
            alert('please check the internet connection');
        }else{
            Generate_QR();

        }
    }else{
        //reset qr code
        is_qr_genrate=false;
        input_qr_text.classList.remove('view_hide');
        qr_code_view_area.classList.add('view_hide')
        generate_qr_btn.innerHTML='Generate &nbsp;<i class="bx bx-chevron-right"></i>';
        downloud_qr_btn.classList.add('disable_button');
        input_qr_text.value=''


    }
    
})
function Generate_QR(){
    input_qr_text.classList.add('view_hide');
    qr_code_view_area.classList.remove('view_hide');
    qr_code_url='https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl='+qr_text;
    qr_code_img.src=qr_code_url;
    is_qr_genrate=true;
    generate_qr_btn.innerHTML='Reset QR &nbsp;<i class="bx bx-reset"></i>'
    downloud_qr_btn.classList.remove('disable_button');

}
//Generate_QR

downloud_qr_btn.addEventListener("click",()=>{
    if(is_qr_genrate==true){
        if(qr_code_url!='' && qr_code_url!=null){
            fetch(qr_code_url)
            .then(resp => resp.blob())
            .then (blob=>{
                const url=window.URL.createObjectURL(blob);
                const a= document.createElement('a');
                a.href=url;
                a.download='qr-code.png';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);

            }).catch(()=>{
                alert('Ooops! faild to downloud qr code !');

            })

        }else{
            alert('invaild image url')
        }

    }else{

    }

})