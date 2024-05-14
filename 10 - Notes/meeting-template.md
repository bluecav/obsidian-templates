---
folder: 90 - Templates/10 - Notes
icon: FasPeopleGroup
tags: ""
title: meeting-template
meetingAttendees: ""
meetingProjectName: ""
---
#  `=this.title`
> [!info] Metadata
> Meeting Date: <% tp.date.now() %>)
> people:: 
> project:: 
> tags:: #meeting
> meeting-link::
> slack-thread::

## Metadata
```dataviewjs

const project_input=`
~~~meta-bind
INPUT[text(
title(Project Name:),
placeholder(Project Name:)):meetingProjectName]
~~~
`
dv.container.className+=" meta-bind-grid"
dv.container=[
dv.span(project_input),
dv.span(project_input),
]
```

~~~meta-bind
INPUT[text(
title(Project Name:),
placeholder(Project Name:)):meetingProjectName]
~~~
~~~meta-bind
INPUT[text(
title(Project Name:),
placeholder(Project Name:)):meetingProjectName]
~~~



> [!multi-column]
>
>> [!note]+ Attendees:
>> ```dataview
>> TABLE WITHOUT ID replace(people, ", ", "<br>") as Attendees
>> FROM #meeting
>> WHERE file.name = this.file.name
>> WHERE contains(people, "")
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

