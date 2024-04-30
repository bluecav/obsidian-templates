function generateRainbowColors(numColors) {
    let colors = [];
    let saturation=15;
    if (dv.current().rainbowColorSaturation) {
	    saturation=dv.current().rainbowColorSaturation;
    }
    let luminosity=50;
    if (dv.current().rainbowColorLuminosity) {
	    luminosity=dv.current().rainbowColorLuminosity;
    }
	
    for (let i = 0; i < numColors; i++) {
        // Calculate the hue that varies from 0 to 360
        let hue = (i / numColors) * 360;
        // Create the HSL color string
        colors.push(`hsl(${hue}, ${saturation}%, ${luminosity}%)`);
    }
    return colors;
}

function generateTableRainbowCSS(colors) {
	let css="";
	let colorText="";

	let rainbowColorBorderWidth=2;
    if (dv.current().rainbowColorBorderWidth) {
	    rainbowColorBorderWidth=dv.current().rainbowColorBorderWidth;
    }



	colors.forEach((color, index) => {
		colorText=rainbowColors[index];
		css = css + `
		.folder-note-brief-pretty .td-folder-row-left-${index} {
			display: block;
			background-color: hsl(from ${colorText} h calc(s / 2) calc(l / 2));
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 5px 0px 0px 0px;
			border-right: 0px;
			border-bottom: 0px;
			padding: 2px 5px;
			border-color: ${colorText};
			color: var(--text-error);
		}
		.folder-note-brief-pretty .td-folder-row-right-${index} {
			display: block;
			background-color: hsl(from ${colorText} h calc(s / 2) calc(l / 2));					
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 0px 5px 0px 0px;
			border-left: 0px;
			border-bottom: 0px;
			padding: 2px 5px;
			border-color: ${colorText};
			color: var(--background-modifier-success);
		}
		.folder-note-brief-pretty .td-row-left-${index} {
			display: block;		
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 0px;
			border-right: 0px;
			border-bottom: 0px;
			border-top: 0px;
			padding-left: 5px;
			padding-right: 0px;
			border-color: ${colorText};
		}
		.folder-note-brief-pretty .td-row-right-${index} {
			display: block;		
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 0px;
			border-left: 0px;
			border-bottom: 0px;
			border-top: 0px;
			padding-left: 0px;
			padding-right: 0px;
			border-color: ${colorText};
		}
		.folder-note-brief-pretty .td-lastrow-left-${index} {
			display: block;		
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 0px 0px 0px 5px;
			border-right: 0px;
			border-top: 0px;
			padding-left: 5px;
			padding-right: 0px;
			border-color: ${colorText};
		}
		.folder-note-brief-pretty .td-lastrow-right-${index} {
			display: block;		
			border: ${rainbowColorBorderWidth}px solid; 
			border-radius: 0px 0px 5px 0px;
			border-left: 0px;
			border-top: 0px;
			padding-left: 0px;
			padding-right: 0px;
			border-color: ${colorText};
		}
		`
	});
	return css;

}

// Example usage: Generate 10 rainbow colors
const rainbowColors = generateRainbowColors(10);
const rainbowCSS = generateTableRainbowCSS(rainbowColors);


function collectFiles(folderPath, level, lastAddedFolder) {
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));
    const groupedByFolder = pages.groupBy(p => p.file.folder);
    let fileData = [];
    let currentFolderDisplayed = lastAddedFolder; // Keep track of the last folder added to the table

    for (let group of groupedByFolder) {
        if (group.key === folderPath) {
            group.rows.forEach((page, index) => {
                // Handle root directory explicitly
                let filesInFolder=group.rows.length-1;
                
                let actualFolderPath = folderPath || "/";
                let folderName = actualFolderPath;
                let folderRow = false;
                let lastFile=false;
                let treeMarker="";
                if ( index >= filesInFolder) {
	                lastFile=true;
		            treeMarker = "└─";
		            treeMarker = "";
		        } else {
			        lastFile=false;
			        treeMarker="├─";
			        treeMarker="";
		        }

                let displayData=folderName;
                let ctime=page.file.ctime.toFormat("yyyy-MM-dd");

                if (actualFolderPath !== currentFolderDisplayed) {

		            
		            fileData.push({
	                    folder: folderName,
	                    displayData: folderName,
	                    name: page.name,
	                    path: page.file.name,
	                    link: page.file.link,
	                    level: level,
	                    folderRow: true,
	                    lastFile: lastFile,
	                    info: group.rows.length + " files in folder",
	                });

				    fileData.push({
	                    folder: folderName,
	                    displayData: `${treeMarker} ` + page.file.link,
	                    name: page.name,
	                    path: page.file.name,
	                    link: page.file.link,
	                    level: level,
	                    folderRow: false,
	                    lastFile: lastFile,
	                    info: ctime,
	                });
                } else {
				    fileData.push({
	                    folder: folderName,
	                    displayData: `${treeMarker} ` + page.file.link,
	                    name: page.name,
	                    path: page.file.name,
	                    link: page.file.link,
	                    level: level,
	                    folderRow: false,
	                    lastFile: lastFile,
	                    info: ctime,
	                });
                }

                if (folderName) currentFolderDisplayed = actualFolderPath; // Update last added folder
            });
        } else {
            fileData = fileData.concat(collectFiles(group.key, level + 1, currentFolderDisplayed));
        }
    }

    return fileData;
}

function renderRows(rows) {
	let lastFolder=null;
	let colorIndex=0;
	let fileData=[];
	
	let leftClass="td-folder-left";
	let middleClass="td-folder-middle";
	let rightClass="td-folder-right";
	let leftBorderRadius="5px";
	let rightBorderRadius="5px";
	let infoClass="folder-row";
	
	rows.forEach( file => {
		if (file.folder && (file.folder !== lastFolder)) { 
			// Move to next color if it's a new folder 

			if (lastFolder !== null) colorIndex = (colorIndex + 1) % rainbowColors.length; 
			lastFolder = file.folder; 
		}


		if (file.folderRow) {
			leftClass=`td-folder-row-left-${colorIndex}`;
			rightClass=`td-folder-row-right-${colorIndex}`;
			infoClass="info-folder-row";
		} else if (file.lastFile) {
			leftClass=`td-lastrow-left-${colorIndex}`;
			rightClass=`td-lastrow-right-${colorIndex}`;
			infoClass="info-row";		
		} else {
			leftClass=`td-row-left-${colorIndex}`;
			rightClass=`td-row-right-${colorIndex}`;
			infoClass="info-row";
		}
		fileData.push({
			folder: file.folder,
			displayData: file.displayData,
			link: file.link,
			name: file.name,
			path: file.path,
			level: file.level,
			leftClass : leftClass,
			middleClass : middleClass,
			rightClass : rightClass,
			infoClass: infoClass,
			folderRow: file.folderRow,
			info: `${file.info}`,
			leftBorderRadius: leftBorderRadius,
			rightBorderRadius: rightBorderRadius,
			color: rainbowColors[colorIndex],
		});
	});
return fileData;
}

const cur = dv.current();

const { topFolder } = input;

// Adjust this path according to your structure, use "" for root
let files = renderRows(collectFiles(topFolder, 0, ""));


// Display the table once with all data
dv.table(["Page/Folder","Info"], files.map(f => [
	`<span class="${f.leftClass}">${f.displayData}</span>`, 
	`<span class="${f.rightClass}"><span class="${f.infoClass}">${f.info}</span></span>`]
	));


const styles = rainbowCSS + `
.folder-note-brief-pretty .table-view-table tbody.table-view-tbody tr td:first-child {
	width: 75%;
	white-space: normal; 
}

.folder-note-brief-pretty .table-view-table tbody.table-view-tbody tr td {
	border: 0px solid var(--text-normal); 
	padding: 0px;
}

.folder-note-brief-pretty .table-view-table  > tbody.table-view-tbody  > tr:hover {
	background-color: var(--interactive-hover) !important; 
	padding: 0px;
}

.folder-note-brief-pretty .table-view-table {
	border: 0px; 
}

.folder-note-brief-pretty .info-row {
  display: block;
  text-decoration: none;
  border: 2px solid var(--text-normal);
  padding: 2px 0px 2px 0px;
  border-width: 0 0 3px 0;
  border-radius: 0px;
  width: auto;
}


.folder-note-brief-pretty .table-view-table  > tbody.table-view-tbody .internal-link {
display: block;
  text-decoration: none;
  border: 2px solid var(--text-normal);
  padding: 2px;
  border-width: 0 0 3px 3px;
  border-radius: 0 0 0 10px;
  width: auto;
}

`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


/* this.container.querySelectorAll("svg").forEach((container) => {
	console.log(container);
	const parentHeight = container.parentNode.getBoundingClientRect().height;
    container.style.height = `${parentHeight}px`;
});
*/