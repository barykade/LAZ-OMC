MapEditor.Model = (function() {
    var
        themes = ["scallywags", "feedback", "adorables", "veggienauts"],
        currentTheme = 0,
        selectedClass = "t1",
        moveStartHex = null,
        selectedUnit = "",
        selectedHealth = "health3",
        selectedColor = "blue",
        selectedPlayerRaces = ["scallywags", "scallywags", "scallywags", "scallywags"],
        playerColors = ["blue", "red", "green", "yellow"],
        currentBase = 1,
        moveMode = false,
        moveQueue = [],
        wits = [0,0,0,0],
        forwardMoveQueue = [],


        getClass = function() {
            return selectedClass + getColor();
        },

        setClass = function(newClass) {
            selectedClass = newClass;
            selectedUnit = "";
        },

        getTheme = function() {
            return themes[currentTheme];
        },

        getThemeID = function() {
            return currentTheme;
        },

        setTheme = function(id) {
            currentTheme = id;
        },

        swapTheme = function() {
            currentTheme++;
            if(currentTheme > 3) currentTheme = 0;
        },

        setSelectedPlayerRace = function(id) {
            var playerIndex = playerColors.indexOf(selectedColor);
            selectedPlayerRaces[playerIndex] = id;
        },

        getSelectedPlayerRace = function() {
            var playerIndex = playerColors.indexOf(selectedColor);
            return selectedPlayerRaces[playerIndex];
        },

        getSelectedPlayerNum = function() {
            return playerColors.indexOf(selectedColor) + 1;
        },

        setMoveMode = function(input){
            moveMode = (input == true);
        },
        isMoveMode = function(){
            return moveMode;
        },

        setMoveStartHex = function(hex){
            moveStartHex = hex;
        },

        getMoveStartHex = function(){
            return moveStartHex;
        },

        getCurrentPlayerNum = function(){
            return playerColors.indexOf(selectedColor);
        },

        getCurrentPlayerColor = function(){
            return selectedColor;
        },

        getAllPlayerRaces = function(){
            return selectedPlayerRaces;
        },

        getPlayerRace = function(id){
            return selectedPlayerRaces[id];
        },

        setPlayerRace = function(playerIndex, inputRace){
            selectedPlayerRaces[playerIndex-1] = inputRace;

            var oldClass = $("#player_race").attr("class");
            $("#player_race").removeClass(oldClass).addClass(inputRace);

            var oldPlayerClass = $("#player" + playerIndex + "_race").attr("class");
            $("#player" + playerIndex + "_race").removeClass(oldClass).addClass(inputRace);
            $("#player" + playerIndex + "_movemode_race").removeClass(oldClass).addClass(inputRace);

            $(".race.selected").removeClass("selected");
            $(".race#race_"+inputRace).addClass("selected");

        }

        getPlayerColor = function(id){
            return playerColors[id];
        },

        getColor = function() {
            if(selectedUnit == "rmv") {
                return "";
            } if(selectedUnit != "") {
                return selectedColor;
            } else if(selectedClass.match(/^(b|s)$/)) {
                return selectedColor;
            } else {
                // color does not matter and would cause 404
                return "";
            }
        },

        setColor = function(color) {
            selectedColor = color;
        },

        getUnit = function() {
            return (selectedUnit == "" ? false : selectedUnit + getColor());
        },

        getSelectedUnit = function() {
            return selectedUnit;
        },

        setWitsForColor = function(witColor, inputWits){
            var playerIndex = playerColors.indexOf(witColor);
            wits[playerIndex] = inputWits;
        },

        setWitsForPlayer = function(playerIndex, inputWits){
            wits[playerIndex-1] = inputWits;
            $("#" + playerColors[playerIndex-1] + "Wits").val(inputWits);
        },

        spendWit = function(){
            var currPlayer = getCurrentPlayerNum();
            wits[currPlayer] = wits[currPlayer] - 1;
            $("#" + selectedColor + "Wits").val(wits[currPlayer]);
        },

        setWits = function(newWits){
            var currPlayer = getCurrentPlayerNum();
            wits[currPlayer] = newWits;
            $("#" + selectedColor + "Wits").val(wits[currPlayer]);
        },

        getAllPlayerWits = function(){
            return wits;
        },

        getWits = function(){
            return wits[getCurrentPlayerNum()];
        },

        getHealth = function() {
            return selectedHealth;
        },

        setUnit = function(newUnit) {
            selectedUnit = newUnit;
            //selectedClass = "";
        },

        setHealth = function(newHealth) {
            selectedHealth = newHealth;
        },

        rmvUnit = function() {
            selectedUnit = "";
        },

        getBase = function() {
            return currentBase;
        },
        getPlayerByColor = function(inputColor){
            return playerColors.indexOf(inputColor);
        },
        getBoardState = function(){
            var hexes = grid.getClasses();
            return {hexes: hexes, wits: wits.slice(0), selectedColor: selectedColor};
        },
        popMove = function(){
            if(moveQueue.length == 0) return null;
            forwardMoveQueue.push(getBoardState());

            var boardState = moveQueue.pop();
            selectedColor = boardState.selectedColor;
            for(var index in boardState.wits){
                var witColor = playerColors[index];
                var witForColor = boardState.wits[index];
                wits[index] = witForColor;
                $("#" + witColor + "Wits").val(witForColor);
            }
            return boardState.hexes;
        },
        pushMove = function(move){
            moveQueue.push(move);
            forwardMoveQueue = [];
        },
        getMoveQueue = function(move){
            return moveQueue;
        },
        popForward = function(){
            if(forwardMoveQueue.length == 0) return null;
            moveQueue.push(getBoardState());
            var boardState = forwardMoveQueue.pop();
            for(var index in boardState.wits){
                var witColor = playerColors[index];
                var witForColor = boardState.wits[index];
                wits[index] = witForColor;
                $("#" + witColor + "Wits").val(witForColor);
            }
            return boardState.hexes;
        };


    return {
        getClass: getClass,
        setClass: setClass,
        getTheme: getTheme,
        getThemeID: getThemeID,
        setTheme: setTheme,
        setColor: setColor,
        getColor: getColor,
        swapTheme: swapTheme,
        setSelectedPlayerRace: setSelectedPlayerRace,
        getSelectedPlayerRace: getSelectedPlayerRace,
        getSelectedPlayerNum: getSelectedPlayerNum,
        getCurrentPlayerNum: getCurrentPlayerNum,
        getAllPlayerRaces: getAllPlayerRaces,
        getPlayerRace: getPlayerRace,
        setPlayerRace: setPlayerRace,
        getPlayerColor: getPlayerColor,
        getCurrentPlayerColor: getCurrentPlayerColor,
        getUnit: getUnit,
        getSelectedUnit: getSelectedUnit,
        setUnit: setUnit,
        rmvUnit: rmvUnit,
        getHealth: getHealth,
        setHealth: setHealth,
        getBase: getBase,
        setMoveMode: setMoveMode,
        isMoveMode: isMoveMode,
        setMoveStartHex: setMoveStartHex,
        getMoveStartHex: getMoveStartHex,
        pushMove: pushMove,
        popMove: popMove,
        popForward: popForward,
        spendWit: spendWit,
        setWits: setWits,
        getWits: getWits,
        getAllPlayerWits: getAllPlayerWits,
        setWitsForColor: setWitsForColor,
        setWitsForPlayer: setWitsForPlayer,
        getBoardState: getBoardState,
        getMoveQueue: getMoveQueue,
        isBaseSelected: function() { return selectedClass.match(/^b$/); }
    }
})();