<template>
<div id = "mega">
    <div id = "rectangle">
        <div id = "content">
            <div id = "Title">
                Assign Patient to Doctor
            </div>

            <div id="searchContainer">
                <div id = "searchBar">
                    <form action="">
                            <input type="text" name="docID" id="docID" placeholder="Enter Doctor ID" size="25">
                            <input type="text" name="patID" id="patID" placeholder="Enter Patient IC" size="25">
                    </form>
                </div>
                
                <div id = "searchButt">
                    <button id = "searchButton" type="button">Add</button>
                </div>
            </div>
        
        </div>
    </div>

    <!--<div id = "resultRect">
        <div id = "resultTable">
            <table>
                <tr id="tableHeadRow">
                    <th>Name</th>
                    <th>ID</th>
                    <th>Phone Number</th>
                    <th>Add Patient</th>
                </tr>
            </table>
        </div>
    </div>-->
</div>

</template>

<style scoped>
#rectangle {
    /* height: 150px; */
    width: 400px;
    background: #F7F7F7; 
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    padding: 20px;
}

/* #content {
    margin: 20px;
} */

#Title {
    color: #212121;
    font-size: 18px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 500;
    line-height: 21px;
    word-wrap: break-word;
    font-weight:600;
    margin-bottom: 15px;
}

#searchBar {
    margin: 10px 0 20px 0
}

#patID {
    background: white; 
    border-radius: 10px; 
    border: 1px #C5C5C5 solid;
    height: 25px;
    /* width: 200px; */
    
}

#docID {
    background: white; 
    border-radius: 10px; 
    border: 1px #C5C5C5 solid;
    height: 25px;
    /* width: 200px; */
    margin-bottom: 1em;
    margin-right: 20px;
}

#searchButton {
    background: #8FBC94; 
    border-radius: 6px;
    height: 29px;
    width: 86px;
    border: none;
    font-weight: 600;
}

#searchButton:hover {
    background: #d7e7d9; 
    border-radius: 6px;
    height: 29px;
    width: 86px;
    border: none;
    font-weight: 600;
    
}

#resultRect {
    position: inherit;
    top: 10rem;
    background: white; 
    box-shadow: 0px 0px 30px rgba(56.09, 71.02, 109.44, 0.09); 
    border-radius: 12px; 
    overflow: hidden;
}

#resultTable {
    font-family: Poppins, Inter-Light, Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#tableHeadRow {
    background: #B5B5C3; 
}



</style>