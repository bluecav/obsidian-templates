---
creation_date: 2024-04-11
folder: 90 - Templates/10 - Notes
icon: FarNoteSticky
tags: ""
title: notes-template
---

> [!date] DATE:  `= this.creation_date`
> `$= dv.pages('#daily-note').where(p => p.file.day && p.file.day < dv.current().file.day).sort(p => p.file.day, "desc").file.link.limit(1)`


>[!tasks]- Tasks
>```tasks
> not done
> group by filename 
> sort by due reverse 
> sort by description
> ```


>[!attachments]- Attachments:
> `$= await dv.view("99 - Data/js/buildImgGallery")`


>[!notes]+ Notes:
> - 
>