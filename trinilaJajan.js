var makan1 =0;
var makan2 =0;
var minum1 =0;
var minum2 =0;
var total =0;
var allMakan = 0;
var allMinum = 0;

function loadJajan(){
    console.log("versi 3");
}

function handleMinus(_text){
    switch (_text){
        case "pm1":
            if(makan1 == 0){
                makan1 = 0;
                document.getElementById("makan1").innerHTML = makan1;
            }else{
                makan1--;
                allMakan--;
                total -= 5000;
                document.getElementById("makan1").innerHTML = makan1;
                document.getElementById("total").innerHTML = total;
            }
        break;
        case "pm2":
            if(makan2 == 0){
                makan2 = 0;
                document.getElementById("makan2").innerHTML = makan2;
            }else{
                makan2--;
                allMakan--;
                total -= 5000;
                document.getElementById("makan2").innerHTML = makan2;
                document.getElementById("total").innerHTML = total;
            }
        break;
        case "pm3":
            if(minum1 == 0){
                minum1 = 0;
                document.getElementById("minum1").innerHTML = minum1;
            }else{
                minum1--;
                allMinum--;
                total -= 3500;
                document.getElementById("minum1").innerHTML = minum1;
                document.getElementById("total").innerHTML = total;
            }
        break;
        case "pm4":
            if(minum2 == 0){
                minum2 = 0;
                document.getElementById("minum2").innerHTML = minum2;
            }else{
                minum2--;
                allMinum--;
                total -= 2500;
                document.getElementById("minum2").innerHTML = minum2;
                document.getElementById("total").innerHTML = total;
            }
        break;
    }
}

function handlePlus(_text){
    switch (_text){
        case "pm1":
            makan1++;
            allMakan++;
            total += 5000;
            document.getElementById("makan1").innerHTML  = makan1;
            document.getElementById("total").innerHTML = total;
        break;
        case "pm2":
            makan2++;
            allMakan++;
            total += 5000;
            document.getElementById("makan2").innerHTML = makan2;
            document.getElementById("total").innerHTML = total;
        break;
        case "pm3":
            minum1++;
            allMinum++;
            total += 3500;
            document.getElementById("minum1").innerHTML  = minum1;
            document.getElementById("total").innerHTML = total;
        break;
        case "pm4":
            minum2++;
            allMinum++;
            total += 2500;
            document.getElementById("minum2").innerHTML  = minum2;
            document.getElementById("total").innerHTML = total;
        break;
    }
}

function handleConfirm(){

    if(allMinum != 0 || allMakan != 0){
        var text ;
        if(allMinum == 0){
            text = "makanan : " + allMakan;
        } else if(allMakan == 0){
            text = "minuman : " + allMinum;
        } else{
            text =`minuman : ${allMinum} dan makanan : ${allMakan}`; 
        }

        console.log(text);
        ExampleSendMessage(text);
        
    } else{
        console.log("Pesan makanan atau minuman terlebih dahulu!");
    }
    

}