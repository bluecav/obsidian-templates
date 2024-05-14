---
folder: 90 - Templates/10 - Notes
tags: ""
title: demo-daily 1
---

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
{memory^meetingName} as memoryMeetingName
{frontmatter^meetingTemplate} as fmMeetingTemplate
---

const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
 
let meetingName=`Unnamed Meeting ${today}`;
if(context.bound.memoryMeetingName != "") {
	meetingName=context.bound.memoryMeetingName;
}

let meetingTemplate="90 - Templates/10 - Notes/demo-template-replace.md";
if(context.bound.fmMeetingName != undefined) {
	meetingTemplate=context.bound.fmMeetingTemplate;
}

lastLine=app.workspace.activeEditor.editor.lineCount()

const buttonString = `
~~~meta-bind-button
label: Create Meeting at line ${lastLine}
hidden: false
title: "${meetingName}"
class: "button-43"
tooltip: "${meetingName}"
id: ""
style: primary
action:
  type: insertIntoNote
  line: ${lastLine}
  value: ${meetingTemplate}
  templater: true
~~~
\`VIEW[{memory^meetingName}]\`
`
return engine.markdown.create(buttonString);
```



