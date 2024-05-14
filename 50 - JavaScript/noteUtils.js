
cur=dv.current()

const last_entry = await dv.tryQuery(`
	TABLE dateformat(file.ctime, "yyyy-MM-dd") as "Created", file.path, file.name
	FROM "10 - Daily Notes"
	WHERE (file.ctime < this.file.cday)
	SORT fileDate DESC
	LIMIT 1
`);

const last_values = last_entry.values[0];

let link_prev, link_next, link_prev_text, link_next_text

if (last_values) {
	let path_prev, datestring, filename;
	[, datestring, path_prev, filename] = last_values;

	const link_text = `${filename}`
	const link_path = path_prev
	link_prev = "[[" + link_path + "|" + link_text + "]]"
	link_next = `[[${link_path}|${link_text}]]`
	link_prev_text = `${filename} (${datestring})`
	//const link_prev = dv.fileLink(path_prev, false, link_text);
	//dv.paragraph(link_prev);

	
} else {
	const link_text = "No Prev Note"
	//const link_prev = `[[${link_path}|link_text]]`
	//const link_prev = dv.fileLink(this.file.path, false, link_text);
	link_prev_text = "No Previous Note";
	link_prev = link_prev_text
	
}
console.log(`Previous Daily Link: ${link_prev}`)
  
// ==============================
const latest_entry = await dv.tryQuery(`
	TABLE dateformat(file.ctime, "yyyy-MM-dd") as "Created", file.path, file.name
	FROM "10 - Daily Notes"
	WHERE (file.ctime > this.file.cday) AND (file.name != this.file.name)
	SORT fileDate ASC
	LIMIT 100
`);


latest_entry.values.forEach((value,index) => {
  console.log(value)
});
//console.log(`Next entries: ${latest_entry.values}`)
const latest_values = latest_entry.values[0];


if (latest_values) {
	let path_next, datestring, filename;
	[, datestring, path_next, filename] = latest_values;
	//const link_text = `${filename} (${datestring})`
	const link_text = `${filename}`
	const link_path = path_next
	link_next = `[[${link_path}|${link_text}]]`
	link_next_text = `${filename} (${datestring})`
	//const link_next = dv.fileLink(path_next, false, link_text);
	//dv.paragraph(link_prev);
	
} else {
	const link_text = "No Next Note"
	//const link_prev = dv.fileLink(this.file.path, false, link_text);
	link_next_text = "No Next Note";	
	link_next = link_next_text
	
}
console.log(`Next Daily Link: ${link_next}`)
// ===============================
  



let link_today_text=dv.date(dv.current().file.cday).toFormat('yyyy-MM-dd');
let link_today=dv.current().file.name + "(" + link_today_text + ")";

dv.paragraph(`
~~~meta-bind-button
label: Prev Daily Note
id: Prev
hidden: true
class: "button-43"
tooltip: " ${link_prev_text}"
style: primary
icon: arrow-big-left
action:
  type: open
  newTab: true
  link: "${link_prev}"
~~~ 

~~~meta-bind-button
label: Current Daily Note
id: Today
hidden: true
class: "button-43"
tooltip: "${link_today_text}"
style: primary
icon: calendar
action:
  type: open
  newTab: true
  link: "${link_today}"
~~~ 

~~~meta-bind-button
label: Next Daily Note
id: Next
hidden: true
class: "button-43"
tooltip: "${link_next_text}"
style: primary
icon: arrow-big-right
action:
  type: open
  newTab: true
  link: "${link_next}"
~~~ 

~~~meta-bind-button
label: Show Current Folder Contents?
id: showFolderContents
hidden: true
class: ""
tooltip: ""
style: primary
action:
  type: updateMetadata
  bindTarget: showFolderContents
  evaluate: true
  value: "x == null || !x ? true : false"
~~~ 

\`BUTTON[Prev]\` \`BUTTON[Today]\` \`BUTTON[Next]\`
<br>
Show Folder Contents? \`INPUT[toggle:showFolderContents]\`
`)

  


/* Old function to get info as a simpler list format */
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


/* How to call it:
// Define the top-level folder
const cur = dv.current()

let dir = cur.file.folder;

let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);
this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td:first-child").forEach(s => s.style.width ="75%");
*/
