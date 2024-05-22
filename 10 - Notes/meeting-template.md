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
