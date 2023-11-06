<template>
<div id = "mega">
    <div id = "rectangle">
        <div id = "Content">
            <div id = "title">Add Doctor</div>
            
            <div id = "DocInfo">
                <form action="">
                    <input type="text" name="docName" id="docName" placeholder="Enter Name">
                </form>
            </div>

            <div id = "buttonWrapper">
                <button id = "submitButt" type = "button">Submit</button>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
#rectangle {
    /* height: 150px; */
    width: 350px;
    background: #F7F7F7; 
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    padding: 20px;

}

#title {
    color: black;
    font-size: 20px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}

#docName {
    margin: 10px 0 10px 0;
    width: 300px;
    height: 20px;
}

#submitButt{
    width: 60px;
    border-radius: 4px;
    border-radius: 4px;
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;
    border: none;
    padding: 7px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    background: #6DA34D;
    font-weight: 300;
}

#submitButt:hover {
    background: #d7e7d9; 
    font-weight: 300;
}
</style>

<script>
</script>