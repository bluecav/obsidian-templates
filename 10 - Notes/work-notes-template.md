---
creation_date: 2024-04-11
folder: 90 - Templates/10 - Notes
icon: FarNoteSticky
tags: ""
title: work-notes-template
showFolderContents: false
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

>[!tasks]- Tasks
>```tasks
> not done
> group by filename 
> sort by due reverse 
> sort by description
> ```

## Notes: