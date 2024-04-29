---
cssclasses:
  - "!cards"
  - cards-16-9
  - cards-cols-4
  - table-wide
  - cards-align-bottom
  - cards-cover
folder: 90 - Templates/10 - Notes
icon: FarNoteSticky
tags: ""
title: folder-note-brief
---

```dataviewjs
function collectFiles(folderPath, level) {
    // Get all pages in the specified folder and any subfolders
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));

    // Group pages by their parent folder
    const groupedByFolder = pages.groupBy(p => p.file.folder);

    // Array to hold all file data
    let fileData = [];

    // Iterate through groups, each representing a folder
    for (let folder of groupedByFolder) {
        // Check if we are in the same folder
        if (folder.key === folderPath) {
	        if ( folderPath == "") {
	        	dv.header(3,"/")
	        } else {
	    	    dv.header(3,folderPath)
	        }

	        fileData=[];
            folder.rows.forEach(page => {
                //fileData.push({ link: page.file.link, created: page.file.ctime });

				fileData.push({
					link: page.file.link,
					level: level,
					created: page.file.ctime
				});
             });               
            dv.table(["Link:", "Created On:"], fileData.map(f => [f.link, f.created.toFormat("yyyy-MM-dd")]));
            
        } else {
            // Recursive call to handle subfolders
            fileData = fileData.concat(collectFiles(folder.key, level + 1));
        }
    }

    return fileData;
}

// Define the top-level folder
const cur = dv.current()

let dir = cur.file.folder;

let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);


this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td:first-child").forEach(s => s.style.width ="75%");

```
