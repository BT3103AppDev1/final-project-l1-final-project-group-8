<template>
<div id = "mega">
    <div id = "rectangle">
        <div id = "content">
            <div id = "Title">
                Search Patient
            </div>
            <div id = "searchBar">
                <form action="">
                        <input type="text" name="patID" id="patID" placeholder="Enter Patient IC">
                </form>
            </div>
            <div id = "searchButt">
                <button id = "searchButton" type="button">Search</button>
            </div>
        </div>
    </div>

    <div id = "resultRect">
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
    </div>
</div>

</template>

<style scoped>
#mega {
    position: absolute;
    left: 20em;
    top:5em;
}

#rectangle {
    height: 100px;
    width: 400px;
    background: #F7F7F7; 
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 

}

#content {
    left:1em;
    top:1em;
    position: relative;
}

#Title {
    color: #212121;
    font-size: 18px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 500;
    line-height: 21px;
    word-wrap: break-word;
    font-weight:600;
}

#searchBar {
    position: relative;
    top: 0.5em;
}

#patID {
    background: white; 
    border-radius: 10px; 
    border: 1px #C5C5C5 solid;
    height: 25px;
    width: 200px;
}

#searchButt {
    position: relative;
    left: 16rem;
    bottom: 1.44rem;
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
    top: 8rem;
    background: white; 
    box-shadow: 0px 0px 30px rgba(56.09, 71.02, 109.44, 0.09); 
    border-radius: 12px; 
    overflow: hidden;
}

#tableHeadRow {
    background: #B5B5C3; 
    border-collapse: collapse;
    border-radius: 6px;
    font: 1em sans-serif;
}



</style>