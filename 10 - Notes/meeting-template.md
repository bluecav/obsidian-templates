---
folder: 90 - Templates/10 - Notes
icon: FasPeopleGroup
tags: 
title: meeting-template
subProject: 10 - Notes
noteType: meeting
---
<%* 
const meetingName = await tp.system.prompt("Meeting")
const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
-%>

# <% tp.file.title %>
- ~ Metadata:
	- ; meeting-name:: <% tp.file.title %>
	- ; meeting-date:: <% tp.date.now() %>
	- ; attendees::  [[Chris.Berry|@Chris.Berry]], [[Mark.Cohen|@Mark.Cohen]]
	- ; project::  
	- ; tags:: #meeting 
	- ; meeting-link::  
	- ; slack-thread::  
	- ; attachments::


> [!multi-column]
>
>> [!note]+ Attendees:
>> ```dataview
>> TABLE WITHOUT ID replace(attendees, ", ", "<br>") as Attendees
>> FROM #meeting
>> WHERE file.name = this.file.name
>> WHERE contains(attendees, "")
>> SORT Attendees DESC
>> ```
>
>> [!warning]+ Tags
>> ```dataview
>> LIST file.tags
>> WHERE file.name = this.file.name
>> SORT file.tags DESC
>> ```
>
>> [!summary]+ Links
>> ```dataview
>> TABLE WITHOUT ID file.outlinks as Links
>> WHERE file.name = this.file.name
>> SORT Links DESC
>> ```


- & Agenda:: <% tp.file.title %>
	- item1
		- item2
		- 3
		- 4
	- item5
		- and stuff

## Notes:: <% tp.file.title %>


# Queries
```dataview
TABLE WITHOUT ID
    Meeting,
    meeting_date AS "Meeting Date",
    project AS "Project",
    attendees AS "Attendees"
FROM ""
WHERE contains(file.text, "# Meeting:: Test")
FLATTEN file.lists AS list
WHERE contains(list.text, "; Metadata")
FLATTEN list.children AS child
WHERE child.text =~ /^- meeting-date::/ OR child.text =~ /^- attendees::/ OR child.text =~ /^- project::/
TABLE 
    regexreplace("^.*# Meeting:: (.*)", "$1") AS Meeting,
    regexreplace("^.*meeting-date:: (.*)", "$1") AS meeting_date,
    regexreplace("^.*project:: (.*)", "$1") AS project,
    regexreplace("^.*attendees:: (.*)", "$1") AS attendees
GROUP BY Meeting
SORT meeting_date DESC

```

```dataview
TABLE WITHOUT ID item as Name, Date, Attendees, Project, Tags, Link, Attachments
WHERE file = this.file
FLATTEN file.lists as item
FLATTEN filter(item.meeting-name, (c) => c.meeting-name)[0].meeting-name as Name
FLATTEN filter(item.meeting-date, (c) => c.meeting-date)[0].meeting-date as Date
WHERE item.meeting-name
group by item.meeting-name
```

```dataview
table without ID Meeting, Date, Metadata, Project, Attendees
from ""
WHERE file = this.file
where meeting-name and meeting-date and attendees
flatten meeting-name as Meeting
flatten meeting-date as Date
flatten project as Project
flatten attendees as Attendees
```

```dataview
TABLE
    meeting-name as "Meeting Name",
    meeting-date as "Meeting Date",
    attendees as "Attendees"
WHERE (file.folder = this.folder)
WHERE noteType = "meeting"
```

```dataviewjs
dv.table(
  ["Meeting Name", "Meeting Date", "Attendees", "Agenda"],
  dv.pages()
    .where(p => p.file.folder === dv.current().file.folder && p.noteType === "meeting")
    .map(page => {
      // Extract metadata directly
      const meetingName = page["meeting-name"];
      const meetingDate = page["meeting-date"];
      const attendees = page.attendees?.map(a => dv.page(a).file.name).join(", ");

      // Attempt to find an Agenda section and list its contents
      let agendaContent = null;
      const fileText = dv.io.load(page.file.path);
      const agendaMatch = /## Agenda::.*\n([^#]*)/.exec(fileText);
      if (agendaMatch) {
        agendaContent = agendaMatch[1].trim().replace(/^- /gm, "").split("\n").join(", ");
      }

      return [
        meetingName,
        meetingDate,
        attendees,
        agendaContent || "No Agenda Listed"
      ];
    })
)
```


```dataviewjs
dv.table(
  ["Meeting Name", "Meeting Date", "Attendees", "Agenda"],
  dv.pages()
    .where(p => p.file.folder === dv.current().file.folder && p.noteType === "meeting")
    .map(page => {
      // Extract metadata directly
      const meetingName = page["meeting-name"];
      const meetingDate = page["meeting-date"];
      const attendees = page.attendees?.map(a => `${a}`).join(", "); // format as markdown links

      // Attempt to find an Agenda section and list its contents
      let agendaContent = null;
      let agendaListContents=[];
      let agendaList=page.file.lists.find((element) => element.text.includes("Agenda"))??[]
      agendaList.forEach((listItem) => {
	      
      })
      if ( agendaList) {
	      agendaLst
	      agendaListContents=agendaList.children
      } else {
	      agendaListContents=[]
      }
      const fileText = dv.io.load(page.file.path);
      const agendaMatch = /## Agenda::.*\n([^#]*)/.exec(fileText);
      
      if (agendaMatch) {
        agendaContent = agendaMatch[1].trim().replace(/^- /gm, "").split("\n").join(", ");
      }
	  const agendaListContent = page.file.sections
	  console.log(page.file.lists)
	  //.find(section => section.type === "list" && section.name === "Agenda") ?.listItems.map(item => item.text).join(", ");

      return [
        meetingName,
        meetingDate,
        attendees,
        agendaListContents || "No Agenda Listed"
      ];
    })
)
```



```dataviewjs
dv.table(
    ["Meeting Name", "Meeting Date", "Attendees", "Agenda"],
    dv.pages('"this.folder"')
        .where(page => page.noteType === "meeting")
        .map(page => {
            const fileContent = dv.io.load(page.file.path);
            let agendaItems = [];
            let capture = false;

            // Split the file content into lines and process each line
            fileContent.split('\n').forEach(line => {
                // Check if the line contains the 'Agenda' header
                if (line.includes('- & Agenda:')) {
                    capture = true;  // Start capturing the lines
                } else if (capture && line.trim().startsWith('- ') && !line.includes('- &')) {
                    // Capture lines until another list parent is found
                    agendaItems.push(line.trim().substring(2));
                } else if (line.trim().startsWith('- &')) {
                    capture = false;  // Stop capturing if another list parent starts
                }
            });

            return [
                page["meeting-name"],
                page["meeting-date"],
                page["attendees"]?.map(a => dv.page(a)?.file.link).join(", "),
                agendaItems.join("; ")
            ];
        })
);
```

```dataviewjs
dv.view("/90 - Templates/50 - JavaScript/meetingTable");
dv.container.className += " dv-daily-meetings-summary"
console.log("done")
```
