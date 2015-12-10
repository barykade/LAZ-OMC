var baseMapsId;
function loadMapData(mapName, mapTheme, mapData){
	
    var json = JSON.parse(mapData);
    
    if(json.error) {
        alert(json.errormessage);
        return;
    }

    MapEditor.Model.setTheme(parseInt(mapTheme, 10));
    $("p#mapname").html(mapName);

    var oldClass = $("body").attr("class");
    $("body").removeClass(oldClass);
    $("body").addClass(MapEditor.Model.getTheme(), 300, function() {
        grid.updateImages(ctx);
        themeChanging = false;
    });

    grid.setClasses(json, ctx);
}