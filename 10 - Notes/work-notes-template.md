---
creation_date: 2024-04-11
cssclasses: 
folder: 90 - Templates/10 - Notes
icon: FarNoteSticky
meetingTemplate: 90 - Templates/10 - Notes/meeting-template.md
showFolderContents: false
tags: ""
title: work-notes-template
---

# DATE:  `= this.creation_date`

```dataviewjs
dv.view("/90 - Templates/50 - JavaScript/noteUtils");

cur=dv.current()
if(cur.showFolderContents) {
	dv.paragraph(`## Contents of ${cur.folder}:`)
	dv.view("90 - Templates/50 - JavaScript/dvCustomFileTree",{topFolder: cur.folder})
} else {
	dv.paragraph("")
}
dv.container.classList.add("dataviewjs-visible-clip-output");
```

## Create Meeting:
~~~meta-bind
INPUT[text(
title(Meeting Name:),
defaultValue(Meeting),
class(meta-bind-full-width),
class(meta-bind-high),
placeholder(Enter the name for the meeting note)):memory^meetingName]
~~~
```meta-bind-js-view
{memory^meetingName} as meetingName
{frontmatter^meetingTemplate} as meetingTemplate
---

const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
 
let newMeetingName=`Unnamed Meeting ${today}`;
if(context.bound.meetingName != "") {
	newMeetingName=context.bound.meetingName;
}

const buttonString = `
~~~meta-bind-button
label: Create Meeting
hidden: false
title: "${newMeetingName}"
class: "button-43"
tooltip: "${newMeetingName}"
id: ""
style: primary
actions:
  - type: templaterCreateNote
    templateFile: "${context.bound.meetingTemplate}"
    fileName: "${newMeetingName}"
~~~
\`VIEW[{memory^meetingName}]\`
`
return engine.markdown.create(buttonString);

```


```dataviewjs
dv.view("/90 - Templates/50 - JavaScript/meetingTable");
dv.container.className += " dv-daily-meetings-summary"
console.log("done")
```


>[!tasks]- Tasks
>```tasks
> not done
> group by filename 
> sort by due reverse 
> sort by description
> ```

## Notes:



