/**
 * 加载天地图类库
 */
dojoConfig = {
    parseOnLoad: true,
    packages: [{
        name: 'tdtlib',
        location: path + "/js/tdtlib"
    }]
};
/**
 * 加载ArcGIS类库
 */
document.write(
'<link type="text/css" rel="stylesheet" href="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/css/esri.css" />' +
'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/init.js"></script>' +
'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/toolbars/draw.js"></script>' +
'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/tasks/LengthsParameters.js"></script>' +
'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/tasks/AreasAndLengthsParameters.js"></script>' +
//'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/tasks/PrintTask.js"></script>' +
//'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/tasks/PrintParameters.js"></script>' +
//'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/tasks/PrintTemplate.js"></script>' +
'<script type="text/javascript" src="' + mapPath + '/arcgis_js/library/3.18/3.18/esri/toolbars/navigation.js"></script>'
);
