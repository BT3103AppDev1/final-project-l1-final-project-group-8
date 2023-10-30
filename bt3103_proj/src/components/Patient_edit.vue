<template>
    <div id = "mega">
        <div id = "rectangle">
            <div id = "patTitle">Patient's Health Records - NAME</div>
            <div id = "patDet">
                <div id = "name">
                    <div class = "title">NAME:</div>
                    <div id = "nameText">test</div> <!--Hard code for now-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#rectangle {
    width: 951px;
    height: 344px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
}

#mega {
    position: relative;
    left: 20em;
    top:2em;
}

#patDet {
    position: absolute;
    left: 5em;
    top: 5em;
}

#nameText {
    position: absolute;
    left: 10rem;
    top: 0.01em;
    overflow: visible;

}

#patTitle {
    position: relative;
    top: 1em;
    left:4.9rem;
    color: black;
    font-size: 32px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    font-weight: 600;
    line-height: 20px;
    word-wrap: break-word
}
</style>