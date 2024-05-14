---
folder: 90 - Templates/10 - Notes
tags: ""
title: demo-daily 1
---

## Create Meeting:
```meta-bind-js-view
{frontmatter^meetingTemplate} as fmMeetingTemplate
---

let meetingTemplate="90 - Templates/10 - Notes/demo-template-replace.md";
if(context.bound.fmMeetingName != undefined) {
	meetingTemplate=context.bound.fmMeetingTemplate;
}

lastLine=app.workspace.activeEditor.editor.lineCount()

const buttonString = `
~~~meta-bind-button
label: Create Meeting at line ${lastLine}
hidden: false
title: "Create Meeting"
class: "button-43"
tooltip: "Create Meeting"
id: ""
style: primary
action:
  type: insertIntoNote
  line: ${lastLine}
  value: ${meetingTemplate}
  templater: true
~~~
`
return engine.markdown.create(buttonString);
```


# Metadata
meetingName:: this could have been a slack thread - 2024-05-14
type:: standup
attendees:: 

